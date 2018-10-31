<?php
 session_start();
 require("../config.php");
 
 if(isset($_SESSION['token'])){ 
	 $post = array(
	 "action"=>"verifyLogin",
	 "token"=>$_SESSION['token'],
	 "extendSession"=>"yes"
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
	 
	 echo $json["response"]["loginStatus"];
 }
 else{
	echo "Session token is not set.";
 }
?>