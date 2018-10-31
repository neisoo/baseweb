<?php
session_start();
 require("../../resources/config.php");
 include __DIR__."/../../auditlog/AuditLog.php";
 include __DIR__."/../../resources/library/accessControl/SDM/Utils/DBHandler/model.php";

 $post = array(
 "action"=>"logout",
 "token"=>$_SESSION['token']
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
 
 if($json["response"]["logoutStatus"] == "LOGOUTSUCCESS"){
 	/******start of auditLog******/
	$ip = get_client_ip();
	$input = json_encode($post);
	$result = "S";
	auditLogLogout($_SESSION['userID'],$ip,$input,$result);
	/******End of auditLog******/
	unset($_SESSION['token']);
	unset($_SESSION['permission']);
	unset($_SESSION['userID']);
	unset($_SESSION['passwordExpired']);
    session_destroy();
	echo "accessControl/login.html";
 } else {
 	/******start of auditLog******/
	$ip = get_client_ip();
	$input = json_encode($post);
	$result = "F";
	auditLogLogout($_SESSION['userID'],$ip,$input,$result);
	/******End of auditLog******/
	echo "fail";
 }
 ?>