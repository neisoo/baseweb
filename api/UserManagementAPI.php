<?php
session_start();
ini_set("display_errors", 1);
require("../resources/config.php");
include __DIR__."/../resources/library/accessControl/SDM/Utils/DBHandler/model.php";
include	__DIR__."/../auditlog/AuditLog.php";
$checker = true;
$returnJson = array();
date_default_timezone_set("Hongkong");

if (!isset($_POST['postJson'])){
	$returnJson['result'] = 'fail';
	$returnJson['error_code'] = '1002';
	$returnJson['error_message'] = 'Missing Parameters';
	$checker = false;
} else {
	$postJson = $_POST['postJson'];
	$jsonArray = json_decode($postJson, true);
}

/*
print $_SESSION['token'];
print "<br />";
print $jsonArray['username'];
print "<br />";
print $jsonArray['password'];
print "<br />";
print $jsonArray['email'];
print "<br />";
*/

if (!isset($jsonArray["security_code"]) || $jsonArray["security_code"] != "rdms123") {
	$returnJson['result'] = 'fail';
	$returnJson['error_code'] = '1003';
	$returnJson['error_message'] = 'Unauthorized Request Error';
	$checker = false;
}

if ($checker == true){
	switch($jsonArray['action']){
		case 'AddUserSelf': // 用户首次登录时创建自己的新账号
			$check = true;

			// 检查图形验证码
			if(strtolower($jsonArray['captcha']) != $_SESSION['captcha_authcode']) {
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_reason'] = 'INVALID_CAPTCHA';
				$returnJson['error_message'] = 'Invalid captcha code.';
				$check = false;
				break;
			}

			// 添加用户
			$post = array(
				"action"=>"addUser",
				"parentid"=>$config['parent_id'],
				"userid"=>$jsonArray['userid'],
				"password"=>$jsonArray['password'],
				"email"=>$jsonArray['email']
			);
			
			$ch = curl_init();
			$options = array(
				CURLOPT_URL=>$apiURL,
				CURLOPT_RETURNTRANSFER=>true,
				CURLOPT_POST=>true,
				CURLOPT_POSTFIELDS=>http_build_query($post)
			);
			curl_setopt_array($ch, $options);
			
			$apiResult = curl_exec($ch);
			curl_close($ch);
			
			$json = json_decode($apiResult,true);
			
			if($json["response"]["actionResult"] == "SUCCESS"){
				$returnJson['result'] = 'ok';
				$check = true;
				
			} else if($json["response"]["actionResult"] == "FAIL") {
				$str = '';
				if($json["response"]["reason"] == "INVALID_PARENTID"){
					$str = "The parent userid is not valid.";
				} else if($json["response"]["reason"] == "DUPLICATE_USERID"){
					$str = "The user is already exists.";
				} else if($json["response"]["reason"] == "DUPLICATE_EMAIL"){
					$str = "The email was used.";
				} else if ($json["response"]["reason"] == "INVALID_USERID"){
					$str = "The userid is not valid.";
				} else if ($json["response"]["reason"] == "INVALID_PASSWORD"){
					$str = "The password is empty.";
				} else if ($json["response"]["reason"] == "ACCESS_DENIED"){
					$str = "User do not have permission to add new user.";
				} else if ($json["response"]["reason"] == "SESSION_TIMEOUT"){
					$str = "User session timeout.";
				} else if ($json["response"]["reason"] == "INVALID_SESSION"){
					$str = "The Input token is invalid.";
				} else if ($json["response"]["reason"] == "DB_FAIL"){
					$str = "Connect database fail.";
				} else {
					$str = "Unhandle response";
				}
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_reason'] = $json["response"]["reason"];
				$returnJson['error_message'] = $str;
				$check = false;
			} else {
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_reason'] = 'UNHANDLE_RESPONSE';
				$returnJson['error_message'] = 'Unhandle response.';
				$check = false;
			}

			if ($check == true){
				// 添加其它信息
				$dbh = SDMDBH::getInstance();
				$sp = "sp_rdms_addOtherInfoToUser";
				$params = new SDMDBParameters();
				$params->add($jsonArray['userid']);
				$params->add($jsonArray['email']);
				$params->add(''); // username
				$params->add(''); // company
				$params->add(''); // title
				$params->add(''); // address
				$params->add(''); //notes
				$dbh->execute_stored_procedure($sp,$params);

				// 修改密码最后更新时间
				$sp = "sp_password_log_insert";
				$params = new SDMDBParameters();
				$params->add($jsonArray['userid']);
				$params->add($jsonArray['password']);
				$dbh->execute_stored_procedure($sp,$params);
			}
			break;

		case 'AddUser':
			$check = true;
			
            // 添加用户
			$post = array(
				"action"=>"addUser",
				"token"=>$_SESSION['token'],
                "parentid"=>$jsonArray['parentid'],
				"userid"=>$jsonArray['userid'],
				"password"=>$jsonArray['password'],
				"email"=>$jsonArray['email']
			);
			
			$ch = curl_init();
			$options = array(
				CURLOPT_URL=>$apiURL,
				CURLOPT_RETURNTRANSFER=>true,
				CURLOPT_POST=>true,
				CURLOPT_POSTFIELDS=>http_build_query($post)
			);
			curl_setopt_array($ch, $options);
			
			$apiResult = curl_exec($ch);
			curl_close($ch);
			
			$json = json_decode($apiResult,true);
			
			if($json["response"]["actionResult"] == "SUCCESS"){
				$returnJson['result'] = 'ok';
				$check = true;
				
			} else if($json["response"]["actionResult"] == "FAIL") {
				$str = '';
                if($json["response"]["reason"] == "INVALID_PARENTID"){
                    $str = "The parent userid is not valid.";
				} else if($json["response"]["reason"] == "DUPLICATE_USERID"){
					$str = "The user is already exists.";
				} else if($json["response"]["reason"] == "DUPLICATE_EMAIL"){
					$str = "The email was used.";
				} else if ($json["response"]["reason"] == "INVALID_USERID"){
					$str = "The userid is not valid.";
				} else if ($json["response"]["reason"] == "INVALID_PASSWORD"){
					$str = "The password is empty.";
				} else if ($json["response"]["reason"] == "ACCESS_DENIED"){
					$str = "User do not have permission to add new user.";
				} else if ($json["response"]["reason"] == "SESSION_TIMEOUT"){
					$str = "User session timeout.";
				} else if ($json["response"]["reason"] == "INVALID_SESSION"){
					$str = "The Input token is invalid.";
				} else if ($json["response"]["reason"] == "DB_FAIL"){
					$str = "Connect database fail.";
				} else {
					$str = "Unhandle response";
				}
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_message'] = $str;
				$check = false;
			} else {
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_message'] = 'Unhandle response.';
				$check = false;
			}
			
			// 添加用户到用户组
			if ($check == true){
				if ($jsonArray['type_system'] == 1){
					unset($post);
					$post = array(
						"action"=>"addGroupUser",
						"token"=>$_SESSION['token'],
						"userid"=>$jsonArray['userid'],
						"groupID"=>'2'
					);
					
					
					$ch = curl_init();
					$options = array(
							CURLOPT_URL=>$apiURL,
							CURLOPT_RETURNTRANSFER=>true,
							CURLOPT_POST=>true,
							CURLOPT_POSTFIELDS=>http_build_query($post)
					);
					curl_setopt_array($ch, $options);
					
					$apiResult = curl_exec($ch);
					curl_close($ch);
					
// 					$json = json_decode($apiResult,true);
					
				}
				
				if ($jsonArray['type_security'] == 1){
					unset($post);
					$post = array(
							"action"=>"addGroupUser",
							"token"=>$_SESSION['token'],
							"userid"=>$jsonArray['userid'],
							"groupID"=>'1'
					);
						
					$ch = curl_init();
					$options = array(
							CURLOPT_URL=>$apiURL,
							CURLOPT_RETURNTRANSFER=>true,
							CURLOPT_POST=>true,
							CURLOPT_POSTFIELDS=>http_build_query($post)
					);
					curl_setopt_array($ch, $options);
						
					$apiResult = curl_exec($ch);
					curl_close($ch);
// 					$json = json_decode($apiResult,true);
				}

                // 添加其它信息
				$dbh = SDMDBH::getInstance();
				$sp = "sp_rdms_addOtherInfoToUser";
				$params = new SDMDBParameters();
				$params->add($jsonArray['userid']);
				$params->add($jsonArray['email']);
				$params->add($jsonArray['username']);
				$params->add($jsonArray['company']);
				$params->add($jsonArray['title']);
				$params->add($jsonArray['address']);
                $params->add($jsonArray['notes']);
				$dbh->execute_stored_procedure($sp,$params);
				
                // 修改密码最后更新时间
				$sp = "sp_password_log_insert";
				$params = new SDMDBParameters();
				$params->add($jsonArray['userid']);
				$params->add($jsonArray['password']);
				$dbh->execute_stored_procedure($sp,$params);
			}
		break;
        case 'UserGet':
            $dbh = SDMDBH::getInstance();
            $sp = "sp_SDM_AccessControl_UserGet";
            $params = new SDMDBParameters();
            $params->add($jsonArray['userid']);

            $json = json_decode($dbh->execute_stored_procedure($sp,$params),true);      
            if (isset($json["response"]["system"]["errorNo"])){
                if ($json["response"]["system"]["errorNo"] == "0"){
                    if ($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
                        $returnJson["data"] = $json["response"]["resultSet"][0];
                        $returnJson['result'] = 'ok';
                    }
                    else {
                        $returnJson["reason"] = $json["response"]["resultSet"][0]["result"];
                        if ($returnJson["reason"] == "DB_FAIL") {
                            $returnJson['error_message'] = 'Database fail.';
                        }
                        else if ($returnJson["reason"] == "INVALID_USERID") {
                            $returnJson['error_message'] = 'Invalid user id.';
                        }
                        else {
                            $returnJson['error_message'] = 'Unknow error.';
                        }
                        $returnJson['result'] = 'fail';
                    }
                }
                else{
                    $returnJson["reason"] = "DB_FAIL";
                    $returnJson['result'] = 'fail';
                    $returnJson['error_message'] = 'Database fail.';
                }
            }
            break;

		//
		// UserForgetPassword和UserRetrievePassword用于，用户忘记密码后的密码找回功能，
		//
		// 密码重置方式：
		// 用户找回密码的时候，填写用户名或邮箱(二者之一即可)提交。服务找出该用户的邮箱地址，
		// 并向用户的邮箱中发送一个url，用户登录邮箱后找到该邮件并点击url后跳转到该页面，然后输入新的密码。
		//
		// 关键：
		// 服务器要确保url是服务器生成的，url没有被篡改。
		//
		// 步骤说明：
		// 1、用户找回密码的时候，在找回密码页面填写用户名或邮箱(二者之一即可)提交。
		// 2、程序得到用户名或邮箱便可以去数据库取出用户对应的密码以及当时填写的邮箱。
		// 3、根据用户名和密码生成一个tokey=md5(username+password)。由于用户名和密码只有服务器才知道，
		//    所以这个token只有服务器才能算出。
		// 4、服务器再得到当前时间time并生成code=md5('特定字串'+time)，这个code且于验证time没有被篡改。
		//     time用于后面检查时效。
		// 5、服务器生成url=http:\\xxx.com\xxx.php?userid=xxx&token=xxx&code=xxx&time=xxx，
		//    并发送邮件将url发送到用户邮箱。
		// 6、用户点击链接地址，服务器按照3、4步的方法计算token和code，并与url中的token和code比较，
		//    保证整个url没有被篡改过。
		// 7、服务器在根据 当前时间-time来检查是否超过时效，如一天。
		// 8、一切正常的话，显示表单让用户输入新的密码并提交。
		case 'UserForgetPassword':
			// 忘记密码
			unset($post);
			$post = array(
				"action"=>"userForgetPassword",
				"userid"=>$jsonArray['userid'],
				"email"=>$jsonArray['email']
			);

			$ch = curl_init();
			$options = array(
				CURLOPT_URL=>$apiURL,
				CURLOPT_RETURNTRANSFER=>true,
				CURLOPT_POST=>true,
				CURLOPT_POSTFIELDS=>http_build_query($post)
			);
			curl_setopt_array($ch, $options);

			$apiResult = curl_exec($ch);
			curl_close($ch);

			$json = json_decode($apiResult,true);
			if ($json["response"]["actionResult"] == "SUCCESS") {
				$returnJson['result'] = 'ok';

				// 发送密码重置邮件
				$url = $config['site_url_root'] . "UserPasswordReset.php?userid=" . $json["response"]["userid"] .
					"&token=" . $json["response"]["token"] .
					"&code=" . $json["response"]["code"] .
					"&time=" . $json["response"]["time"]; //构造URL 

				$receiver = $json["response"]["email"];
				$subject = $config['site_name'] . "-密码重置";
				$content = "亲爱的" . $json["response"]["userid"] . "：<br/>您在" . $json["response"]["time"] .
					"提交了找回密码请求。请点击下面的链接重置密码 （链接24小时内有效）。<br/>" .
					"<a href='" . $url . "'target='_blank'>" . $url . "</a>"; 
				$result = sendMail($receiver, $subject, $content);
				if (!$result) {
					// 邮件发送失败
					$returnJson['result'] = 'fail';
					$returnJson['error_code'] = '1012';
					$returnJson['error_reason'] = "SEND_MAIL_FAIL";
					$returnJson['error_message'] = "Send mail fail.";
				}
			}
			else if($json["response"]["actionResult"] == "FAIL") {
				$str = '';
				if($json["response"]["reason"] == "INVALID_USER") {
					$str = "The user is invalid.";
				}
				else if ($json["response"]["reason"] == "DB_FAIL") {
					$str = "Connect database fail.";
				}
				else {
					$str = "Unhandle response";
				}
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_reason'] = $json["response"]["reason"];
				$returnJson['error_message'] = $str;
			}
			else {
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_reason'] = 'UNHANDLE_RESPONSE';
				$returnJson['error_message'] = 'Unhandle response.';
			}
			break;

		// 用户点击找回密码的链接后，输入新的密码后，通过这个api更新密码，需要验证上面的生成的
		// token和code
		case 'UserRetrievePassword':
			// 通过userid找回email和旧密码(密码总是以md5值保存)
			unset($post);
			$post = array(
				"action"=>"userRetrievePassword",
				"userid"=>$jsonArray['userid'],
				"newPassword"=>$jsonArray['newPassword'],
				"time"=>$jsonArray['time'],
				"token"=>$jsonArray['token'],
				"code"=>$jsonArray['code']
			);

			$ch = curl_init();
			$options = array(
				CURLOPT_URL=>$apiURL,
				CURLOPT_RETURNTRANSFER=>true,
				CURLOPT_POST=>true,
				CURLOPT_POSTFIELDS=>http_build_query($post)
			);
			curl_setopt_array($ch, $options);

			$apiResult = curl_exec($ch);
			curl_close($ch);
			$json = json_decode($apiResult, true);
			if ($json["response"]["actionResult"] == "SUCCESS") {
				$returnJson['result'] = 'ok';
			}
			else if($json["response"]["actionResult"] == "FAIL") {
				$str = '';
				if ($json["response"]["reason"] == "INVALID_CODE" ||
					$json["response"]["reason"] == "INVALID_TOKEN" ) {
					$str = "The url is invalid.";
				}
				else {
					$str = "Unhandle response";
				}
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_reason'] = $json["response"]["reason"];
				$returnJson['error_message'] = $str;
			}
			else {
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1012';
				$returnJson['error_reason'] = 'UNHANDLE_RESPONSE';
				$returnJson['error_message'] = 'Unhandle response.1111';
			}
			break;
        case 'EditUser':
            $check = true;
            
            // 添加用户到用户组
            if ($check == true){
                
                //if ($jsonArray['type_system'] == 1){
                    unset($post);
                    $post = array(
                        "action"=> $jsonArray['type_system'] == 1 ? "addGroupUser" : "removeGroupUser",
                        "token"=>$_SESSION['token'],
                        "userid"=>$jsonArray['userid'],
                        "groupID"=>'2'
                    );
                    
                    
                    $ch = curl_init();
                    $options = array(
                            CURLOPT_URL=>$apiURL,
                            CURLOPT_RETURNTRANSFER=>true,
                            CURLOPT_POST=>true,
                            CURLOPT_POSTFIELDS=>http_build_query($post)
                    );
                    curl_setopt_array($ch, $options);
                    
                    $apiResult = curl_exec($ch);
                    curl_close($ch);
                //}
                
                //if ($jsonArray['type_security'] == 1){
                    unset($post);
                    $post = array(
                            "action"=> $jsonArray['type_security'] == 1 ? "addGroupUser" : "removeGroupUser",
                            "token"=>$_SESSION['token'],
                            "userid"=>$jsonArray['userid'],
                            "groupID"=>'1'
                    );
                        
                    $ch = curl_init();
                    $options = array(
                            CURLOPT_URL=>$apiURL,
                            CURLOPT_RETURNTRANSFER=>true,
                            CURLOPT_POST=>true,
                            CURLOPT_POSTFIELDS=>http_build_query($post)
                    );
                    curl_setopt_array($ch, $options);
                        
                    $apiResult = curl_exec($ch);
                    curl_close($ch);
                //}

                // 添加其它信息
                $dbh = SDMDBH::getInstance();
                $sp = "sp_rdms_addOtherInfoToUser";
                $params = new SDMDBParameters();
                $params->add($jsonArray['userid']);
                $params->add($jsonArray['email']);
                $params->add($jsonArray['username']);
                $params->add($jsonArray['company']);
                $params->add($jsonArray['title']);
                $params->add($jsonArray['address']);
                $params->add($jsonArray['notes']);
                $dbh->execute_stored_procedure($sp,$params);                
            }
            
            $returnJson['result'] = 'ok';
            break;
            
		case "ResetPassword":
			
			$dbh = SDMDBH::getInstance();
			$sp = "sp_rdms_audit_info_get";
			
			$params = new SDMDBParameters();
			$params->add($_SESSION['token']);
			
			$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
			if (isset($json["response"]["system"]["errorNo"])){
				if ($json["response"]["system"]["errorNo"] == "0"){
					$jsonArray['username'] = $json["response"]["resultSet"][0]["userid"];
					
					if(checkNewPassword($jsonArray)){
						$post = array(
								"action" => "changePassword",
								"token" => $_SESSION['token'],
								"oldPassword"=>$jsonArray['oldPassword'],
								"newPassword"=>$jsonArray['newPassword']
						);
					
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
					
						if ($json["response"]["actionResult"] == "SUCCESS") {
					
							$sp = "sp_password_log_insert";
							$params = new SDMDBParameters();
							$params->add($jsonArray['username']);
							$params->add($jsonArray['newPassword']);
							$dbh->execute_stored_procedure($sp,$params);
								
							$returnJson['result'] = 'ok';
								
						}else{
							$returnJson['result'] = 'fail';
								
							switch ($json["response"]["reason"]) {
								case "INVALID_OLDPASSWORD":
									$returnJson['error_code'] = '1203';
									$returnJson['error_message'] = 'Invalid old password';
									break;
					
								case "SESSION_TIMEOUT":
								case "INVALID_SESSION":
									$returnJson['error_code'] = '1202';
									$returnJson['error_message'] = 'User session timeout';
									break;
					
								case "DB_FAIL":
								default:
									$returnJson['error_code'] = '1001';
									$returnJson['error_message'] = 'Database Error';
									break;
							}
						}
					}else{
						$returnJson['result'] = 'fail';
						$returnJson['error_code'] = '1204';
						$returnJson['error_message'] = 'Password has been used recently';
					}
				}else{
					$returnJson['result'] = $json['response']['actionResult'];
					$returnJson['error_code'] = '1202';
					$returnJson['error_message'] = "User session timeout";
				}
			}
			
			break;
			
		case "ResetUserPassword":
				
						
			if(checkNewPassword($jsonArray)){

				$dbh = SDMDBH::getInstance();
				$sp = "sp_rdms_reset_user_password";
				$params = new SDMDBParameters();
				$params->add($jsonArray['username']);
				//$params->add($jsonArray['oldPassword']);
				$params->add($jsonArray['newPassword']);
				$json = json_decode($dbh->execute_stored_procedure($sp,$params), true);
				
				if ($json["response"]["resultSet"][0]["result"] == "SUCCESS") {
						
					$sp = "sp_password_log_insert";
					$params = new SDMDBParameters();
					$params->add($jsonArray['username']);
					$params->add($jsonArray['newPassword']);
					$dbh->execute_stored_procedure($sp,$params);

					$returnJson['result'] = 'ok';

				}else if ($json["response"]["resultSet"][0]["result"] == "FAIL") {
					$returnJson['result'] = 'fail';

					switch ($json["response"]["reason"]) {
						/*
						case "INVALID_OLDPASSWORD":
							$returnJson['error_code'] = '1203';
							$returnJson['error_message'] = 'Invalid old password';
							break;
						*/
						case "SESSION_TIMEOUT":
						case "INVALID_SESSION":
							$returnJson['error_code'] = '1202';
							$returnJson['error_message'] = 'User session timeout';
							break;
								
						case "DB_FAIL":
						default:
							$returnJson['error_code'] = '1001';
							$returnJson['error_message'] = 'Database Error';
							break;
					}
				}
			}else{
				$returnJson['result'] = 'fail';
				$returnJson['error_code'] = '1204';
				$returnJson['error_message'] = 'Password has been used recently';
			}
				
			break;
			
		case "CheckPasswordExpired":
			$dbh = SDMDBH::getInstance();
			$sp = "sp_rdms_checkPasswordExpired";
			$params = new SDMDBParameters();
			$params->add($jsonArray['userid']);
	    
			$json = json_decode($dbh->execute_stored_procedure($sp, $params), true);
			if (isset($json["response"]["system"]["errorNo"])) {
	  
				if ($json["response"]["system"]["errorNo"] == 0) {
				  if (isset($json["response"]["resultSet"])) {
					$returnJson['result'] = 'ok';
					$returnJson['value'] = $json["response"]["resultSet"][0]["result"];
				  }
				}
				else {
				  $returnJson['result'] = "fail";
				  $returnJson['error_code'] = "1001";
				  $returnJson['error_message'] = "Database Error.";
				}
			}
			break;
		case "UnsetPasswordExpiredSession":
			if(isset($_SESSION['passwordExpired'])){
				unset($_SESSION['passwordExpired']);
			}
			break;
		default:
			$returnJson['result'] = 'fail';
			$returnJson['error_code'] = '1011';
			$returnJson['error_message'] = 'No such action';
		break;
	}
}

