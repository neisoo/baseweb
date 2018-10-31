<?php
include __DIR__."/../../Utils/DBHandler/model.php";

class SDMAccessControl{
	private $dbh;
	private $sp;
	private $dbjson;
	private $SDMAccessControlTimeOut;	
	private $SDMAccessControlAPIRequestPermission;
	private $SDMAccessControlAutoActiveNewRegister;
	
	public function __construct($includeType=null){
		session_start();
		ini_set("display_errors",1);
		
		include_once __DIR__."/config.php";
		$this->SDMAccessControlTimeOut = $SDMAccessControlTimeOut;
		
		$this->SDMAccessControlAPIRequestPermission = $SDMAccessControlAPIRequestPermission;
		
		$this->SDMAccessControlAutoActiveNewRegister  = $SDMAccessControlAutoActiveNewRegister;
	}
	//get user ipAddress
	private function getUserIpAddress(){
		$ipaddress = "";
		if (getenv("HTTP_CLIENT_IP")){
			$ipaddress = getenv("HTTP_CLIENT_IP");
		}else if(getenv("HTTP_X_FORWARDED_FOR")){
			$ipaddress = getenv("HTTP_X_FORWARDED_FOR" & quot);
		}else if(getenv("HTTP_X_FORWARDED")){
			$ipaddress = getenv('HTTP_X_FORWARDED');
		}else if(getenv("HTTP_FORWARDED_FOR")){
			$ipaddress = getenv("HTTP_FORWARDED_FOR");
		}else if(getenv("HTTP_FORWARDED")){
			$ipaddress = getenv("HTTP_FORWARDED");
		}else if(getenv("REMOTE_ADDR")){
			$ipaddress = getenv("REMOTE_ADDR");
		}else{
			$ipaddress = "UNKNOWN";
		}
		return $ipaddress;
	}
	
	//loginSubmit
	public function login($userid,$password,$userid2=null,$password2=null){
		if (!preg_match("/^\w+$/", $userid)){
			$loginResult["loginStatus"] = "LOGINFAIL";
			return $loginResult;
		}
		
		$dbh = SDMDBH::getInstance();
		$sp="sp_SDM_AccessControl_LoginSubmitChecking";
		
		$params = new SDMDBParameters();
		$params->add($userid);
		$params->add($password);
		$params->add($this->getUserIpAddress());
		
		$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);		

