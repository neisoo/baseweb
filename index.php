<?php
SESSION_START();
ini_set("display_errors", 1);
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
		require("resources/config.php");
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
	<div id="MainContent"></div>

	<script type="text/javascript">
	$( document ).ready(function() {

		// 初始化加载中滚动条
		setLoadingDiv();

		<?php
			// 检查会话是否是已经登录后且没有过期的状态。
			if(isset($_SESSION['token']) && isset($_SESSION['userID']) && isset($_SESSION['permission']) && !isset($_SESSION['passwordExpired'])){
				// 根据会话中的permission变量，获得对应权限的菜单内容。
				$jsToControlMenu = setMenuByPermission($config,$_SESSION['permission']);

				// 验证会话是否正确(token正确)，正确后显示默认页面，不正确的话显示登录页面
				echo '$.post("resources/templates/verifyLogin.php",function(data) {
						if(data == "ISLOGIN"){
							login_init(\''.$jsToControlMenu.'\',"'.$config['index']['login_path'].'","'.$_SESSION['userID'].'");
							display_element("top_panel",true);
							display_element("menu",false);
						}
						else {
							getOutput("'.$config["index"]["path"].'",false);
							display_element("top_panel",'.$config["index"]["showHead"].');
							display_element("menu",'.$config["index"]["showMenu"].');
							display_element("loginName",false);
							display_element("logout",false);
						}
					});';
			}
			else {
				if(isset($_SESSION['passwordExpired'])) {
					// 如果密码正确但是已经过期，则执行登出。
					unset($_SESSION['passwordExpired']);
					echo 'logout(false);';
				}
				else {
				    // 显示登录页面
					echo "getOutput('".$config["index"]["path"]."',false);";
					echo 'display_element("top_panel",'.$config["index"]["showHead"].');';
					echo 'display_element("menu",'.$config["index"]["showMenu"].');';
				}
			}

			echo '
				$("#menu .uk-parent").on("click", function(){
					$("#menu .uk-parent").each(function(){
						$(this).removeClass("uk-active");
					})
					$(this).addClass("uk-active");
				});';
		?>
	});
	</script>
</div>
</body>
</html>

