<form id="addUserForm" class="uk-form uk-form-stacked" style="margin-left:10px">
	<fieldset>
		<legend><a id="back" href="javascript:void(0)"> < </a>Forget Password</legend>
		<div id="InputContent">
			<p class="uk-article-lead">Please input the userid or E-mail address that was used to register, We will send an E-mail to your mailbox to reset the password.</p>
			<div class="uk-form-row">
				<label class="uk-form-label">Name :</label>
				<div class="uk-form-controls">
					<input type="text" name="userid" autocomplete="off" placeholder="The user nam for login.">
				</div>
			</div>
			<div class="uk-form-row">
				<label class="uk-form-label">Email :</label>
				<div class="uk-form-controls">
					<input name="email" placeholder="The E-mail address for register.">
					<div>
					</div>
				</div>
			</div>
			<div class="uk-form-row">
			</div>
			<div class="uk-form-row">
				<p id="userid_help" class="uk-form-danger", style="display:none;">The user is invalid.</p>
				<p id="nothing_help" class="uk-form-danger", style="display:none;">Please input the user name or E-mail address.</p>
				<p id="email_help" class="uk-form-danger", style="display:none;">Invalid E-mail address.</p>
				<p id="email_send_fail_help" class="uk-form-danger", style="display:none;">Message Delivery failed.</p>
			</div>
			<div class="uk-form-row">
				<label class="uk-form-label"></label>
				<div class="uk-form-controls">
				<input class="uk-button" type="button" name="submit" id="submit" value="Submit"/>
				</div>
			</div>
		</div>
		<div>
			<p id="email_send_ok_help" class="uk-article-lead uk-form-success", style="display:none;">
				The system has sent a message to your mailbox, please login to your mailbox and reset your password in time!
			</p>
		</div>
    </fieldset>
</form>

<div style="display: none;">
    <div id="dialog_msg">
        <p id="dialog_msg_text"></p>
    </div>
</div>
