<?php
include "model.php";


	$SDMAcc = new SDMAccessControl("api");
	$return = "invalid call";
	$takePOST = true;
	$takeGET = true;
	
	
	$action ="";
	if (isset($_POST["action"])){
		$upperString = strtoupper($_POST["action"]);
		$action = $upperString;
	}elseif (isset($_GET["action"])){
		$upperString = strtoupper($_GET["action"]);
		$action = $upperString;
	}

	switch ($action){
		//login
		case "LOGIN":
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$password = "";
			if (isset($_POST["password"]) && $takePOST){
				$password = $_POST["password"];
			}elseif (isset($_GET["password"]) && $takeGET){
				$password = $_GET["password"];
			}
			
			$message["response"] = $SDMAcc->login($userid,$password);
			$return = json_encode($message);
			break;
			
		//logout
		case "LOGOUT":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$message["response"] = $SDMAcc->logout($token);
			$return = json_encode($message);
			break;
			
		//verifyLogin
		case "VERIFYLOGIN":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif(isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$extendSession = "";
			if (isset($_POST["extendSession"]) && $takePOST){
				$lowerString = strtolower($_POST["extendSession"]);
				$extendSession = $lowerString;
			}elseif(isset($_GET["extendSession"]) && $takeGET){
				$lowerString = strtolower($_GET["extendSession"]);
				$extendSession = $lowerString;
			}
			
			$message["response"] = $SDMAcc->verifyLogin($token,$extendSession);
			$return = json_encode($message);
			break;
			
		//addUser
		case "ADDUSER":
			if (isset($_POST["parentid"]) && $takePOST){
				$parentid = $_POST["parentid"];
			}elseif (isset($_GET["parentid"]) && $takeGET){
				$parentid = $_GET["parentid"];
			}
        
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$password = "";
			if (isset($_POST["password"]) && $takePOST){
				$password = $_POST["password"];
			}elseif (isset($_GET["password"]) && $takeGET){
				$password = $_GET["password"];
			}
			
			$email = "";
            if (isset($_POST["email"]) && $takePOST){
                $email = $_POST["email"];
            }elseif (isset($_GET["email"]) && $takeGET){
                $email = $_GET["email"];
            }
			
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$message["response"] = $SDMAcc->addUser($token,$parentid,$userid,$password,$email);
			$return = json_encode($message);
			break;

		//userForgetPassword
		case "USERFORGETPASSWORD":
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST) {
				$userid = $_POST["userid"];
			}
			elseif (isset($_GET["userid"]) && $takeGET) {
				$userid = $_GET["userid"];
			}
		
			$email = "";
			if (isset($_POST["email"]) && $takePOST) {
				$email = $_POST["email"];
			}
			elseif (isset($_GET["email"]) && $takeGET) {
				$email = $_GET["email"];
			}

			$message["response"] = $SDMAcc->userForgetPassword($userid, $email);
			$return = json_encode($message);
			break;

		//userRetrievePassword
		case "USERRETRIEVEPASSWORD":
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST) {
				$userid = $_POST["userid"];
			}
			elseif (isset($_GET["userid"]) && $takeGET) {
				$userid = $_GET["userid"];
			}

			$newPassword = "";
			if (isset($_POST["newPassword"]) && $takePOST) {
				$newPassword = $_POST["newPassword"];
			}
			elseif (isset($_GET["newPassword"]) && $takeGET) {
				$newPassword = $_GET["newPassword"];
			}

			$time = "";
			if (isset($_POST["time"]) && $takePOST) {
				$time = $_POST["time"];
			}
			elseif (isset($_GET["time"]) && $takeGET) {
				$time = $_GET["time"];
			}

			$token = "";
			if (isset($_POST["token"]) && $takePOST) {
				$token = $_POST["token"];
			}
			elseif (isset($_GET["token"]) && $takeGET) {
				$token = $_GET["token"];
			}

			$code = "";
			if (isset($_POST["code"]) && $takePOST) {
				$code = $_POST["code"];
			}
			elseif (isset($_GET["code"]) && $takeGET) {
				$code = $_GET["code"];
			}

			$message["response"] = $SDMAcc->userRetrievePassword($userid, $newPassword, $time, $token, $code);
			$return = json_encode($message);
			break;

		//verifyPermission
		case "VERIFYPERMISSION":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$permissionKey = "";
			if (isset($_POST["permissionKey"]) && $takePOST){
				$upperString = strtoupper($_POST["permissionKey"]);
				$permissionKey = $upperString;
			}elseif (isset($_GET["permissionKey"]) && $takeGET){
				$upperString = strtoupper($_GET["permissionKey"]);
				$permissionKey = $upperString;
			}
			
			$message["response"] = $SDMAcc->verifyPermission($token,$permissionKey);
			$return = json_encode($message);
			break;
			
		//changePassword
		case "CHANGEPASSWORD":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$oldPassword = "";
			if (isset($_POST["oldPassword"]) && $takePOST){
				$oldPassword = $_POST["oldPassword"];
			}elseif (isset($_GET["oldPassword"]) && $takeGET){
				$oldPassword = $_GET["oldPassword"];
			}
			
			$newPassword = "";
			if (isset($_POST["newPassword"]) && $takePOST){
				$newPassword = $_POST["newPassword"];
			}elseif (isset($_GET["newPassword"]) && $takeGET){
				$newPassword = $_GET["newPassword"];
			}
			
			$message["response"] = $SDMAcc->changePassword($token,$oldPassword,$newPassword);
			$return = json_encode($message);
			break;
			
		//disableUser
		case "DISABLEUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			$status = "P";
			
			$message["response"] = $SDMAcc->editUserStatus($token,$userid,$status);
			$return = json_encode($message);
			break;
			
		//enableUser
		case "ENABLEUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			$status = "A";
			
			$message["response"] = $SDMAcc->editUserStatus($token,$userid,$status);
			$return = json_encode($message);
			break;

		//addPermission
		case "ADDPERMISSION":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$permissionKey = "";
			if (isset($_POST["permissionKey"]) && $takePOST){
				$upperString = strtoupper($_POST["permissionKey"]);
				$permissionKey = $upperString;
			}elseif (isset($_GET["permissionKey"]) && $takeGET){
				$upperString = strtoupper($_GET["permissionKey"]);
				$permissionKey = $upperString;
			}
			
			$permissionDesc = "";
			if (isset($_POST["permissionDesc"]) && $takePOST){
				$permissionDesc = $_POST["permissionDesc"];
			}elseif (isset($_GET["permissionDesc"]) && $takeGET){
				$permissionDesc = $_GET["permissionDesc"];
			}
			
			$message["response"] = $SDMAcc->addPermission($token,$permissionKey,$permissionDesc);
			$return = json_encode($message);
			break;
		
		//deletePermission
		case "DELETEPERMISSION":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$permissionKey = "";
			if (isset($_POST["permissionKey"]) && $takePOST){
				$upperString = strtoupper($_POST["permissionKey"]);
				$permissionKey = $upperString;
			}elseif (isset($_GET["permissionKey"]) && $takeGET){
				$upperString = strtoupper($_GET["permissionKey"]);
				$permissionKey = $upperString;
			}
			
			$message["response"] = $SDMAcc->deletePermission($token,$permissionKey);
			$return = json_encode($message);
			break;
			
		//editPermission
		case "EDITPERMISSION":
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$permissionKey = "";
			if (isset($_POST["permissionKey"]) && $takePOST){
				$upperString = strtoupper($_POST["permissionKey"]);
				$permissionKey = $upperString;
			}elseif (isset($_GET["permissionKey"]) && $takeGET){
				$upperString = strtoupper($_GET["permissionKey"]);
				$permissionKey = $upperString;
			}
			
			$permissionDesc = "";
			if (isset($_POST["permissionDesc"]) && $takePOST){
				$permissionDesc = $_POST["permissionDesc"];
			}elseif (isset($_GET["permissionDesc"]) && $takeGET){
				$permissionDesc = $_GET["permissionDesc"];
			}
			
			$message["response"] = $SDMAcc->editPermission($token,$permissionKey,$permissionDesc);
			$return = json_encode($message);
			break;
		
		//showAllPermission
		case "SHOWALLPERMISSION":
			$message["response"] = $SDMAcc->showAllPermission();
			$return = json_encode($message);
			break;
		
		//showAllPermissionOfUser
		case "SHOWALLPERMISSIONOFUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$message["response"] = $SDMAcc->showAllPermissionOfUser($token,$userid);
			$return = json_encode($message);
			break;
			
		//permissionGrantToUser
		case "PERMISSIONGRANTTOUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$userid2 = "";
			if (isset($_POST["userid2"]) && $takePOST){
				$userid2 = $_POST["userid2"];
			}elseif (isset($_GET["userid2"]) && $takeGET){
				$userid2erid = $_GET["userid2"];
			}
			
			$permissionKey = "";
			if (isset($_POST["permissionKey"]) && $takePOST){
				$upperString = strtoupper($_POST["permissionKey"]);
				$permissionKey = $upperString;
			}elseif (isset($_GET["permissionKey"]) && $takeGET){
				$upperString = strtoupper($_GET["permissionKey"]);
				$permissionKey = $upperString;
			}
			
			$accessType = "A";
			
			$message["response"] = $SDMAcc->permissionAssignToUser($token,$userid,$userid2,$permissionKey,$accessType);
			$return = json_encode($message);
			break;
		
		//permissionDeniedToUser
		case "PERMISSIONDENIEDTOUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$userid2 = "";
			if (isset($_POST["userid2"]) && $takePOST){
				$userid2 = $_POST["userid2"];
			}elseif (isset($_GET["userid2"]) && $takeGET){
				$userid2erid = $_GET["userid2"];
			}
			
			$permissionKey = "";
			if (isset($_POST["permissionKey"]) && $takePOST){
				$upperString = strtoupper($_POST["permissionKey"]);
				$permissionKey = $upperString;
			}elseif (isset($_GET["permissionKey"]) && $takeGET){
				$upperString = strtoupper($_GET["permissionKey"]);
				$permissionKey = $upperString;
			}
			
			$accessType = "D";
			
			$message["response"] = $SDMAcc->permissionAssignToUser($token,$userid,$userid2,$permissionKey,$accessType);
			$return = json_encode($message);
			break;

		//permissionRemoveFromUser
		case "PERMISSIONREMOVEFROMUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$userid2 = "";
			if (isset($_POST["userid2"]) && $takePOST){
				$userid2 = $_POST["userid2"];
			}elseif (isset($_GET["userid2"]) && $takeGET){
				$userid2erid = $_GET["userid2"];
			}
			
			$permissionKey = "";
			if (isset($_POST["permissionKey"]) && $takePOST){
				$upperString = strtoupper($_POST["permissionKey"]);
				$permissionKey = $upperString;
			}elseif (isset($_GET["permissionKey"]) && $takeGET){
				$upperString = strtoupper($_GET["permissionKey"]);
				$permissionKey = $upperString;
			}
			
			$accessType = "R";
			
			$message["response"] = $SDMAcc->permissionAssignToUser($token,$userid,$userid2,$permissionKey,$accessType);
			$return = json_encode($message);
			break;
			
		//addGroup
		case "ADDGROUP":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$groupName = "";
			if (isset($_POST["groupName"]) && $takePOST){
				$groupName = $_POST["groupName"];
			}elseif (isset($_GET["groupName"]) && $takeGET){
				$groupName = $_GET["groupName"];
			}
			
			$groupDesc = "";
			if (isset($_POST["groupDesc"]) && $takePOST){
				$groupDesc = $_POST["groupDesc"];
			}elseif (isset($_GET["groupDesc"]) && $takeGET){
				$groupDesc = $_GET["groupDesc"];
			}
			
			$message["response"] = $SDMAcc->addGroup($token,$groupName,$groupDesc);
			$return = json_encode($message);
			break;
		
		//deleteGroup
		case "DELETEGROUP":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$groupID = "";
			if (isset($_POST["groupID"]) && $takePOST){
				$groupID = $_POST["groupID"];
			}elseif (isset($_GET["groupID"]) && $takeGET){
				$groupID = $_GET["groupID"];
			}
			
			$message["response"] = $SDMAcc->deleteGroup($token,$groupID);
			$return = json_encode($message);
			break;
		
		//editGroup
		case "EDITGROUP":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$groupID = "";
			if (isset($_POST["groupID"]) && $takePOST){
				$groupID = $_POST["groupID"];
			}elseif (isset($_GET["groupID"]) && $takeGET){
				$groupID = $_GET["groupID"];
			}
			
			$groupName = "";
			if (isset($_POST["groupName"]) && $takePOST){
				$groupName = $_POST["groupName"];
			}elseif (isset($_GET["groupName"]) && $takeGET){
				$groupName = $_GET["groupName"];
			}
			
			$groupDesc = "";
			if (isset($_POST["groupDesc"]) && $takePOST){
				$groupDesc = $_POST["groupDesc"];
			}elseif (isset($_GET["groupDesc"]) && $takeGET){
				$groupDesc = $_GET["groupDesc"];
			}
			
			$message["response"] = $SDMAcc->editGroup($token,$groupID,$groupName,$groupDesc);
			$return = json_encode($message);
			break;
			
		//showAllGroup
		case "SHOWALLGROUP":
			$message["response"] = $SDMAcc->showAllGroup();
			$return = json_encode($message);
			break;
		
		//showAllGroupUser
		case "SHOWALLGROUPUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$groupID = "";
			if (isset($_POST["groupID"]) && $takePOST){
				$groupID = $_POST["groupID"];
			}elseif (isset($_GET["groupID"]) && $takeGET){
				$groupID = $_GET["groupID"];
			}
			
			$message["response"] = $SDMAcc->showAllGroupUser($token,$groupID);
			$return = json_encode($message);
			break;
		
		//addGroupUser
		case "ADDGROUPUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$groupID = "";
			if (isset($_POST["groupID"]) && $takePOST){
				$groupID = $_POST["groupID"];
			}elseif (isset($_GET["groupID"]) && $takeGET){
				$groupID = $_GET["groupID"];
			}
			
			$action = "A";
			
			$message["response"] = $SDMAcc->editGroupUser($token,$userid,$groupID,$action);
			$return = json_encode($message);
			break;
		
		//removeGroupUser
		case "REMOVEGROUPUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$groupID = "";
			if (isset($_POST["groupID"]) && $takePOST){
				$groupID = $_POST["groupID"];
			}elseif (isset($_GET["groupID"]) && $takeGET){
				$groupID = $_GET["groupID"];
			}
			
			$action = "R";
			
			$message["response"] = $SDMAcc->editGroupUser($token,$userid,$groupID,$action);
			$return = json_encode($message);
			break;
		
		//grantPermissionToGroup
		case "PERMISSIONGRANTTOGROUP":
		 	$token = "";
		 	if (isset($_POST["token"]) && $takePOST){
		 		$token = $_POST["token"];
		 	}elseif (isset($_GET["token"]) && $takeGET){
		 		$token = $_GET["token"];
		 	}
		 	
		 	$groupID = "";
		 	if (isset($_POST["groupID"]) && $takePOST){
		 		$groupID = $_POST["groupID"];
		 	}elseif (isset($_GET["groupID"]) && $takeGET){
		 		$groupID = $_GET["groupID"];
		 	}
		 	
		 	$permissionKey = "";
		 	if (isset($_POST["permissionKey"]) && $takePOST){
		 		$upperString = strtoupper($_POST["permissionKey"]);
		 		$permissionKey = $upperString;
		 	}elseif (isset($_GET["permissionKey"]) && $takeGET){
		 		$upperString = strtoupper($_GET["permissionKey"]);
		 		$permissionKey = $upperString;
		 	}
		 	
		 	$message["response"] = $SDMAcc->grantPermissionToGroup($token,$groupID,$permissionKey);
		 	$return = json_encode($message);
		 	break;

		 //removePermissionFromGroup
		case "PERMISSIONREMOVEFROMGROUP":
			$token = "";
		 	if (isset($_POST["token"]) && $takePOST){
		 		$token = $_POST["token"];
		 	}elseif (isset($_GET["token"]) && $takeGET){
		 		$token = $_GET["token"];
		 	}
		 	
		 	$groupID = "";
		 	if (isset($_POST["groupID"]) && $takePOST){
		 		$groupID = $_POST["groupID"];
		 	}elseif (isset($_GET["groupID"]) && $takeGET){
		 		$groupID = $_GET["groupID"];
		 	}
		 	
		 	$permissionKey = "";
		 	if (isset($_POST["permissionKey"]) && $takePOST){
		 		$upperString = strtoupper($_POST["permissionKey"]);
		 		$permissionKey = $upperString;
		 	}elseif (isset($_GET["permissionKey"]) && $takeGET){
		 		$upperString = strtoupper($_GET["permissionKey"]);
		 		$permissionKey = $upperString;
		 	}
		 	
		 	$message["response"] = $SDMAcc->removePermissionToGroup($token,$groupID,$permissionKey);
		 	$return = json_encode($message);
		 	break;
		
		//showUserDetail
		case "SHOWUSERDETAIL":
			$token = "";
		 	if (isset($_POST["token"]) && $takePOST){
		 		$token = $_POST["token"];
		 	}elseif (isset($_GET["token"]) && $takeGET){
		 		$token = $_GET["token"];
		 	}
		 	
		 	$userid = "";
			if (isset($_POST["userid"]) && $takePOST){
				$userid = $_POST["userid"];
			}elseif (isset($_GET["userid"]) && $takeGET){
				$userid = $_GET["userid"];
			}
			
			$userid2 = "";
			if (isset($_POST["userid2"]) && $takePOST){
				$userid2 = $_POST["userid2"];
			}elseif (isset($_GET["userid2"]) && $takeGET){
				$userid2erid = $_GET["userid2"];
			}
			
			$message["response"] = $SDMAcc->showUserDetail($token,$userid,$userid2);
			$return = json_encode($message);
			break;
		
		//showAllUser
		case "SHOWALLUSER":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$message["response"] = $SDMAcc->showAllUser($token);
			$return = json_encode($message);
			break;
		
		//showALLPermissionofGroup
		case "SHOWALLPERMISSIONOFGROUP":
			$token = "";
			if (isset($_POST["token"]) && $takePOST){
				$token = $_POST["token"];
			}elseif (isset($_GET["token"]) && $takeGET){
				$token = $_GET["token"];
			}
			
			$groupID = "";
			if (isset($_POST["groupID"]) && $takePOST){
				$groupID = $_POST["groupID"];
			}elseif (isset($_GET["groupID"]) && $takeGET){
				$groupID = $_GET["groupID"];
			}
			
			$message["response"] = $SDMAcc->showPermissionGroup($token,$groupID);
			$return  = json_encode($message);
			break;
			
		default:
			$message["response"]["actionResult"] = "FAIL";
			$message["response"]["reason"] = "ERROR! INVALID_ACTION";
			$return = json_encode($message);
	}
	
	print $return;
?>