<?php
session_start();
ini_set("display_errors", 1);
require("resources/config.php");
include __DIR__."/resources/library/accessControl/SDM/Utils/DBHandler/model.php";
include	__DIR__."/auditlog/AuditLog.php";
$checker = true;
$returnJson = array();
date_default_timezone_set("Hongkong");

$token = stripslashes(trim($_GET['token']));
$userid = stripslashes(trim($_GET['userid']));
$code = stripslashes(trim($_GET['code']));
$time = stripslashes(trim($_GET['time']));
$result = "fail";

// 通过useid获得email和旧密码的md5值
$post = array(
	"action"=>"userForgetPassword",
	"userid"=>$userid,
	"email"=>""
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
	$returnJson['userid'] = $json["response"]["userid"];
	$returnJson['email'] = $json["response"]["email"];
	$returnJson['password'] = $json["response"]["password"];

	// 验证token和code
	$getpasstime = time(); 
	$token_cal = md5($returnJson['userid'] . $returnJson['password']);//组合验证码 
	$code_cal = md5($returnJson['userid'] . $time); //验证时间是否被篡改

	if ($token == $token_cal) {
		if ($code == $code_cal) {
			if ((time() - strtotime($time)) > 24*60*60){ // 验证是否超时
				$result = "timeout";
			}
			else {
				$result = "ok";
			}
		}
	}
}

?>

<html>
<head>
	<!-- head -->
	<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
	<meta http-equiv='Pragma' content='no-cache' />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<?php
		// 加载配置中要求的js和css文件
		require_once(LIBRARY_PATH . "/templateFunctions.php");

		requireJS($config);
		requireCSS($config);

		// 设置配置中的标题
		echo '<title>'.$config['head']['title'].'</title>';

		// 设置favicon图标
		echo '<link rel="icon" href="'.$config['head']['favorite_icon'].'" />';
	?>
</head>


<!--body-->
<body>
<!-- 加载中滚动条，默认隐藏，需要时显示 -->
<div id="loading_div"></div>
<div id="container">
	<?php
		// 从模板中导入顶部条和菜单
		importTopPanel();
		importMenu();
	?>

	<!-- 主内容区域，ajax不同的页面内容来替换这个div的内容 -->
	<div id="MainContent">
		<form id="resetPasswordForm" class="uk-form uk-form-stacked" style="margin-left:10px">
			<fieldset>
				<legend>Reset Password</legend>
				<?php
				if ($result == 'ok') {
					echo '<div id="InputContent">';
					echo '<p class="uk-article-lead">Please input the new password.</p>';
					echo '<div class="uk-form-row">';
					echo '	<label class="uk-form-label">New Password :</label>';
					echo '	<div class="uk-form-controls">';
					echo '		 <div class="uk-form-password">';
					echo '			<input type="password" name="password" autocomplete="off" placeholder="In 8~15 characters.">';
					echo '			<a href="" class="uk-form-password-toggle" data-uk-form-password=\'{lblShow:"<i class=\"uk-icon-eye\">", lblHide:"<i class=\"uk-icon-eye-slash\">"}\'><i class="uk-icon-eye-slash"></i></a>';
					echo '		</div>';
					echo '		<div>';
					echo '			<p id="password_help" class="uk-form-danger", style="display:none;">Required only 8~15 characters.</p>';
					echo '		</div>';
					echo '	</div>';
					echo '</div>';
					echo '<div class="uk-form-row">';
					echo '	<label class="uk-form-label">Confirm Password :</label>';
					echo '	<div class="uk-form-controls">';
					echo '		<div class="uk-form-password">';
					echo '			<input type="password" name="confirmPassword" autocomplete="off" placeholder="Duplicate the password.">';
					echo '			<a href="" class="uk-form-password-toggle" data-uk-form-password=\'{lblShow:"<i class=\"uk-icon-eye\">", lblHide:"<i class=\"uk-icon-eye-slash\">"}\'><i class="uk-icon-eye-slash"></i></a>';
					echo '		</div>';
					echo '		<div>';
					echo '			<p id="confirmPassword_help" class="uk-form-danger", style="display:none;">Password and Confirm Password not match.</p>';
					echo '		</div>';
					echo '	</div>';
					echo '</div>';
					echo '<div class="uk-form-row">';
					echo '</div>';
					echo '<div class="uk-form-row">';
					echo '	<label class="uk-form-label"></label>';
					echo '	<div class="uk-form-controls">';
					echo '	<input class="uk-button" type="button" id="submit" name="submit" value="Submit"/>';
					echo '	</div>';
					echo '</div>';
					echo '</div>';
					echo '<div>';
					echo '<p id="success_help" class="uk-article-lead uk-form-success", style="display:none;">Password reset success. click <a href="' . $config['site_url_root'] . '" >here</a> to login.</p>';
					echo '</div>';

				}
				else if ($result == 'fail') {
					echo '<p class="uk-article-lead uk-form-danger">This url is incorrect.</p>';
				}
				else if ($result == 'timeout') {
					echo '<p class="uk-article-lead uk-form-danger">This url is timeout.</p>';
				}
				?>
				
			</fieldset>
		</form>
		<script type="text/javascript">
$( document ).ready(function() {
	$("[name=submit]").on( "click", function() {
		display_element('loading_div',true);

		var check = true;
		var password = $("[name=password]").val();
		var confirmPassword = $("[name=confirmPassword]").val();
		var token = '<?php echo $token; ?>';
		var userid = '<?php echo $userid; ?>';
		var code = '<?php echo $code; ?>';
		var time = '<?php echo $time; ?>';

		$("[name=password]").removeClass("uk-form-danger");
		$("[name=confirmPassword]").removeClass("uk-form-danger");
		display_element('password_help', false);
		display_element('confirmPassword_help', false);

		if (password.length < 8 || password.length > 15){
			$("[name=password]").addClass("uk-form-danger");
			display_element('password_help', true);
			check = false;
		}

		if (password != confirmPassword){
			$("[name=confirmPassword]").addClass("uk-form-danger");
			display_element('confirmPassword_help', true);
			check = false;
		}

		if (check == true){
			var commandJson = '{ "action": "UserRetrievePassword", "security_code": "rdms123'
				+ '", "userid": "'+ userid
				+ '", "newPassword": "' + MD5(password)
				+ '", "token": "' + token
				+ '", "code": "' + code
				+ '", "time": "' + time
				+ '" }';
			$.post("API/UserManagementAPI.php", {"postJson": commandJson} ,function(data){
				var jsonObj = $.parseJSON(data);
				if (jsonObj.result == 'ok') {
					// 重置成功
					display_element('InputContent', false);
					display_element('success_help', true);
				} else {
					if (jsonObj.error_reason == 'DUPLICATE_USERID') {
						$("[name=userid]").addClass("uk-form-danger");
						$("#userid_duplicate_help").html("The user name '" + userid + "'  has been registered.");
						display_element('userid_duplicate_help', true);
					}
					else if (jsonObj.error_reason == 'DUPLICATE_EMAIL') {
						$("[name=email]").addClass("uk-form-danger");
						display_element('email_duplicate_help', true);
					}
					else if (jsonObj.error_reason == 'INVALID_CAPTCHA') {
						$("[name=captcha]").addClass("uk-form-danger");
						display_element('captcha_help', true);
					}
					else {
						showMessageDialog("Fail", jsonObj.error_message);
					}
				}
			});
		}

		display_element('loading_div', false);
	});
});
	</script>


	</div>
</div>
</body>
</html>
