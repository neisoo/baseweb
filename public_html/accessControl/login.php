<?php
	session_start();

	$show_captcha = false;
	if (isset($_SESSION['login_fail_count'])){ 
		if ($_SESSION['login_fail_count'] > 3) {
			$show_captcha = true;
		}
	}
?>
<form class="uk-form uk-form-horizontal" style="margin-left:10px">
    <fieldset>
		<br/><br/>
		<div class="uk-form-row">
			<h2 style="text-align:center;"><b>Remote Device Management System</b></h2>
		</div>
		<br/><br/><br/>
		<div class="uk-form-row">
			<div class="uk-width-7-10 uk-width-small-7-10 uk-width-medium-5-10 uk-width-large-3-10 uk-container-center">
				<div class="uk-form-icon uk-width-1-1">
					<i class="uk-icon-user"></i>
					<input class="uk-width-1-1" type="text" id="name" placeholder="Username">
				</div>
			</div>
		</div>
		<div class="uk-form-row">
			<div class="uk-width-7-10 uk-width-small-7-10 uk-width-medium-5-10 uk-width-large-3-10 uk-container-center">
				<div class="uk-form-icon uk-form-password uk-width-1-1">
					<i class="uk-icon-key"></i>
					<input class="uk-width-1-1" type="password" id="password" placeholder="Password">
					<a href="" class="uk-form-password-toggle" data-uk-form-password='{lblShow:"<i class=\"uk-icon-eye\">", lblHide:"<i class=\"uk-icon-eye-slash\">"}'><i class="uk-icon-eye-slash"></i></a>
				</div>
			</div>
		</div>
		<div class="uk-form-row">
		</div>
		<div id="captcha_div" class="uk-form-row" <?php if (!$show_captcha) { echo 'style="display:none;"'; }?> >
			<div class="uk-width-7-10 uk-width-small-7-10 uk-width-medium-5-10 uk-width-large-3-10 uk-container-center">
				<label >Captcha : </label>
				<input id="captcha" name="captcha" class="uk-width-1-6" placeholder="">
				<img id="captcha_img" src="public_html/accessControl/captcha.php"/>
				<a href="javascript:void(0)" onclick="document.getElementById('captcha_img').src='public_html/accessControl/captcha.php'">Next?</a>
			</div>
		</div>
		<div class="uk-form-row">
			<div class="uk-width-7-10 uk-width-small-7-10 uk-width-medium-5-10 uk-width-large-3-10 uk-container-center">
				<div class="uk-form-icon uk-width-1-1">
					<p id="login_fail_help" class="uk-form-danger", style="display:none;">The input of name or password is not correct.</p>
					<p id="attempt_fail_help" class="uk-form-danger", style="display:none;">Login failed. Account is locked.</p>
					<p id="captcha_fail_help" class="uk-form-danger", style="display:none;">Captcha code is not correct.</p>
				</div>
			</div>
		</div>
		<div class="uk-form-row">
			<div class="uk-width-7-10 uk-width-small-7-10 uk-width-medium-5-10 uk-width-large-3-10 uk-container-center">
				<input class="uk-button uk-width-1-1" type="button" value="Login" onclick="login();" />
			</div>
		</div>
		<div class="uk-form-row">
			<div class="uk-width-7-10 uk-width-small-7-10 uk-width-medium-5-10 uk-width-large-3-10 uk-container-center">
				<div style="display:inline;">
					<a href="#" onclick="return getOutput('accessControl/forgetPassword.php', false);">Forget Password </a>|
				</div>
				<div style="display:inline;">
					<a href="#" onclick="return getOutput('accessControl/registerUserSelf.php', false);">Register User</a>
				</div>
			</div>
		</div>
    </fieldset>
</form>

<div style="display: none;">
	<div id="dialog_msg">
        <p id="dialog_msg_text"></p>
    </div>
</div>