/******start of auditLog******/
switch ($returnJson['result']){
	case 'ok':
		if($jsonArray['action'] == "CheckPasswordExpired"){
			break;
		}

		if($jsonArray['action'] == "AddUserSelf"){
			break;
		}

		if($jsonArray['action'] == "UserForgetPassword" || 
			$jsonArray['action'] == "UserRetrievePassword" ){
			break;
		}

		$loginToken = $_SESSION['token'];
		if($jsonArray['action'] == "ResetPassword"){
			$action = "ChangePassword";
		}else{
			$action = $jsonArray['action'];
		}
		$input = json_encode($jsonArray);
		$result = "S";
		auditLog($loginToken,$action,$input,$result);
		break;

	case 'fail';
		if($jsonArray['action'] == "AddUserSelf"){
			break;
		}

		if($jsonArray['action'] == "UserForgetPassword" || 
			$jsonArray['action'] == "UserRetrievePassword" ){
			break;
		}

		$loginToken = $_SESSION['token'];
		if($jsonArray['action'] == "ResetPassword"){
			$action = "ChangePassword";
		}else{
			$action = $jsonArray['action'];
		}
		$input = json_encode($jsonArray);
		$result = "F";
		auditLog($loginToken,$action,$input,$result);
	break;
}
/******End of auditLog******/
print json_encode($returnJson);