		if (isset($json["response"]["system"]["errorNo"])){
			if ($json["response"]["system"]["errorNo"] == "0"){
				if ($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
					$loginResult["loginStatus"] = "LOGINSUCEESS";
					$loginResult["token"] = $json["response"]["resultSet"][0]["loginToken"];
				}else{
					$loginResult["loginStatus"] = "LOGINFAIL";
				}			
			}else{
				$loginResult["actionResult"] = "FAIL";
				$loginResult["reason"] = "DB_FAIL";
			}
		}
		return $loginResult;
	}

	//logoutSubmit
	public function logout($token){	
		$dbh = SDMDBH::getInstance();
		$sp="sp_SDM_AccessControl_LogoutSubmit";
		
		$params = new SDMDBParameters();
		$params->add($token);
		
		$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
		
		if (isset($json["response"]["system"]["errorNo"])){
			if ($json["response"]["system"]["errorNo"] == "0"){
				$logoutResult["logoutStatus"] = "LOGOUTSUCCESS";
			}else{
				$logoutResult["logoutStatus"] = "LOGOUTFAIL";
			}
		}
		return $logoutResult;
	}
	
	//VerifyLogin
	public function verifyLogin($token,$extendSession){
		$dbh = SDMDBH::getInstance();
		$sp="sp_SDM_AccessControl_LoginVerify";
		
		$params = new SDMDBParameters();
		$params->add($token);
		$params->add($this->SDMAccessControlTimeOut);
		if($extendSession == "yes"){
			$extendSession = 1;
		}else{
			$extendSession = 0;
		}
		$params->add($extendSession);
		$params->add($this->getUserIpAddress());
		
		$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
		
		if(isset($json["response"]["system"]["errorNo"])){
			if ($json["response"]["system"]["errorNo"] == "0"){
				if ($json["response"]["resultSet"][0]["result"] == "LOGIN"){
					$verifyLoginResult["loginStatus"] = "ISLOGIN";
				}elseif($json["response"]["resultSet"][0]["result"] == "TIMEOUT"){
					$verifyLoginResult["loginStatus"] = "TIMEOUT";
				}else{
					$verifyLoginResult["loginStatus"] = "NOTLOGIN";
				}
			}else{
				$verifyLoginResult["actionResult"] = "FAIL";
				$verifyLoginResult["reason"] = "DB_FAIL";
			}
		}
		return $verifyLoginResult;
	}
	
	//addUser
	public function addUser($token,$parentid,$userid,$password, $email){	
		//Check config require check permission or not
		if(isset($this->SDMAccessControlAPIRequestPermission) &&
		array_key_exists("addUser",$this->SDMAccessControlAPIRequestPermission) &&
		gettype($this->SDMAccessControlAPIRequestPermission["addUser"]) == "string" &&
		$this->SDMAccessControlAPIRequestPermission["addUser"]!==""){
				
			$checkPermission = $this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["addUser"]);
			
			$checkToken = $this->verifyLogin($token,"");
			if($checkToken["loginStatus"] == "TIMEOUT"){
				$addUserResult["actionResult"] = "FAIL";
				$addUserResult["reason"] = "SESSION_TIMEOUT";
				return $addUserResult;
			}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
				$addUserResult["actionResult"] = "FAIL";
				$addUserResult["reason"] = "INVALID_SESSION";
				return $addUserResult;
			}
			
		}else{
			$checkPermission["actionResult"] = "SUCCESS";
		}
	
		if ($checkPermission["actionResult"] == "SUCCESS"){
			
			if (!preg_match("/^\w+$/", $userid)){
				$addUserResult["actionResult"] = "FAIL";
				$addUserResult["reason"] = "INVALID_USERID";
				return $addUserResult;
			}
				
			if($password == ""){
				$addUserResult["actionResult"] = "FAIL";
				$addUserResult["reason"] = "INVALID_PASSWORD";
				return $addUserResult;
			}
			
			$dbh = SDMDBH::getInstance();
			$sp="sp_SDM_AccessControl_UserAdd";
	
			$params = new SDMDBParameters();
            $params->add($parentid);
			$params->add($userid);
			$params->add($password);
			$params->add($email);
			if($this->SDMAccessControlAutoActiveNewRegister){
				$params->add("A");
			}else{
				$params->add("P");
			}
	
			$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
	
	
			if (isset($json["response"]["system"]["errorNo"])){
				if ($json["response"]["system"]["errorNo"] == "0"){
					if ($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
						$addUserResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
					}else{
						$addUserResult["actionResult"] = "FAIL";
						$addUserResult["reason"] = $json["response"]["resultSet"][0]["result"];
					}
				}else{
					$addUserResult["actionResult"] = "FAIL";
					$addUserResult["reason"] = "DB_FAIL";
				}
			}
		}else{
			$addUserResult["actionResult"] = "FAIL";
			$addUserResult["reason"] = "ACCESS_DENIED";
		}
	
		return $addUserResult;
	}
	
	//userForgetPassword
	public function userForgetPassword($userid, $email) {
		$dbh = SDMDBH::getInstance();
		$sp = "sp_SDM_AccessControl_UserForgetPassword";

		$params = new SDMDBParameters();
		$params->add($userid);
		$params->add($email);

		$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
		
		if (isset($json["response"]["system"]["errorNo"])){
			if ($json["response"]["system"]["errorNo"] == "0"){
				if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
					$forgetPasswordResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
					$forgetPasswordResult["userid"] =  $json["response"]["resultSet"][0]["userid"];
					$forgetPasswordResult["password"] = $json["response"]["resultSet"][0]["password"];
					$forgetPasswordResult["email"] =  $json["response"]["resultSet"][0]["email"];
					$forgetPasswordResult["time"] = date('Y-m-d H:i'); // 发起找回的时间
					$forgetPasswordResult["token"] = md5($forgetPasswordResult["userid"] . $json["response"]["resultSet"][0]["password"]);//组合验证码 ;
					$forgetPasswordResult["code"] =  md5($forgetPasswordResult["userid"] . $forgetPasswordResult["time"]); //验证时间是否被篡改
				}
				else {
					$forgetPasswordResult["actionResult"] = "FAIL";
					$forgetPasswordResult["reason"] = $json["response"]["resultSet"][0]["result"];
				}
			}
			else {
					$forgetPasswordResult["actionResult"] = "FAIL";
					$forgetPasswordResult["reason"] = "DB_FAIL";
			}
		}

		return $forgetPasswordResult;
	}

	//userRetrievePassword
	public function userRetrievePassword($userid, $newPassword, $time, $token, $code) {
		$result = self::userForgetPassword($userid, "");
		$retrievePasswordResult["actionResult"] = "FAIL";
		if ($result["actionResult"] == "SUCCESS") {
			// 按上面的规则重新计算token和code与传入的参数比较是否正确。
			$getpasstime = time(); 
			$token_cal = md5($result["userid"] . $result["password"]);//组合验证码 
			$code_cal = md5($result["userid"] . $time); //验证时间是否被篡改
			
			if ($token_cal == $token) {
				if ($code_cal == $code) {
					if ((time() - strtotime($time)) > 24*60*60) { // 验证是否超时
						$retrievePasswordResult["actionResult"] = "FAIL";
						$retrievePasswordResult['reason'] = "TIMEOUT";
					}
					else {
						// 保存新的密码
						$dbh = SDMDBH::getInstance();
						$sp = "sp_rdms_reset_user_password";
						$params = new SDMDBParameters();
						$params->add($userid);
						//$params->add($jsonArray['oldPassword']);
						$params->add($newPassword);
						$json = json_decode($dbh->execute_stored_procedure($sp,$params), true);

						// 密码更新时间
						$sp = "sp_password_log_insert";
						$params = new SDMDBParameters();
						$params->add($userid);
						$params->add($newPassword);
						$dbh->execute_stored_procedure($sp,$params);

						$retrievePasswordResult['actionResult'] = "SUCCESS";
					}
				}
				else {
					$retrievePasswordResult["actionResult"] = "FAIL";
					$retrievePasswordResult['reason'] = "INVALID_CODE";
				}
			}
			else {
				$retrievePasswordResult["actionResult"] = "FAIL";
				$retrievePasswordResult['reason'] = "INVALID_TOKEN";
			}
			return $retrievePasswordResult;
		}

		return $result;
	}
	
	//verifyPermission
	public function verifyPermission($token,$permissionKey){
		if($permissionKey == ""){
			$permissionKeyArray["actionResult"] = "FAIL";
			$permissionKeyArray["reason"] = "INVALID_PERMISSIONKEY";
			return $permissionKeyArray;
		}
		$dbh = SDMDBH::getInstance();
		$sp="sp_SDM_AccessControl_PermissionVerify";
		
		$tmp = explode("|",$permissionKey);
		$bcount = 0;
		$allPermissionPass = true;
		$permissionKeyArray["actionResult"] = "FAIL";
		
			for($count = 0; $count < count($tmp); $count++){	
				if($tmp[$count] != ""){
					$params = new SDMDBParameters();
					$params->add($token);
					$params->add($this->SDMAccessControlTimeOut);
					$params->add($tmp[$count]);
				
					$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
					
					$permissionKeyArray["verifyDetail"]["permission"][$bcount]["permissionKey"] = $tmp[$count];
					
					if(isset($json["response"]["system"]["errorNo"])){
						if ($json["response"]["system"]["errorNo"] == "0"){
							$permissionKeyArray["verifyDetail"]["permission"][$bcount]["verify"] = $json["response"]["resultSet"][0]["result"];
							if($json["response"]["resultSet"][0]["result"] == "NOTPASS"){
								$allPermissionPass = false;
							}
						}else{
							$permissionKeyArray["actionResult"] = "FAIL";
							$permissionKeyArray["reason"] = "DB_FAIL";
						}
					}
					$bcount++;
				}
			}
			if($allPermissionPass){
				$permissionKeyArray["actionResult"] = "SUCCESS";
			}else{
				$permissionKeyArray["actionResult"] = "FAIL";
			}
		return $permissionKeyArray;
	}
	
	//changePassword
	public function changePassword($token,$oldPassword,$newPassword){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			if($newPassword == ""){
				$changePasswordResult["actionResult"] = "FAIL";
				$changePasswordResult["reason"] = "INVALID_NEWPASSWORD";
				return $changePasswordResult;
			}
			
			$dbh = SDMDBH::getInstance();
			$sp="sp_SDM_AccessControl_UserEditPassword";
			
			$params = new SDMDBParameters();
			$params->add($token);
			$params->add($oldPassword);
			$params->add($newPassword);
			$extendSession = 1;
			$params->add($extendSession);
			
			$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
			
			if(isset($json["response"]["system"]["errorNo"])){
				if ($json["response"]["system"]["errorNo"] == "0"){
					if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
						$changePasswordResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
					}else{
						$changePasswordResult["actionResult"] = "FAIL";
						$changePasswordResult["reason"] = $json["response"]["resultSet"][0]["result"];
					}
				}else{
					$changePasswordResult["actionResult"] = "FAIL";
					$changePasswordResult["reason"] = "DB_FAIL";
				}
			}
			
			return $changePasswordResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$changePasswordResult["actionResult"] = "FAIL";
			$changePasswordResult["reason"] = "SESSION_TIMEOUT";
			return $changePasswordResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$changePasswordResult["actionResult"] = "FAIL";
			$changePasswordResult["reason"] = "INVALID_SESSION";
			return $changePasswordResult;
		}
	}
	
	//editUserStatus
	public function editUserStatus($token,$userid,$status){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("userEnableDisable",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["userEnableDisable"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["userEnableDisable"]!==""){
		
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["userEnableDisable"]);
		
			}else{
				$result["actionResult"]="SUCCESS";
			}
		
			if ($result["actionResult"]=="SUCCESS"){
				if (!preg_match("/^\w+$/", $userid)){
					$editUserStatusResult["actionResult"] = "FAIL";
					$editUserStatusResult["reason"] = "INVALID_USERID";
					return $editUserStatusResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_UserEditStatus";
					
				$params = new SDMDBParameters();
				$params->add($userid);
				$params->add($status);
					
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
					
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$editUserStatusResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$editUserStatusResult["actionResult"] = "FAIL";
							$editUserStatusResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$editUserStatusResult["actionResult"] = "FAIL";
						$editUserStatusResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$editUserStatusResult["actionResult"] = "FAIL";
				$editUserStatusResult["reason"] = "ACCESS_DENIED";
			}
			
			return $editUserStatusResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$editUserStatusResult["actionResult"] = "FAIL";
			$editUserStatusResult["reason"] = "SESSION_TIMEOUT";
			return $editUserStatusResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$editUserStatusResult["actionResult"] = "FAIL";
			$editUserStatusResult["reason"] = "INVALID_SESSION";
			return $editUserStatusResult;
		}
	}
	
	//editUserInfo
	public function editUserInfo($token,$email){
		$dbh = SDMDBH::getInstance();
		$sp="sp_SDM_AccessControl_UserEditInfo";
		
		$params = new SDMDBParameters();
		$params->add($token);
		$params->add($email);
		$extendSession = 1;
		$params->add($extendSession);
		
		$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
		
		if(isset($json["response"]["system"]["errorNo"])){
			if ($json["response"]["system"]["errorNo"] == "0"){
				$editUserInfoResult["result"] = $json["response"]["resultSet"][0]["result"];
			}else{
				$editUserInfoResult["actionResult"] = "FAIL";
				$editUserInfoResult["reason"] = "DB_FAIL";
			}
		}
		return $editUserInfoResult;
	}
	
	//addPermission
	public function addPermission($token,$permissionKey,$permissionDesc){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("addPermission",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["addPermission"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["addPermission"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["addPermission"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
			
			if($result["actionResult"] == "SUCCESS"){
				if(
						$permissionKey == "" 
						|| 
						(strpos(strtoupper($permissionKey),'SYS_SDM') !== false && strpos(strtoupper($permissionKey),'SYS_SDM') == 0) 
						|| (preg_match("/[^A-Za-z0-9_]/",$permissionKey))
					){
					$addPermissionResult["actionResult"] = "FAIL";
					$addPermissionResult["reason"] = "INVALID_PERMISSIONKEY";
					return $addPermissionResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_PermissionAdd";
				
				$params = new SDMDBParameters();
				$params->add($permissionKey);
				$params->add($permissionDesc);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
					
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$addPermissionResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$addPermissionResult["actionResult"] = "FAIL";
							$addPermissionResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$addPermissionResult["actionResult"] = "FAIL";
						$addPermissionResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$addPermissionResult["actionResult"] = "FAIL";
				$addPermissionResult["reason"] = "ACCESS_DENIED";
			}
			
		return $addPermissionResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$addPermissionResult["actionResult"] = "FAIL";
			$addPermissionResult["reason"] = "SESSION_TIMEOUT";
			return $addPermissionResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$addPermissionResult["actionResult"] = "FAIL";
			$addPermissionResult["reason"] = "INVALID_SESSION";
			return $addPermissionResult;
		}
	}
	
	//deletePermission
	public function deletePermission($token,$permissionKey){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("deletePermission",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["deletePermission"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["deletePermission"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["deletePermission"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
				
			if($result["actionResult"] == "SUCCESS"){
				if($permissionKey == "" || (strpos(strtoupper($permissionKey),'SYS_SDM') !== false && strpos(strtoupper($permissionKey),'SYS_SDM') == 0)){
					$deletePermissionResult["actionResult"] = "FAIL";
					$deletePermissionResult["reason"] = "INVALID_PERMISSIONKEY";
					return $deletePermissionResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_PermissionDelete";
		
				$params = new SDMDBParameters();
				$params->add($permissionKey);
		
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
					
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$deletePermissionResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$deletePermissionResult["actionResult"] = "FAIL";
							$deletePermissionResult["reason"] = "INVALID_PERMISSIONKEY";
						}
					}else{
						$deletePermissionResult["actionResult"] = "FAIL";
						$deletePermissionResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$deletePermissionResult["actionResult"] = "FAIL";
				$deletePermissionResult["reason"] = "ACCESS_DENIED";
			}
				
			return $deletePermissionResult;
				
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$deletePermissionResult["actionResult"] = "FAIL";
			$deletePermissionResult["reason"] = "SESSION_TIMEOUT";
			return $deletePermissionResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$deletePermissionResult["actionResult"] = "FAIL";
			$deletePermissionResult["reason"] = "INVALID_SESSION";
			return $deletePermissionResult;
		}
	}
	
	//editPermission
	public function editPermission($token,$permissionKey,$permissionDesc){
		if($permissionKey == "" || (strpos(strtoupper($permissionKey),'SYS_SDM') !== false && strpos(strtoupper($permissionKey),'SYS_SDM') == 0)){
			$editPermissionResult["actionResult"] = "FAIL";
			$editPermissionResult["reason"] = "INVALID_PERMISSIONKEY";
			return $editPermissionResult;
		}
		
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("editPermission",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["editPermission"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["editPermission"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["editPermission"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
				
			if($result["actionResult"] == "SUCCESS"){
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_PermissionEdit";
					
				$params = new SDMDBParameters();
				$params->add($permissionKey);
				$params->add($permissionDesc);
	
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
					
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$editPermissionResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$editPermissionResult["actionResult"] = "FAIL";
							$editPermissionResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$editPermissionResult["actionResult"] = "FAIL";
						$editPermissionResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$editPermissionResult["actionResult"] = "FAIL";
				$editPermissionResult["reason"] = "ACCESS_DENIED";
			}
				
			return $editPermissionResult;
				
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$editPermissionResult["actionResult"] = "FAIL";
			$editPermissionResult["reason"] = "SESSION_TIMEOUT";
			return $editPermissionResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$editPermissionResult["actionResult"] = "FAIL";
			$editPermissionResult["reason"] = "INVALID_SESSION";
			return $editPermissionResult;
		}
	}
	
	//showAllPermission
	public function showAllPermission(){
		$dbh = SDMDBH::getInstance();
		$sp="sp_SDM_AccessControl_PermissionShowAll";
		
		$params = new SDMDBParameters();
		
		$json = json_decode($dbh->execute_stored_procedure($sp),true);
		
		if(isset($json["response"]["system"]["errorNo"])){
			if ($json["response"]["system"]["errorNo"] == "0"){
				$showAllPermissionResult["actionResult"] = "SUCCESS";
				$cntSystem = 0;
				$cntUser = 0;
				$showAllPermissionResult["count"] = strval($json["response"]["system"]["rowCount"]);
				
				for($count = 0; $count < count($json["response"]["resultSet"]); $count++){
					if($json["response"]["resultSet"][$count]["permissionType"] == "SYS"){
						$showAllPermissionResult["permissionList"]["system"]["permission"][$cntSystem]["permissionKey"] = $json["response"]["resultSet"][$count]["permissionKey"];
						$showAllPermissionResult["permissionList"]["system"]["permission"][$cntSystem]["permissionDesc"] = $json["response"]["resultSet"][$count]["permissionDesc"];
						$cntSystem++;
					}else{
						$showAllPermissionResult["permissionList"]["user"]["permission"][$cntUser]["permissionKey"] = $json["response"]["resultSet"][$count]["permissionKey"];
						$showAllPermissionResult["permissionList"]["user"]["permission"][$cntUser]["permissionDesc"] = $json["response"]["resultSet"][$count]["permissionDesc"];
						$cntUser++;
					}
				}
			}
		}else{
			$showAllPermissionResult["actionResult"] = "FAIL";
			$showAllPermissionResult["reason"] = "DBFAIL";
		}
		return $showAllPermissionResult;
	}
	
	//showAllPermissionOfUser
	public function showAllPermissionOfUser($token,$userid){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("showAllPermissionOfUser",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["showAllPermissionOfUser"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["showAllPermissionOfUser"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["showAllPermissionOfUser"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
			
			if($result["actionResult"] == "SUCCESS"){
				if (!preg_match("/^\w+$/", $userid)){
					$showAllPermissionOfUserResult["actionResult"] = "FAIL";
					$showAllPermissionOfUserResult["reason"] = "INVALID_USERID";
					return $showAllPermissionOfUserResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_PermissionShowAllOfUser";
				
				$params = new SDMDBParameters();
				$params->add($userid);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["system"]["rowCount"] == 0){
							$showAllPermissionOfUserResult["actionResult"] = "SUCCESS";
							$showAllPermissionOfUserResult["count"] = strval($json["response"]["system"]["rowCount"]);
						}else{
						
							if($json["response"]["resultSet"][0]["result"] != "INVALID_USERID"){
								$showAllPermissionOfUserResult["actionResult"] = "SUCCESS";
								$cntSystem = 0;
								$cntUser = 0;
								$showAllPermissionOfUserResult["count"] = strval($json["response"]["system"]["rowCount"]);
							
								for($count = 0; $count < count($json["response"]["resultSet"]); $count++){
									if($json["response"]["resultSet"][$count]["permissionType"] == "SYS"){
										$showAllPermissionOfUserResult["permissionList"]["system"]["permission"][$cntSystem]["permissionKey"] = $json["response"]["resultSet"][$count]["permissionKey"];
										$showAllPermissionOfUserResult["permissionList"]["system"]["permission"][$cntSystem]["accessType"] = $json["response"]["resultSet"][$count]["accessType"];
										$cntSystem++;
									}else{
										$showAllPermissionOfUserResult["permissionList"]["user"]["permission"][$cntUser]["permissionKey"] = $json["response"]["resultSet"][$count]["permissionKey"];
										$showAllPermissionOfUserResult["permissionList"]["user"]["permission"][$cntUser]["accessType"] = $json["response"]["resultSet"][$count]["accessType"];
										$cntUser++;
									}
								}
							}else{
								$showAllPermissionOfUserResult["actionResult"] = "FAIL";
								$showAllPermissionOfUserResult["reason"] = "INVALID_USERID";
							}
						}
					}
				}else{
					$showAllPermissionOfUserResult["actionResult"] = "FAIL";
					$showAllPermissionOfUserResult["reason"] = "DBFAIL";
				}
			}else{
				$showAllPermissionOfUserResult["actionResult"] = "FAIL";
				$showAllPermissionOfUserResult["reason"] = "ACCESS_DENIED";
			}
			
			return $showAllPermissionOfUserResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$showAllPermissionOfUserResult["actionResult"] = "FAIL";
			$showAllPermissionOfUserResult = "SESSION_TIMEOUT";
			return $showAllPermissionOfUserResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$showAllPermissionOfUserResult["actionResult"] = "FAIL";
			$showAllPermissionOfUserResult["reason"] = "INVALID_SESSION";
			return $showAllPermissionOfUserResult;
		}
	}
	
	//permissionAssignToUser
	public function permissionAssignToUser($token,$userid,$userid2,$permissionKey,$accessType){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("assignPermissionToUser",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["assignPermissionToUser"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["assignPermissionToUser"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["assignPermissionToUser"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
				
			if($result["actionResult"] == "SUCCESS"){
				if($permissionKey == ""){
					$permissionAssignToUserResult["actionResult"]= "FAIL";
					$permissionAssignToUserResult["reason"] = "INVALID_PERMISSIONKEY";
					return $permissionAssignToUserResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_PermissionAssignToUser";
				
				$params = new SDMDBParameters();
				$params->add($userid);
				$params->add($userid2);
				$params->add($permissionKey);
				$params->add($accessType);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$permissionAssignToUserResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$permissionAssignToUserResult["actionResult"] = "FAIL";
							$permissionAssignToUserResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$permissionAssignToUserResult["actionResult"] = "FAIL";
						$permissionAssignToUserResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$permissionAssignToUserResult["actionResult"]= "FAIL";
				$permissionAssignToUserResult["reason"] = "ACCESS_DENIED";
			}
			
			return $permissionAssignToUserResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$permissionAssignToUserResult["actionResult"] = "FAIL";
			$permissionAssignToUserResult["reason"] = "SESSION_TIMEOUT";
			return $permissionAssignToUserResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$permissionAssignToUserResult["actionResult"] = "FAIL";
			$permissionAssignToUserResult["reason"] = "INVALID_SESSION";
			return $permissionAssignToUserResult;
		}
	}
	
	//addGroup
	public function addGroup($token,$groupName,$groupDesc){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("addGroup",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["addGroup"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["addGroup"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["addGroup"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
			
			if($result["actionResult"] == "SUCCESS"){
				if($groupName == ""){
					$addGroupResult["actionResult"]= "FAIL";
					$addGroupResult["reason"] = "INVALID_GROUPNAME";
					return $addGroupResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_GroupAdd";
				
				$params = new SDMDBParameters();
				$params->add($groupName);
				$params->add($groupDesc);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$addGroupResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
							$addGroupResult["groupID"] = $json["response"]["resultSet"][0]["groupID"];
						}else{
							$addGroupResult["actionResult"] = "FAIL";
							$addGroupResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$addGroupResult["actionResult"] = "FAIL";
						$addGroupResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$addGroupResult["actionResult"]= "FAIL";
				$addGroupResult["reason"] = "ACCESS_DENIED";
			}
				
			return $addGroupResult;
				
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$addGroupResult["actionResult"] = "FAIL";
			$addGroupResult["reason"] = "SESSION_TIMEOUT";
			return $addGroupResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$addGroupResult["actionResult"] = "FAIL";
			$addGroupResult["reason"] = "INVALID_SESSION";
			return $addGroupResult;
		}
	}
	
	//deleteGroup
	public function deleteGroup($token,$groupID){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("deleteGroup",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["deleteGroup"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["deleteGroup"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["deleteGroup"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
				
			if($result["actionResult"] == "SUCCESS"){
				if(!preg_match("/[0-9_]/",$groupID)){
					$deleteGroupResult["actionResult"] = "FAIL";
					$deleteGroupResult["reason"] = "INVALID_GROUPID";
					return $deleteGroupResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_GroupDelete";
				
				$params = new SDMDBParameters();
				$params->add($groupID);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$deleteGroupResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$deleteGroupResult["actionResult"] = "FAIL";
							$deleteGroupResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$deleteGroupResult["actionResult"] = "FAIL";
						$deleteGroupResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$deleteGroupResult["actionResult"]= "FAIL";
				$deleteGroupResult["reason"] = "ACCESS_DENIED";
			}
				
			return $deleteGroupResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$deleteGroupResult["actionResult"] = "FAIL";
			$deleteGroupResult["reason"] = "SESSION_TIMEOUT";
			return $deleteGroupResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$deleteGroupResult["actionResult"] = "FAIL";
			$deleteGroupResult["reason"] = "INVALID_SESSION";
			return $deleteGroupResult;
		}
	}
	
	//editGroup
	public function editGroup($token,$groupID,$groupName,$groupDesc){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("editGroup",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["editGroup"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["editGroup"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["editGroup"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
			
			if($result["actionResult"] == "SUCCESS"){
				if(!preg_match("/[0-9_]/",$groupID)){
					$editGroupResult["actionResult"] = "FAIL";
					$editGroupResult["reason"] = "INVALID_GROUPID";
					return $editGroupResult;
				}
				
				if($groupName == ""){
					$editGroupResult["actionResult"]= "FAIL";
					$editGroupResult["reason"] = "INVALID_GROUPNAME";
					return $editGroupResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_GroupEdit";
				
				$params = new SDMDBParameters();
				$params->add($groupID);
				$params->add($groupName);
				$params->add($groupDesc);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$editGroupResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$editGroupResult["actionResult"] = "FAIL";
							$editGroupResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$editGroupResult["actionResult"] = "FAIL";
						$editGroupResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$editGroupResult["actionResult"]= "FAIL";
				$editGroupResult["reason"] = "ACCESS_DENIED";
			}
				
			return $editGroupResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$editGroupResult["actionResult"] = "FAIL";
			$editGroupResult["reason"] = "SESSION_TIMEOUT";
			return $editGroupResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$editGroupResult["actionResult"] = "FAIL";
			$editGroupResult["reason"] = "INVALID_SESSION";
			return $editGroupResult;
		}
	}
	
	//showAllGroup
	public function showAllGroup(){
		$dbh = SDMDBH::getInstance();
		$sp="sp_SDM_AccessControl_GroupShowAll";
		
		$params = new SDMDBParameters();
		
		$json = json_decode($dbh->execute_stored_procedure($sp),true);
		
		if(isset($json["response"]["system"]["errorNo"])){
			if ($json["response"]["system"]["errorNo"] == "0"){
				$showAllGroupResult["actionResult"] = "SUCCESS";
				$countGroup = 0;
				$showAllGroupResult["count"] = strval($json["response"]["system"]["rowCount"]);
				
				for($count = 0; $count < count($json["response"]["resultSet"]); $count++){
					$showAllGroupResult["groupList"]["group"][$countGroup]["groupID"] = $json["response"]["resultSet"][$count]["groupID"];
					$showAllGroupResult["groupList"]["group"][$countGroup]["groupName"] = $json["response"]["resultSet"][$count]["groupShortName"];
					$showAllGroupResult["groupList"]["group"][$countGroup]["groupDesc"] = $json["response"]["resultSet"][$count]["groupDes"];
					$countGroup++;
				}
			}else{
				$showAllGroupResult["actionResult"] = "FAIL";
				$showAllGroupResult["reason"] = "DBFAIL";
			}
		}
		return $showAllGroupResult;
	}
	
	//showAllGroupUser
	public function showAllGroupUser($token,$groupID){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("showAllGroupUser",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["showAllGroupUser"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["showAllGroupUser"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["showAllGroupUser"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
				
			if($result["actionResult"] == "SUCCESS"){
				if(preg_match("/[^0-9]/",$groupID)){
					$showAllGroupUserResult["actionResult"] = "FAIL";
					$showAllGroupUserResult["reason"] = "INVALID_GROUPID";
					return $showAllGroupUserResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_GroupShowAllUser";
				
				$params = new SDMDBParameters();
				$params->add($groupID);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$showAllGroupUserResult["actionResult"] = "SUCCESS";	
							$countGroupUser = 0;
									
							if(isset($json["response"]["resultSet"][0]["userid1"])){
								$showAllGroupUserResult["count"] = strval($json["response"]["system"]["rowCount"]);
								$showAllGroupUserResult["groupInfo"]["groupID"] = $json["response"]["resultSet"][0]["groupID"];
								$showAllGroupUserResult["groupInfo"]["groupName"] = $json["response"]["resultSet"][0]["groupShortName"];
								$showAllGroupUserResult["groupInfo"]["groupDesc"] = $json["response"]["resultSet"][0]["groupDes"];
								for($count = 0; $count < count($json["response"]["resultSet"]); $count++){
									$showAllGroupUserResult["groupUserList"]["groupUser"][$countGroupUser]["userID"] = $json["response"]["resultSet"][$count]["userid1"];
									$showAllGroupUserResult["groupUserList"]["groupUser"][$countGroupUser]["status"] = $json["response"]["resultSet"][$count]["status"];
									$countGroupUser++;
								}
							}else{
								$showAllGroupUserResult["count"] = "0";
								$showAllGroupUserResult["groupInfo"]["groupID"] = $json["response"]["resultSet"][0]["groupID"];
								$showAllGroupUserResult["groupInfo"]["groupName"] = $json["response"]["resultSet"][0]["groupShortName"];
								$showAllGroupUserResult["groupInfo"]["groupDesc"] = $json["response"]["resultSet"][0]["groupDes"];
							}
							
						}else{
							$showAllGroupUserResult["actionResult"] = "FAIL";
							$showAllGroupUserResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$showAllGroupUserResult["actionResult"] = "FAIL";
						$showAllGroupUserResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$showAllGroupUserResult["actionResult"]= "FAIL";
				$showAllGroupUserResult["reason"] = "ACCESS_DENIED";
			}
				
			return $showAllGroupUserResult;
			
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$showAllGroupUserResult["actionResult"] = "FAIL";
			$showAllGroupUserResult["reason"] = "SESSION_TIMEOUT";
			return $showAllGroupUserResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$showAllGroupUserResult["actionResult"] = "FAIL";
			$showAllGroupUserResult["reason"] = "INVALID_SESSION";
			return $showAllGroupUserResult;
		}
	}
	
	//editGroupUser
	public function editGroupUser($token,$userid,$groupID,$action){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("showAllGroupUser",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["showAllGroupUser"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["showAllGroupUser"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["showAllGroupUser"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
			
			if($result["actionResult"] == "SUCCESS"){
				if(preg_match("/[^0-9]/",$groupID)){
					$editGroupUserResult["actionResult"] = "FAIL";
					$editGroupUserResult["reason"] = "INVALID_GROUPID";
					return $editGroupUserResult;
				}
				
				if (!preg_match("/^\w+$/", $userid)){
					$editGroupUserResult["actionResult"] = "FAIL";
					$editGroupUserResult["reason"] = "INVALID_USERID";
					return $editGroupUserResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_GroupEditUser";
				
				$params = new SDMDBParameters();
				$params->add($userid);
				$params->add($groupID);
				$params->add($action);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$editGroupUserResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$editGroupUserResult["actionResult"] = "FAIL";
							$editGroupUserResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$editGroupUserResult["actionResult"] = "FAIL";
						$editGroupUserResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$editGroupUserResult["actionResult"]= "FAIL";
				$editGroupUserResult["reason"] = "ACCESS_DENIED";
			}
				
			return $editGroupUserResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$editGroupUserResult["actionResult"] = "FAIL";
			$editGroupUserResult["reason"] = "SESSION_TIMEOUT";
			return $editGroupUserResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$editGroupUserResult["actionResult"] = "FAIL";
			$editGroupUserResult["reason"] = "INVALID_SESSION";
			return $editGroupUserResult;
		}
	}
	
	//grantPermissionToGroup
	public function grantPermissionToGroup($token,$groupID,$permissionKey){
		if(preg_match("/[^0-9]/",$groupID)){
			$grantPermissionToGroupResult["actionResult"] = "FAIL";
			$grantPermissionToGroupResult["reason"] = "INVALID_GROUPID";
			return $grantPermissionToGroupResult;
		}
		
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("assignPermissionToGroup",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["assignPermissionToGroup"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["assignPermissionToGroup"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["assignPermissionToGroup"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
				
			if($result["actionResult"] == "SUCCESS"){
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_permissionGrantToGroup";
				
				$params = new SDMDBParameters();
				$params->add($groupID);
				$params->add($permissionKey);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$grantPermissionToGroupResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$grantPermissionToGroupResult["actionResult"] = "FAIL";
							$grantPermissionToGroupResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$grantPermissionToGroupResult["actionResult"] = "FAIL";
						$grantPermissionToGroupResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$grantPermissionToGroupResult["actionResult"]= "FAIL";
				$grantPermissionToGroupResult["reason"] = "ACCESS_DENIED";
			}
				
			return $grantPermissionToGroupResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$grantPermissionToGroupResult["actionResult"] = "FAIL";
			$grantPermissionToGroupResult["reason"] = "SESSION_TIMEOUT";
			return $grantPermissionToGroupResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$grantPermissionToGroupResult["actionResult"] = "FAIL";
			$grantPermissionToGroupResult["reason"] = "INVALID_SESSION";
			return $grantPermissionToGroupResult;
		}
	}
	
	//removePermissionToGroup
	public function removePermissionToGroup($token,$groupID,$permissionKey){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("assignPermissionToGroup",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["assignPermissionToGroup"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["assignPermissionToGroup"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["assignPermissionToGroup"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
		
			if($result["actionResult"] == "SUCCESS"){
				if(preg_match("/[^0-9]/",$groupID)){
					$removePermissionToGroupResult["actionResult"] = "FAIL";
					$removePermissionToGroupResult["reason"] = "INVALID_GROUPID";
					return $removePermissionToGroupResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_permissionRemoveFromGroup";
		
				$params = new SDMDBParameters();
				$params->add($groupID);
				$params->add($permissionKey);
		
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
		
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$removePermissionToGroupResult["actionResult"] = $json["response"]["resultSet"][0]["result"];
						}else{
							$removePermissionToGroupResult["actionResult"] = "FAIL";
							$removePermissionToGroupResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
					}else{
						$removePermissionToGroupResult["actionResult"] = "FAIL";
						$removePermissionToGroupResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$removePermissionToGroupResult["actionResult"]= "FAIL";
				$removePermissionToGroupResult["reason"] = "ACCESS_DENIED";
			}
		
			return $removePermissionToGroupResult;
				
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$removePermissionToGroupResult["actionResult"] = "FAIL";
			$removePermissionToGroupResult["reason"] = "SESSION_TIMEOUT";
			return $removePermissionToGroupResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$removePermissionToGroupResult["actionResult"] = "FAIL";
			$removePermissionToGroupResult["reason"] = "INVALID_SESSION";
			return $removePermissionToGroupResult;
		}
	}
	
	//showUserDetail
	public function showUserDetail($token,$userid,$userid2){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("showUserDetail",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["showUserDetail"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["showUserDetail"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["showUserDetail"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
			
			if($result["actionResult"] == "SUCCESS"){
				if (!preg_match("/^\w+$/", $userid)){
					$showUserDetailResult["actionResult"] = "FAIL";
					$showUserDetailResult["reason"] = "INVALID_USERID";
					return $showUserDetailResult;
				}
				
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_UserShowDetail";
				
				$params = new SDMDBParameters();
				$params->add($userid);
				$params->add($userid2);
				
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["resultSet"][0]["result"] == "SUCCESS"){
							$showUserDetailResult["actionResult"] = "SUCCESS";
							$countUserInfo = 0;
							if($json["response"]["resultSet"][0]["result2"] == "NOGROUPOFUSER"){
								$showUserDetailResult["userInfo"]["userid"] = $json["response"]["resultSet"][0]["userid1"];
								$showUserDetailResult["userInfo"]["userStatus"] = $json["response"]["resultSet"][0]["status"];
								$showUserDetailResult["userInfo"]["lastLoginDateTime"] = $json["response"]["resultSet"][0]["lastLoginDt"];
								$showUserDetailResult["userInfo"]["lastAccessDateTime"] = $json["response"]["resultSet"][0]["lastAccessDt"];
								$showUserDetailResult["userInfo"]["lastUpateDateTime"] = $json["response"]["resultSet"][0]["lastUpdteDt"];
							}else{
								$showUserDetailResult["userInfo"]["userid"] = $json["response"]["resultSet"][0]["userid1"];
								$showUserDetailResult["userInfo"]["userStatus"] = $json["response"]["resultSet"][0]["status"];
								$showUserDetailResult["userInfo"]["lastLoginDateTime"] = $json["response"]["resultSet"][0]["lastLoginDt"];
								$showUserDetailResult["userInfo"]["lastAccessDateTime"] = $json["response"]["resultSet"][0]["lastAccessDt"];
								$showUserDetailResult["userInfo"]["lastUpateDateTime"] = $json["response"]["resultSet"][0]["lastUpdteDt"];
								for($count = 0; $count < count($json["response"]["resultSet"]); $count++){
									$showUserDetailResult["groupInfo"][$countUserInfo]["groupID"] = $json["response"]["resultSet"][$count]["groupID"];
									$showUserDetailResult["groupInfo"][$countUserInfo]["groupName"] = $json["response"]["resultSet"][$count]["groupShortName"];
									$countUserInfo ++;
								}
							}
						}else{
							$showUserDetailResult["actionResult"] = "FAIL";
							$showUserDetailResult["reason"] = $json["response"]["resultSet"][0]["result"];
						}
						
					}else{
						$showUserDetailResult["actionResult"] = "FAIL";
						$showUserDetailResult["reason"] = "DB_FAIL";
					}
				}
				
			}else{
				$showUserDetailResult["actionResult"]= "FAIL";
				$showUserDetailResult["reason"] = "ACCESS_DENIED";
			}
			
			return $showUserDetailResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$showUserDetailResult["actionResult"] = "FAIL";
			$showUserDetailResult["reason"] = "SESSION_TIMEOUT";
			return $showUserDetailResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$showUserDetailResult["actionResult"] = "FAIL";
			$showUserDetailResult["reason"] = "INVALID_SESSION";
			return $showUserDetailResult;
		}
	}
	
	//showAllUser
	public function showAllUser($token){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("showAllUser",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["showAllUser"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["showAllUser"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["showAllUser"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
				
			if($result["actionResult"] == "SUCCESS"){
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_UserShowAll";
				
				$params = new SDMDBParameters();
				
				$json = json_decode($dbh->execute_stored_procedure($sp),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						$showAllUserResult["actionResult"] = "SUCCESS";
						$countUser = 0;
						
						for($count = 0; $count < count($json["response"]["resultSet"]); $count++){
							$showAllUserResult["userList"]["user"][$countUser]["userID"] = $json["response"]["resultSet"][$count]["userid1"];
							$showAllUserResult["userList"]["user"][$countUser]["UserStatus"] = $json["response"]["resultSet"][$count]["status"];
							$countUser ++;
						}
					}else{
						$showAllUserResult["actionResult"] = "FAIL";
						$showAllUserResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$showAllUserResult["actionResult"]= "FAIL";
				$showAllUserResult["reason"] = "ACCESS_DENIED";
			}
			
			return $showAllUserResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$showAllUserResult["actionResult"] = "FAIL";
			$showAllUserResult["reason"] = "SESSION_TIMEOUT";
			return $showAllUserResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$showAllUserResult["actionResult"] = "FAIL";
			$showAllUserResult["reason"] = "INVALID_SESSION";
			return $showAllUserResult;
		}
	}
	
	//showPermissionGroup
	public function showPermissionGroup($token,$groupID){
		$checkToken = $this->verifyLogin($token,"");
		if($checkToken["loginStatus"] == "ISLOGIN"){
			//Check config require check permission or not
			if(isset($this->SDMAccessControlAPIRequestPermission) &&
			array_key_exists("showALLPermissionofGroup",$this->SDMAccessControlAPIRequestPermission) &&
			gettype($this->SDMAccessControlAPIRequestPermission["showALLPermissionofGroup"]) == "string" &&
			$this->SDMAccessControlAPIRequestPermission["showALLPermissionofGroup"]!==""){
					
				$result=$this->verifyPermission($token,$this->SDMAccessControlAPIRequestPermission["showALLPermissionofGroup"]);
					
			}else{
				$result["actionResult"] = "SUCCESS";
			}
			
			if($result["actionResult"] == "SUCCESS"){
				if(preg_match("/[^0-9]/",$groupID)){
					$showPermissionGroupResult["actionResult"] = "FAIL";
					$showPermissionGroupResult["reason"] = "INVALID_GROUPID";
					return $showPermissionGroupResult;
				}
			
				$dbh = SDMDBH::getInstance();
				$sp="sp_SDM_AccessControl_PermissionShowAllOfGroup";
				
				$params = new SDMDBParameters();
				$params->add($groupID);
				$json = json_decode($dbh->execute_stored_procedure($sp,$params),true);
				
				if(isset($json["response"]["system"]["errorNo"])){
					if ($json["response"]["system"]["errorNo"] == "0"){
						if($json["response"]["system"]["rowCount"] == 0){
							$showPermissionGroupResult["actionResult"] = "SUCCESS";
							$showPermissionGroupResult["count"] = strval($json["response"]["system"]["rowCount"]);
						}else{
							if($json["response"]["resultSet"][0]["result"] != "INVALID_GROUPID"){
								$showPermissionGroupResult["actionResult"] = "SUCCESS";
								$cntSystem = 0;
								$cntUser = 0;
								$showPermissionGroupResult["count"] = strval($json["response"]["system"]["rowCount"]);
								
								for($count = 0; $count < count($json["response"]["resultSet"]); $count++){
									if($json["response"]["resultSet"][$count]["permissionType"] == "SYS"){
										$showPermissionGroupResult["permissionList"]["system"]["permission"][$cntSystem]["permissionKey"] = $json["response"]["resultSet"][$count]["permissionKey"];
										$cntSystem++;
									}else{
										$showPermissionGroupResult["permissionList"]["user"]["permission"][$cntUser]["permissionKey"] = $json["response"]["resultSet"][$count]["permissionKey"];
										$cntUser++;
									}
								}
							}else{
								
							}
						}
// 						if($json["response"]["system"]["rowCount"] == 0){
// 							$showPermissionGroupResult["actionResult"] = "SUCCESS";
// 							$countpermission = 0;
							
// 							for($count = 0; $count < count($json["response"]["resultSet"]); $count++){
// 								$showPermissionGroupResult["groupPermissionList"]["permission"][$countpermission]["permissionKey"] = $json["response"]["resultSet"][$count]["permissionKey"];
// 								$countpermission ++;
// 							}
// 						}else{
// 							$showPermissionGroupResult["actionResult"] = "SUCCESS";
// 							$showPermissionGroupResult["reason"] = $json["response"]["resultSet"][0]["result"];
// 						}
					}else{
						$showPermissionGroupResult["actionResult"] = "FAIL";
						$showPermissionGroupResult["reason"] = "DB_FAIL";
					}
				}
			}else{
				$showPermissionGroupResult["actionResult"]= "FAIL";
				$showPermissionGroupResult["reason"] = "ACCESS_DENIED";
			}
			
			return $showPermissionGroupResult;
			
		}elseif($checkToken["loginStatus"] == "TIMEOUT"){
			$showPermissionGroupResult["actionResult"] = "FAIL";
			$showPermissionGroupResult["reason"] = "SESSION_TIMEOUT";
			return $showPermissionGroupResult;
		}elseif($checkToken["loginStatus"] == "NOTLOGIN"){
			$showPermissionGroupResult["actionResult"] = "FAIL";
			$showPermissionGroupResult["reason"] = "INVALID_SESSION";
			return $showPermissionGroupResult;
		}
	}
	
// 	public function getLastLoginStatus(){
		
// 		if($this->verifyLogin() == "ISLOGIN"){
// 			if($_SESSION["lastSuccess"] == "" && $_SESSION["lastFail"] == ""){
// 				$loginStatus["status"] = "NO_RECORD";
// 				$loginStatus["time"] = "NO_RECORD";
// 			}elseif($_SESSION["lastSuccess"] > $_SESSION["lastFail"]){
// 				$loginStatus["status"] = "SUCCESS";
// 				$loginStatus["time"] = $_SESSION["lastSuccess"];
// 			}else{
// 				$loginStatus["status"] = "FAIL";
// 				$loginStatus["time"] = $_SESSION["lastFail"];
// 			}
// 		}else{
// 			$loginStatus["status"] = "INVALID";
// 			$loginStatus["time"] = "INVALID";
// 		}
// 		return $loginStatus;
// 	}
	
}
?>