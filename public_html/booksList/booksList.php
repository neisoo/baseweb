<?php
ini_set('display_errors', 1);
session_start();
include_once "../../resources/library/accessControl/SDM/Utils/DBHandler/model.php";
include_once "../../auditlog/AuditLog.php";

auditLog($_SESSION['token'], "PageRedirect", basename($_SERVER['PHP_SELF']), "Success");

// 读取列表数据
$json_string = file_get_contents('./booksList.json');
$data = json_decode($json_string, true);
$num = count($data); 
?>

<div id="head_padding">
</div>

<ul id="book_list" class="uk-grid uk-grid-width-1-4 uk-grid-width-medium-1-6 uk-grid-width-large-1-10 uk-text-center" data-uk-grid-margin>

<?php
for($i=0;$i<$num;++$i){ 
	echo '<li class="uk-grid-margin" >';
	echo '<div>';
	echo '<a id="book_' . $data[$i]['id'] . '" onclick="onClickBook(' . $data[$i]['id'] . ')">';
	echo '<img src="public_html/bookplayer/' . $data[$i]['icon'] . '" alt="' . $data[$i]['icontext'] . '">';
	echo '<div class="uk-thumbnail-caption">' . $data[$i]['icontext'] . '</div>';
	echo '</a>';
	echo '</div>';
	echo '</li>';
}
?>
</ul>
