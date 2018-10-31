// JavaScript Document
$(document).ready(function(){
	// 设置验证码图片与其它控件等高。
	var height = $("[name=captcha]").outerHeight(true);
	$("#captcha_img").height(height);
});

function login(){
	display_element('loading_div',true);
	var name = document.getElementById("name").value;
	var pw = MD5(document.getElementById("password").value);
	var captcha = document.getElementById("captcha").value;

	$("#name").removeClass("uk-form-danger");
	$("#password").removeClass("uk-form-danger");
	$("#captcha").removeClass("uk-form-danger");
	display_element('login_fail_help', false);
	display_element('captcha_fail_help', false);
	display_element('attempt_fail_help', false);

	//check password expired
	var commandJson = '{"action": "CheckPasswordExpired", "security_code": "rdms123", "userid": "'+name+'"}';
	$.ajax({
		type: "POST",
		url: 'API/UserManagementAPI.php',
		data: { postJson: commandJson },
		success: function(response) {
			var json = $.parseJSON(response);
			if (json.result == "ok") {
				if(json.value != "pass" && json.value != "alert period" && json.value != "grace period"){
					//json.value == "over period"
//					alert("Password expired.");
					showMessageDialog("Fail", "Password expired.");

					display_element('loading_div',false);
				}
				else {
					//login process
					$.post("public_html/accessControl/loginProcess.php","name=" + name + "&pw=" + pw + "&captcha=" + captcha, function(data) {
						display_element('loading_div', false);
						var resultJson = $.parseJSON(data);

						if (resultJson.result == "captcha") {
							// 图形验证失败
							$("#captcha").addClass("uk-form-danger");
							display_element('captcha_fail_help', true);
						}
						else if (resultJson.result == "attempt") {
							// 账号被锁定
							$("#attempt_fail_help").html("Login failed. Account is locked. You will not be able to sign in until " + resultJson.resumeTime);
							display_element('attempt_fail_help', true);
					    }
						else if (resultJson.result == "fail"){
							// 用户名或密码错
							$("#name").addClass("uk-form-danger");
							$("#password").addClass("uk-form-danger");
							display_element('login_fail_help', true);

							// 登录超过三次失败后要示输入验证码。
							var loginFailCount = resultJson.login_fail_count;
							if (loginFailCount > 3) {
								display_element('captcha_div', true);
							}
						}
						else {
							// 登录成功
							var redirectPage = resultJson.path;
							//save user permission to session
							$.post("resources/templates/savePermissionToSession.php","name="+name,function(data){
								if(data != "Unhandle response"){
									//control visible of menu item
									var menu_js_array = JSON.parse(data);

									for (var i = 0; i < menu_js_array.length; i++) {
										display_menu("menuID_"+menu_js_array[i]["name"],menu_js_array[i]["bool"]);
									}
									document.getElementById("loginName").innerHTML = "Hi, "+name;
									
									if(json.value == "pass"){
										//login interface
										display_element("top_panel",true);
										display_element("loginName",true);
										display_element("logout",true);
										display_element("menu",true);

										display_element("top_panel",true);
										display_element("menu",false);

										getOutput(redirectPage,false);
									}
									else if(json.value == "alert period"){
										getOutput('userManagement/PasswordChangeAlert.php?state='+json.value+'&redirect='+redirectPage,false);
									}
									else if(json.value == "grace period"){
										getOutput('userManagement/PasswordChangeAlert.php?state='+json.value+'&redirect='+redirectPage,false);
									}
								}
								else{
									showMessageDialog("Fail", "Login failed.");

//									alert("Login fail~~");
									logout(false);
								}
								display_element('loading_div',false);
							});
						}						
					});
				}
			} else {	
				showMessageDialog("Fail", "Login failed.");

//				alert("Login fail~~");			
				display_element('loading_div',false);
			}
			
		}
	});
}

function showMessageDialog(title, text){
	$("#dialog_msg_text").text(text);
	$("#dialog_msg").dialog({
		modal: true,
		title: title,
		width: 400,
		position: 'middle',
		closeOnEscape: false,
		buttons: [{ text: "Ok", click: function(){
			 $(this).dialog( "close" );
			}
		}]
	});
}