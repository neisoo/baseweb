//@ sourceURL=http://192.168.5.122/photobook/public_html/accessControl/js/registerUserSelf.js

// JavaScript Document
$(document).ready(function(){

	// 设置验证码图片与其它控件等高。
	var height = $("[name=captcha]").outerHeight(true);
	$("#captcha_img").height(height);

	$("#back").on( "click", function() {
		getOutput('accessControl/login.php', false);
	});
		
	$("[name=submit]").on( "click", function() {
		display_element('loading_div',true);

		var check = true;
		var userid = $("[name=userid]").val();
		var password = $("[name=password]").val();
		var confirmPassword = $("[name=confirmPassword]").val();
		var email = $("[name=email]").val();
		var captcha = $("[name=captcha]").val();;

		$("[name=userid]").removeClass("uk-form-danger");
		$("[name=password]").removeClass("uk-form-danger");
		$("[name=confirmPassword]").removeClass("uk-form-danger");
		$("[name=email]").removeClass("uk-form-danger");
		$("[name=captcha]").removeClass("uk-form-danger");
		display_element('userid_help', false);
		display_element('userid_duplicate_help', false);
		display_element('password_help', false);
		display_element('confirmPassword_help', false);
		display_element('email_help', false);
		display_element('email_duplicate_help', false);
		display_element('captcha_help', false);

		if (userid.length < 8 || userid.length > 16){
			$("[name=userid]").addClass("uk-form-danger");
			display_element('userid_help', true);
			check = false;
		}

		if (password.length < 8 || password.length > 15){
			$("[name=password]").addClass("uk-form-danger");
			display_element('password_help', true);
			check = false;
		}

		if (password != confirmPassword){
			$("[name=confirmPassword]").addClass("uk-form-danger");
			display_element('confirmPassword_help', true);
			//showMessageDialog("Warning", "Password and Confirm Password not match.");
			check = false;
		}

		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(email)){
			$("[name=email]").addClass("uk-form-danger");
			display_element('email_help', true);
			check = false;
		}

		if (check == true){
			var commandJson = '{ "action": "AddUserSelf", "security_code": "rdms123'
				+ '", "userid": "'+ userid
				+ '", "password": "' + MD5(password)
				+ '", "email": "' + email
				+ '", "captcha": "' + captcha
				+ '" }';
			$.post("API/UserManagementAPI.php", {"postJson": commandJson} ,function(data){
				var jsonObj = $.parseJSON(data);
				if (jsonObj.result == 'ok') {
					// 注册成功，回到登录页面，填好表单。
					getOutput('accessControl/login.php', false);
					$("#name").val(userid);
					$("#password").val(password);
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

	function showMessageDialog(title, text){
		$("#dialog_msg_text").text(text);
		if(text == "Success"){
			$("#dialog_msg").dialog({
				modal: true,
				title: title,
				width: 400,
				position: 'top',
				close: function( event, ui ) {
					$("#dialog_msg").dialog('destroy');
					getOutput('accessControl/login.html', false);
				},
				closeOnEscape: false,
				buttons: [{ text: "Ok", click: function(){
					$("#dialog_msg").dialog( "destroy" );
					getOutput('accessControl/login.html', false);
				}
				}]
			});
		}else{
		    $("#dialog_msg").dialog({
			modal: true,
			title: title,
			width: 400,
			position: 'top',
			close: function( event, ui ) {
				$("#dialog_msg").dialog('destroy');
			},
			closeOnEscape: false,
			buttons: [{ text: "Ok", click: function(){
				$("#dialog_msg").dialog( "destroy" );
			}
			}]
		});
		}
	}
});
