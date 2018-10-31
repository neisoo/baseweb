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
		// ����������Ҫ���js��css�ļ�
		require("resources/config.php");
		require_once(LIBRARY_PATH . "/templateFunctions.php");

		requireJS($config);
		requireCSS($config);

		// ���������еı���
		echo '<title>'.$config['head']['title'].'</title>';

		// ����faviconͼ��
		echo '<link rel="icon" href="'.$config['head']['favorite_icon'].'" />';
	?>
</head>


<!--body-->
<body>
<!-- �����й�������Ĭ�����أ���Ҫʱ��ʾ -->
<div id="loading_div"></div>
<div id="container">
	<?php
		// ��ģ���е��붥�����Ͳ˵�
		importTopPanel();
		importMenu();
	?>

	<!-- ����������ajax��ͬ��ҳ���������滻���div������ -->
	<div id="MainContent"></div>

	<script type="text/javascript">
	$( document ).ready(function() {

		// ��ʼ�������й�����
		setLoadingDiv();

		<?php
			// ���Ự�Ƿ����Ѿ���¼����û�й��ڵ�״̬��
			if(isset($_SESSION['token']) && isset($_SESSION['userID']) && isset($_SESSION['permission']) && !isset($_SESSION['passwordExpired'])){
				// ���ݻỰ�е�permission��������ö�ӦȨ�޵Ĳ˵����ݡ�
				$jsToControlMenu = setMenuByPermission($config,$_SESSION['permission']);

				// ��֤�Ự�Ƿ���ȷ(token��ȷ)����ȷ����ʾĬ��ҳ�棬����ȷ�Ļ���ʾ��¼ҳ��
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
					// ���������ȷ�����Ѿ����ڣ���ִ�еǳ���
					unset($_SESSION['passwordExpired']);
					echo 'logout(false);';
				}
				else {
				    // ��ʾ��¼ҳ��
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

