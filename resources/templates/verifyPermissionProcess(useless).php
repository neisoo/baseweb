<?php
 session_start();
 require("../config.php");
 
 $post = array(
 "action"=>"verifyPermission",
 "token"=>$_SESSION['token'],
 "permissionKey"=>$_POST['permission']
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
 
 if($json["response"]["actionResult"] == "SUCCESS"){
	echo "User have all the input permission";
	foreach($json["response"]["verifyDetail"]["permission"] as $value){
		echo "<br/>".$value["permissionKey"]." - ".$value["verify"];
	}
 } else if($json["response"]["actionResult"] == "FAIL") {
	echo "User don't have all the input permission";
	//foreach($json["response"]["verifyDetail"]["permission"] as $value){
	//	echo "<br/>".$value["permissionKey"]." - ".$value["verify"];
	//}
 } else{
	echo "Unhandle response";
 }
 ?>