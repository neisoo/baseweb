<?php

$config = array(
    // 登录设置：
    // login_path 登录成功后要显示的页面。
    // path 设置未登录时，要显示的登录页面
    // showHead 登录页面是否显示页头
    // showMenu 登录页面是否显示菜单
    "index" => array(
        "path" => "accessControl/login.php",
		"login_path" => "booksList/booksList.php",
		"showHead" => "false",
		"showMenu" => "false"
    ),
    // 页头设置：
    // title 浏览器显示的标题
    // top_panel 顶栏（页面最上面的一行）中显示的标题
    // top_panel_icon 顶栏中左边显示的logo图标
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
	// 菜单设置：
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

    // 页面需要加载的JS文件
	"library" => array(
		//"jquery/jquery-1.7.1.js",
		"jquery/jquery-2.1.1.js",

        "jquery/jquery.jqGrid.js", // jqGrid，使用其中的树型表格TreeGrid
        "jquery/grid.locale-en.js", // jqGrid的本地化
        "jquery/css/ui.jqgrid.css", // jqGrid的css
        "jquery/jquery.base64.js", // base64编解码
        "jquery/jquery.ba-resize.js", // 解决resize触发两次的问题。
        "jquery/jquery.md5.js", // md5编码
        "uploadifive-v1.1.2/jquery.uploadifive.min.js", // 多文件上传。
        "uploadifive-v1.1.2/uploadifive.css",
		//"jquery/jquery.menu.js",
		//"jquery/jquery.ui.effect.js",
		//"jquery/jquery.ui.effect-blind.js",
        "uikit-2.22.0/js/uikit.min.js",
        "uikit-2.22.0/js/components/sticky.min.js", // 附着
        "uikit-2.22.0/js/components/upload.min.js", // 上传
        "uikit-2.22.0/js/components/pagination.min.js", // 动态分页
        "uikit-2.22.0/js/components/autocomplete.min.js", // 自动完成
        "uikit-2.22.0/js/components/form-password.min.js", // 密码表单
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
	// 网站新增加的用户的父用户
	"parent_id" => 'SystemAdmin',

	// 登录失败几次后显示图形验证码
	"show_captcha_when_login_fail_count" => 3,

	// 网站名,用于发送密码重置邮件时的网站名。
	"site_name" => 'RDMS',

	// 网站根地址。
	"site_url_root" => 'http://192.168.5.122/photobook/',
);

 date_default_timezone_set('Hongkong');

 //access control setting
 $protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']),'https')  === FALSE ? 'http' : 'https';
 $host     = "localhost";
 $script   = $_SERVER['SCRIPT_NAME'];
 $params   = $_SERVER['QUERY_STRING'];

 $folderLocation = "photobook/"; // 网站的根目录
 // $folderLocation = "patrick/RDMS/demo_1_2_2/";

// 用户管理模块的api接口，例如用户的添加，禁用，验证，用户组，权限等。
$apiURL = $protocol . '://' . $host ."/".$folderLocation."resources/library/accessControl/SDM/Modules/AccessControl/api.php" ;

$server_ip   = "127.0.0.1";
$server_port = 443;


define("LIBRARY_PATH", 'resources/library');

// 模板页面路径，如标题栏、菜单栏，都放在这个目录下方便用户自定义
define("TEMPLATES_PATH", 'resources/templates');

define("CUSTOM_LIBRARY_PATH", 'public_html/library');
?>