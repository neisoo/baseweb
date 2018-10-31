<?php

$config = array(
    // ��¼���ã�
    // login_path ��¼�ɹ���Ҫ��ʾ��ҳ�档
    // path ����δ��¼ʱ��Ҫ��ʾ�ĵ�¼ҳ��
    // showHead ��¼ҳ���Ƿ���ʾҳͷ
    // showMenu ��¼ҳ���Ƿ���ʾ�˵�
    "index" => array(
        "path" => "accessControl/login.php",
		"login_path" => "booksList/booksList.php",
		"showHead" => "false",
		"showMenu" => "false"
    ),
    // ҳͷ���ã�
    // title �������ʾ�ı���
    // top_panel ������ҳ���������һ�У�����ʾ�ı���
    // top_panel_icon �����������ʾ��logoͼ��
    "head" => array(
		"title" => "RDMS",
		"favorite_icon" => "public_html/img/layout/favicon.ico",
		"top_panel" => array(
			"title" => array(
				"text" => "Remote Device Management System"
			)
		),
		"top_panel_icon" => array(
			"src" => "public_html/img/layout/icon.png",
			"alt" => "Fail path",
			"style" => array(
				"height" => "35px"
			)
		)
	),
	// �˵����ã�
	"menu" => array(
		"item" => array(
			array(
				"name" => "Device",
				"url" => "deviceManagement/DevicesUserSelect.php",
				"select" => true
			),
			array(
				"name" => "Apps",
				"url" => "appsManagement/AppsManagement.php",
                "permission"=>"RDMS_APP_EDIT"
			),
			array(
				"name" => "Firmware",
				"url" => "firmwareManagement/FirmwareManagement.php",
                "permission"=>"RDMS_FIRMWARE_EDIT"
			),
			array(
				"name" => "Account Management",
				"url" => "userManagement/UserManagement.php",
				"permission"=>"RDMS_USER_EDIT"
			),
			array(
				"name" => "System Setting",
				"url" => "systemSetting/SystemSetting.php",
                "permission"=>"RDMS_SETTING_EDIT"
			),
			array(
				"name" => "User",
				"url" => "",
				"subMenu" => array(
					array(
						"name" => "Change Password",
						"url" => "userManagement/resetPassword.php"
					),
					array(
							"name" => "Login History",
							"url" => "userManagement/loginHistory.php"
					),
				)
			)
		)
    ),

    // ҳ����Ҫ���ص�JS�ļ�
	"library" => array(
		//"jquery/jquery-1.7.1.js",
		"jquery/jquery-2.1.1.js",

        "jquery/jquery.jqGrid.js", // jqGrid��ʹ�����е����ͱ��TreeGrid
        "jquery/grid.locale-en.js", // jqGrid�ı��ػ�
        "jquery/css/ui.jqgrid.css", // jqGrid��css
        "jquery/jquery.base64.js", // base64�����
        "jquery/jquery.ba-resize.js", // ���resize�������ε����⡣
        "jquery/jquery.md5.js", // md5����
        "uploadifive-v1.1.2/jquery.uploadifive.min.js", // ���ļ��ϴ���
        "uploadifive-v1.1.2/uploadifive.css",
		//"jquery/jquery.menu.js",
		//"jquery/jquery.ui.effect.js",
		//"jquery/jquery.ui.effect-blind.js",
        "uikit-2.22.0/js/uikit.min.js",
        "uikit-2.22.0/js/components/sticky.min.js", // ����
        "uikit-2.22.0/js/components/upload.min.js", // �ϴ�
        "uikit-2.22.0/js/components/pagination.min.js", // ��̬��ҳ
        "uikit-2.22.0/js/components/autocomplete.min.js", // �Զ����
        "uikit-2.22.0/js/components/form-password.min.js", // �����
        "uikit-2.22.0/css/uikit.gradient.min.css",
        "uikit-2.22.0/css/components/sticky.gradient.min.css",
        "uikit-2.22.0/css/components/upload.gradient.min.css",
        "uikit-2.22.0/css/components/form-file.gradient.min.css",
        "uikit-2.22.0/css/components/progress.gradient.min.css",
        "uikit-2.22.0/css/components/autocomplete.gradient.css",
        "uikit-2.22.0/css/components/form-password.gradient.min.css",
		"accessControl/SDM/Views/GridView/view.js",
		"default.js",
		"default.css",
        "jquery/development-bundle/ui/jquery.ui.core.js",
		"jquery/development-bundle/ui/jquery.ui.datepicker.js",
		"jquery/development-bundle/ui/jquery.ui.widget.js",
		"jquery/development-bundle/ui/jquery.ui.dialog.js",
		"jquery/development-bundle/ui/jquery.ui.button.js",
        "jquery/development-bundle/ui/jquery.ui.position.js",
        "jquery/development-bundle/ui/jquery.ui.mouse.js",
        "jquery/development-bundle/ui/jquery.ui.draggable.js",
        "jquery/development-bundle/ui/jquery.ui.resizable.js",
        "jquery/development-bundle/ui/jquery.ui.effect.js",
        //"jquery/css/black-tie/jquery-ui-1.10.4.custom.css",
        "jquery/css/base/jquery-ui-1.10.4.custom.css",

		"datetimepicker/jquery.datetimepicker.js",
		"datetimepicker/jquery.datetimepicker.css",
		"remotecontrol/canvasquery.js",
		"remotecontrol/playground.js",

	),
	"custom_library" => array(
	),
	// ��վ�����ӵ��û��ĸ��û�
	"parent_id" => 'SystemAdmin',

	// ��¼ʧ�ܼ��κ���ʾͼ����֤��
	"show_captcha_when_login_fail_count" => 3,

	// ��վ��,���ڷ������������ʼ�ʱ����վ����
	"site_name" => 'RDMS',

	// ��վ����ַ��
	"site_url_root" => 'http://192.168.5.122/photobook/',
);

 date_default_timezone_set('Hongkong');

 //access control setting
 $protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https')  === FALSE ? 'http' : 'https';
 $host     = "localhost";
 $script   = $_SERVER['SCRIPT_NAME'];
 $params   = $_SERVER['QUERY_STRING'];

 $folderLocation = "photobook/"; // ��վ�ĸ�Ŀ¼
 // $folderLocation = "patrick/RDMS/demo_1_2_2/";

// �û�����ģ���api�ӿڣ������û�����ӣ����ã���֤���û��飬Ȩ�޵ȡ�
$apiURL = $protocol . '://' . $host ."/".$folderLocation."resources/library/accessControl/SDM/Modules/AccessControl/api.php" ;

$server_ip   = "127.0.0.1";
$server_port = 443;


define("LIBRARY_PATH", 'resources/library');

// ģ��ҳ��·��������������˵��������������Ŀ¼�·����û��Զ���
define("TEMPLATES_PATH", 'resources/templates');

define("CUSTOM_LIBRARY_PATH", 'public_html/library');
?>