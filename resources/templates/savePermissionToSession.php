<?php
 session_start();
 include __DIR__."/../../resources/library/accessControl/SDM/Utils/DBHandler/model.php";
 require("../config.php");
 require_once("../library/templateFunctions.php");
 
 $post = array(
 "action"=>"showAllPermissionOfUser",
 "token"=>$_SESSION['token'],
 "userid"=>$_POST['name']
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
	$permission = array();
	if(isset($json["response"]["permissionList"])){
		if (array_key_exists("system", $json["response"]["permissionList"])) {
			foreach($json["response"]["permissionList"]["system"]["permission"] as $sysPermission){
				if($sysPermission["accessType"] == "A"){
					$permission[] = $sysPermission["permissionKey"];
				}
			}
		}
		if (array_key_exists("user", $json["response"]["permissionList"])) {
			foreach($json["response"]["permissionList"]["user"]["permission"] as $sysPermission){
				if($sysPermission["accessType"] == "A"){
					$permission[] = $sysPermission["permissionKey"];
				}
			}
		}
	}
	
	$dbh = SDMDBH::getInstance();
	
	$sp = "sp_rdms_getAllPermissionOfUser";
	
	$params = new SDMDBParameters();
	$params->add($_POST['name']);
	
	$sp_result = json_decode($dbh->execute_stored_procedure($sp,$params), true);
	if (isset($sp_result["response"]["system"]["errorNo"])) {
		if ($sp_result["response"]["system"]["errorNo"] == 0){
			if(isset($sp_result["response"]["resultSet"])){
				foreach ($sp_result["response"]["resultSet"] as $v => $item){
					$permission[] = $item["permissionKey"];
				}
			}
		}else{
			echo "Unhandle response";
			exit;
		}
	}
		
	$_SESSION['permission']=$permission;
	$jsToControlMenu = setMenuByPermission($config,$_SESSION['permission']);
	echo $jsToControlMenu;
	//echo 'Saved Permission To Session';	
 } else if($json["response"]["actionResult"] == "FAIL") {
	//echo $json["response"]["reason"];
	echo "Unhandle response";
 } else{
	echo "Unhandle response";
 }
 ?>