//@ sourceURL=http://192.168.5.122/photobook/public_html/accessControl/js/registerUserSelf.js

// JavaScript Document
$(document).ready(function(){

	$("#back").on( "click", function() {
		getOutput('accessControl/login.php', false);
	});
		
	$("[name=submit]").on( "click", function() {
		display_element('loading_div',true);

		var check = true;
		var userid = $("[name=userid]").val();
		var email = $("[name=email]").val();
		var password = "";

		$("[name=userid]").removeClass("uk-form-danger");
		$("[name=email]").removeClass("uk-form-danger");
		display_element('nothing_help', false);
		display_element('userid_help', false);
		display_element('email_help', false);
		display_element('email_send_ok_help', false);
		display_element('email_send_fail_help', false);

		if (userid.length <= 0 && email.length <= 0){
			$("[name=userid]").addClass("uk-form-danger");
			$("[name=email]").addClass("uk-form-danger");
			display_element('nothing_help', true);
			check = false;
		}

		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (email.length > 0 && !filter.test(email)){
			$("[name=email]").addClass("uk-form-danger");
			display_element('email_help', true);
			check = false;
		}

		if (check == true){
			var commandJson = '{ "action": "UserForgetPassword", "security_code": "rdms123'
				+ '", "userid": "'+ userid
				+ '", "email": "' + email
				+ '" }';
			$.post("API/UserManagementAPI.php", {"postJson": commandJson} ,function(data){
				display_element('loading_div', false);

				var jsonObj = $.parseJSON(data);
				if (jsonObj.result == 'ok') {
					userid = jsonObj.userid;
					email = jsonObj.email;
					password = jsonObj.password;

					// 显示邮件已经发送的提示，并隐藏其它，防止重复发送。
					display_element('email_send_ok_help', true);
					display_element('InputContent', false);
				}
				else {
					if (jsonObj.error_reason == 'INVALID_USER') {
						$("[name=userid]").addClass("uk-form-danger");
						$("#userid_duplicate_help").html("The user name '" + userid + "'  has been registered.");
						display_element('userid_duplicate_help', true);
					}
					else if (jsonObj.error_reason == 'SEND_MAIL_FAIL') {
						display_element('email_send_fail_help', true);
					}
					else {
						showMessageDialog("Fail", jsonObj.error_message);
					}
				}
			});
		}
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
