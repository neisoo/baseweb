<?php
session_start();
ini_set("display_errors", 1);
require("../../resources/config.php");
include __DIR__."/../../auditlog/AuditLog.php";
include __DIR__."/../../resources/library/accessControl/SDM/Utils/DBHandler/model.php";

// 得到post的数据
$login_name = str_replace(' ', '', $_POST['name']);
$pw = str_replace(' ', '', $_POST['pw']);
$ip = $_SERVER['REMOTE_ADDR'];
$captcha = str_replace(' ', '', $_POST['captcha']);
 
$dbh = SDMDBH::getInstance();

$post = array(
	"action"=>"login",
	//"userid"=>"SystemAdmin",
	//"password"=>"admin",
	"userid"=>$login_name,
	"password"=>$pw
);

// 检查图形验证码
if (captchaChecking($captcha, $config['show_captcha_when_login_fail_count'])) {
	$returnJson = array("result"=>"captcha"); 
}
// 检查禁用用户。
else if(checkAttemptBlockedUser($login_name)) {
	$returnJson = array("result"=>"attempt", "resumeTime"=>getResumeTime());
}
// 检查因登录失败次数太多而被禁用的用户。
else if (attemptChecking($login_name, get_client_ip())) {
	loginAttemptLog($login_name, get_client_ip());
	// 发送邮件，通知恢得的时间。
	sendAttmeptAlertMail();
	$returnJson = array("result"=>"attempt", "resumeTime"=>getResumeTime());
}
// 登录
else {
	$ch = curl_init();
	$options = array(
		CURLOPT_URL=>$apiURL,
		CURLOPT_RETURNTRANSFER=>true,
		CURLOPT_POST=>true,
		CURLOPT_POSTFIELDS=>http_build_query($post),
	);
	curl_setopt_array($ch, $options);

	$apiResult = curl_exec($ch);
	curl_close($ch);

	$json = json_decode($apiResult,true);

	if($json["response"]["loginStatus"] == "LOGINSUCEESS"){
		//echo "Your Login Token: ". $json["response"]["token"];
		$_SESSION['token']=$json["response"]["token"];
		$_SESSION['userID'] = str_replace(' ', '', $_POST['name']);
		$_SESSION['login_fail_count'] = 0;

		/******start of auditLog******/
		$ip = get_client_ip();
		$post['password'] = MD5($post['password']);
		$input = json_encode($post);
		$result = "S";
		auditLogLogin($login_name,$ip,$input,$result);
		/******End of auditLog******/

		$returnJson = array("result"=>"success", "path"=>$config['index']['login_path']);

		// 		echo $config['index']['login_path'];
	}
	else {
		if (isset($_SESSION['login_fail_count'])){
			$_SESSION['login_fail_count'] = $_SESSION['login_fail_count'] + 1;
		}
		else {
			$_SESSION['login_fail_count'] = 1;
		}

		/******start of auditLog******/
		$ip = get_client_ip();
		$post['password'] = MD5($post['password']);
		$input = json_encode($post);
		$result = "F";
		auditLogLogin($login_name,$ip,$input,$result);
		/******End of auditLog******/

		$returnJson = array("result"=>"fail", "login_fail_count"=>$_SESSION['login_fail_count']);
		// 		echo "fail";
	}
}

echo json_encode($returnJson);


//  function get_client_ip() {
//  	$ipaddress = '';
//  	if (getenv('HTTP_CLIENT_IP'))
//  		$ipaddress = getenv('HTTP_CLIENT_IP');
//  	else if(getenv('HTTP_X_FORWARDED_FOR'))
//  		$ipaddress = getenv('HTTP_X_FORWARDED_FOR');
//  	else if(getenv('HTTP_X_FORWARDED'))
//  		$ipaddress = getenv('HTTP_X_FORWARDED');
//  	else if(getenv('HTTP_FORWARDED_FOR'))
//  		$ipaddress = getenv('HTTP_FORWARDED_FOR');
//  	else if(getenv('HTTP_FORWARDED'))
//  		$ipaddress = getenv('HTTP_FORWARDED');
//  	else if(getenv('REMOTE_ADDR'))
//  		$ipaddress = getenv('REMOTE_ADDR');
//  	else
//  		$ipaddress = 'UNKNOWN';
//  	return $ipaddress;
//  }

// 连接登录失败超过次数后要检查验证码
function captchaChecking($captcha, $maxCount) {
	if (isset($_SESSION['login_fail_count']) && isset($_SESSION['captcha_authcode'])){
		if ($_SESSION['login_fail_count'] > $maxCount) {
			if (strtolower($captcha) != $_SESSION['captcha_authcode']) {
				return true;
			}
		}
	}
	return false;
}