function checkNewPassword($jsonArray){
	$dbh = SDMDBH::getInstance();
	$sp = "sp_reset_password_check_new";
		
	$params = new SDMDBParameters();
	$params->add($jsonArray['username']);
	$params->add($jsonArray['newPassword']);
		
	$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
		
	if (isset($json["response"]["system"]["errorNo"])){
		if ($json["response"]["system"]["errorNo"] == "0"){
			if($json["response"]["resultSet"][0]["result"] == 0){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}	
	
}

function sendMail($receiver, $subject, $content){
	require_once("../resources/library/PHPMailer-5.2.7/class.phpmailer.php"); 
	require_once("../resources/library/PHPMailer-5.2.7/class.smtp.php");

	// 实例化PHPMailer核心类
	$mail = new PHPMailer();
	// 是否启用smtp的debug进行调试 开发环境建议开启 生产环境注释掉即可 默认关闭debug调试模式
	$mail->SMTPDebug = 0;
	// 使用smtp鉴权方式发送邮件
	$mail->isSMTP();
	// smtp需要鉴权 这个必须是true
	$mail->SMTPAuth = true;
	// 链接qq域名邮箱的服务器地址
	$mail->Host = 'dgnmail.gsl.com.cn';//'smtp.qq.com';
	// 设置使用ssl加密方式登录鉴权
	//$mail->SMTPSecure = 'ssl';
	// 设置ssl连接smtp服务器的远程服务器端口号
	$mail->Port = 25;//465;
	// 设置发送的邮件的编码
	$mail->CharSet = 'UTF-8';
	// 设置发件人昵称 显示在收件人邮件的发件人邮箱地址前的发件人姓名
	$mail->FromName = '发件人昵称';
	// smtp登录的账号 QQ邮箱即可
	$mail->Username = 'yhzhong@gsl.com.cn';//'37511876@qq.com';
	// smtp登录的密码 使用生成的授权码
	$mail->Password = 'zhong7817';//'zhongyh6686';
	// 设置发件人邮箱地址 同登录账号
	$mail->From = 'yhzhong@gsl.com.cn';//'37511876@qq.com';
	// 邮件正文是否为html编码 注意此处是一个方法
	$mail->isHTML(true);
	// 设置收件人邮箱地址,添加多个收件人 则多次调用方法即可
	$mail->addAddress($receiver);
	// 添加该邮件的主题
	$mail->Subject = $subject;
	// 添加邮件正文
	$mail->Body = $content;
	// 为该邮件添加附件
	//$mail->addAttachment('./example.pdf');
	// 发送邮件 返回状态
	$status = $mail->send();

	if($status) {
		return true;
	}
	else {
		return false;
	}
	return $status; 
}

?>