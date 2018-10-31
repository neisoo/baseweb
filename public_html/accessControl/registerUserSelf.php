<form id="addUserForm" class="uk-form uk-form-horizontal" style="margin-left:10px">
	<fieldset>
		<legend><a id="back" href="javascript:void(0)"> < </a>Register New User</legend>
		<div class="uk-form-row">
			<label class="uk-form-label">Name :</label>
			<div class="uk-form-controls">
				<input type="text" name="userid" autocomplete="off" placeholder="In 8~16 characters.">
				<div>
					<p id="userid_help" class="uk-form-danger", style="display:none;">Required only 8~16 characters.</p>
					<p id="userid_duplicate_help" class="uk-form-danger", style="display:none;">The user is already exists.</p>
				</div>
			</div>
		</div>
		<div class="uk-form-row">
			<label class="uk-form-label">Password :</label>
			<div class="uk-form-controls">
				 <div class="uk-form-password">
					<input type="password" name="password" autocomplete="off" placeholder="In 8~15 characters.">
					<a href="" class="uk-form-password-toggle" data-uk-form-password='{lblShow:"<i class=\"uk-icon-eye\">", lblHide:"<i class=\"uk-icon-eye-slash\">"}'><i class="uk-icon-eye-slash"></i></a>
				</div>
				<div>
					<p id="password_help" class="uk-form-danger", style="display:none;">Required only 8~15 characters.</p>
				</div>
			</div>
		</div>
		<div class="uk-form-row">
			<label class="uk-form-label">Confirm Password :</label>
			<div class="uk-form-controls">
				<div class="uk-form-password">
					<input type="password" name="confirmPassword" autocomplete="off" placeholder="Duplicate the password.">
					<a href="" class="uk-form-password-toggle" data-uk-form-password='{lblShow:"<i class=\"uk-icon-eye\">", lblHide:"<i class=\"uk-icon-eye-slash\">"}'><i class="uk-icon-eye-slash"></i></a>
				</div>
				<div>
					<p id="confirmPassword_help" class="uk-form-danger", style="display:none;">Password and Confirm Password not match.</p>
				</div>
			</div>
		</div>
		<div class="uk-form-row">
			<label class="uk-form-label">Email :</label>
			<div class="uk-form-controls">
				<input name="email" autocomplete="off" placeholder="For retrieve the password.">
				<div>
					<p id="email_help" class="uk-form-danger", style="display:none;">Invalid email address.</p>
					<p id="email_duplicate_help" class="uk-form-danger", style="display:none;">The email was already used by other user.</p>
				</div>
			</div>
		</div>
		<div class="uk-form-row">
			<label class="uk-form-label">Captcha :</label>
			<div class="uk-form-controls">
				<input name="captcha" class="uk-form-width-small" autocomplete="off" placeholder="">
				<img id="captcha_img" src='public_html/accessControl/captcha.php'/>
				<a href="javascript:void(0)" onclick="document.getElementById('captcha_img').src='public_html/accessControl/captcha.php'">Next?</a>
				<div>
					<p id="captcha_help" class="uk-form-danger", style="display:none;">Invalid captcha code.</p>
				</div>
			</div>
		</div>
		<div class="uk-form-row">
			<label class="uk-form-label"></label>
			<div class="uk-form-controls">
			<input class="uk-button" type="button" name="submit" value="Submit"/>
			</div>
		</div>
    </fieldset>
</form>

<div style="display: none;">
    <div id="dialog_msg">
        <p id="dialog_msg_text"></p>
    </div>
</div>
