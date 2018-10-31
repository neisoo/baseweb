<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// include __DIR__."/../resources/library/accessControl/SDM/Utils/DBHandler/model.php";


function auditLog($loginToken,$action,$input,$result){
	
	//	sp info get 
	$dbh = SDMDBH::getInstance();
	$sp = "sp_rdms_audit_info_get";
	
	$params = new SDMDBParameters();
	$params->add($loginToken);
	
	$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
	
	if (isset($json["response"]["system"]["errorNo"])){
		if ($json["response"]["system"]["errorNo"] == "0"){
			$userid = $json["response"]["resultSet"][0]["userid"];
// 			$ipAddress = $json["response"]["resultSet"][0]["ipAddress"];
		}else{
			$auditLogresult["result"] = "FAIL";
			$auditLogresult["reason"] = "DB_FAIL";
		}
	}
	
	// audit log insert
	$dbh = SDMDBH::getInstance();
	$sp = "sp_rdms_audit_insert";
	
	$params = new SDMDBParameters();
	$params->add($userid);
	$params->add(get_client_ip());
	$params->add($action);
	$params->add($input);
	$params->add($result);
	
	$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
	
	if (isset($json["response"]["system"]["errorNo"])){
		if ($json["response"]["system"]["errorNo"] == "0"){
				$auditLogresult["result"] = "SUCCESS";
		}else{
			$auditLogresult["result"] = "FAIL";
			$auditLogresult["reason"] = "DB_FAIL";
		}
	}
 	return json_encode($auditLogresult);
}

function auditLogLogin($userid,$ip,$input,$result){	
	// audit log insert
	$dbh = SDMDBH::getInstance();
	$sp = "sp_rdms_audit_insert";
	
	$params = new SDMDBParameters();
	$params->add($userid);
	$params->add($ip);
	$params->add('Login');
	$params->add($input);
	$params->add($result);
	
	$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
	
	if (isset($json["response"]["system"]["errorNo"])){
		if ($json["response"]["system"]["errorNo"] == "0"){
				$auditLogresult["result"] = "SUCCESS";
		}else{
			$auditLogresult["result"] = "FAIL";
			$auditLogresult["reason"] = "DB_FAIL";
		}
	}
 	return json_encode($auditLogresult);
}

function auditLogLogout($userid,$ip,$input,$result){	
	// audit log insert
	$dbh = SDMDBH::getInstance();
	$sp = "sp_rdms_audit_insert";
	
	$params = new SDMDBParameters();
	$params->add($userid);
	$params->add($ip);
	$params->add('Logout');
	$params->add($input);
	$params->add($result);
	
	$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
	
	if (isset($json["response"]["system"]["errorNo"])){
		if ($json["response"]["system"]["errorNo"] == "0"){
				$auditLogresult["result"] = "SUCCESS";
		}else{
			$auditLogresult["result"] = "FAIL";
			$auditLogresult["reason"] = "DB_FAIL";
		}
	}
 	return json_encode($auditLogresult);
}

function get_client_ip() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

function loginAttemptLog($userid, $ip){
	$dbh = SDMDBH::getInstance();
	$sp = "sp_rdms_audit_insert";
	
	$params = new SDMDBParameters();
	$params->add($userid);
	$params->add($ip);
	$params->add('Login Attempt');
	$params->add('');
	$params->add('F');
	
	$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
	
	if (isset($json["response"]["system"]["errorNo"])){
		if ($json["response"]["system"]["errorNo"] == "0"){
				$auditLogresult["result"] = "SUCCESS";
		}else{
			$auditLogresult["result"] = "FAIL";
			$auditLogresult["reason"] = "DB_FAIL";
		}
	}
 	return json_encode($auditLogresult);
	
}
?>