function attemptChecking($login_name, $ip){
	global $dbh;
	$attempt = false;

	$sp = "sp_latest_user_login_fail_get";

	$params = new SDMDBParameters();
	$params->add($login_name);

	$sp_result = json_decode($dbh->execute_stored_procedure($sp,$params), true);
	if (isset($sp_result["response"]["system"]["errorNo"])) {
		if ($sp_result["response"]["system"]["errorNo"] == 0){
			$loginAttempt = $sp_result["response"]["resultSet"][0]["isAttempt"];
			if ($loginAttempt==1){
				return true;
			}
		}else{
			error_handling($sp_result["response"]["system"]["errorNo"]);
			return true;
		}
	}

	return false;
}

function checkAttemptBlockedUser($login_name){
	global $dbh;

	$sp = "sp_check_user_is_blocked";

	$params = new SDMDBParameters();
	$params->add($login_name);

	$sp_result = json_decode($dbh->execute_stored_procedure($sp,$params), true);

	if (isset($sp_result["response"]["system"]["errorNo"])) {
		if ($sp_result["response"]["system"]["errorNo"] == 0) {
			$blockStatus = $sp_result["response"]["resultSet"][0]["isBlocked"];
			if($blockStatus == 1){
				return true;
			}
		}else{
			error_handling($sp_result["response"]["system"]["errorNo"]);
			return true;
		}
	}
	return false;
}

function checkAttemptBlockedIP($ip){
	global $dbh;
	$sp = "sp_check_ip_is_blocked";
	$params = new SDMDBParameters();
	$params->add($ip);
	$sp_result = json_decode($dbh->execute_stored_procedure($sp,$params), true);
	if (isset($sp_result["response"]["system"]["errorNo"])) {
		if ($sp_result["response"]["system"]["errorNo"] == 0) {
			$blockStatus = $sp_result["response"]["resultSet"][0]["blockStatus"];
			if($blockStatus == 1){
				return true;
			}
		}else{
			error_handling($sp_result["response"]["system"]["errorNo"]);
			return true;
		}
	}
	return false;
}

function getResumeTime(){
	global $dbh;
	global $login_name;

	$resumeTime = 0;

	$sp = "sp_rdms_user_attempt_resume_time_get";
	$params = new SDMDBParameters();
	$params->add($login_name);
	$sp_result = json_decode($dbh->execute_stored_procedure($sp,$params), true);
	if (isset($sp_result["response"]["system"]["errorNo"])) {
		if ($sp_result["response"]["system"]["errorNo"] == 0) {
			$resumeTime = $sp_result["response"]["resultSet"][0]["resumeTime"];
		}else{
			error_handling($sp_result["response"]["system"]["errorNo"]);
		}
	}

	return $resumeTime;
}

function sendAttmeptAlertMail(){
	global $dbh;
	global $login_name;
	global $pw;

	$resumeTime = getResumeTime();

	$sp = "RDMS_group_user_list_get";
	$params = new SDMDBParameters();
	$params->add(2);
	$receiver = "";
	$sp_result = json_decode($dbh->execute_stored_procedure($sp,$params), true);
	if (isset($sp_result["response"]["system"]["errorNo"])) {
		if ($sp_result["response"]["system"]["errorNo"] == 0) {
			if(isset($sp_result["response"]["resultSet"][0])){
				foreach ($sp_result["response"]["resultSet"] as $val=>$item){
					if (strlen($item["email"]) > 0) {
						$receiver .= $item["email"].",";
					}
				}
				$subject = "RDMS Login Attempt Alert";
	//  				$content = "Login attempt exceeded \n IP: ".get_client_ip()."\n userID: ".$login_name."\n password: ".$pw." \n time: ".date("Y-m-d H:i:s");
				$content = "This account (UserID: $login_name, IP :".get_client_ip().") has been locked because of too many failed login attempts. You will not be able to sign in until $resumeTime";
				$receiver = substr($receiver, 0, -1);
				sendMail($receiver, $subject, $content);
			}
		}else{
			error_handling($sp_result["response"]["system"]["errorNo"]);
		}
	}
}

function sendMail($receiver, $subject, $content){
	global $login_name;
	global $protocol;
	global $host;
	global $folderLocation;

	$email_json = array();
	$email_json["action"] = "SendMail";
	$email_json["security_code"] = "rdms123";
	$email_json["email"] = array(
			"receiver" => $receiver,
			"subject" => $subject,
			"content" => $content
	);

	$ch = curl_init($protocol . '://' . $host ."/".$folderLocation .'/API/SEND_MAIL_API.php');
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query(array("params"=>json_encode($email_json))));
	$resp = curl_exec($ch);
	$reponseInfo = curl_getinfo($ch);
	curl_close($ch);

	$resp = json_decode($resp, true);

	if($resp["result"] != "OK"){
	//  		print "OK";
	//  	}else{
		error_handling($resp["error_code"], $resp["error_message"]);
	}
}

function error_handling($error_code){
	switch ($error_code){

	}
}
?>