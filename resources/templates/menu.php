<?php
//require("/../config.php");

//menu
echo '<div id="menu">
		<nav class="uk-navbar">
		<ul class="uk-navbar-nav">';
foreach ($config["menu"]["item"] as $value){
	if(isset($value["select"]) && $value["select"]){
		echo '<li class="uk-parent uk-active" data-uk-dropdown>';
	}else{
		echo '<li class="uk-parent" data-uk-dropdown>';
	}

	$menu_item_path = "";
	if(array_key_exists('url',$value) && $value['url'] != ""){
		$redirectFunction = 'return getOutput(\''.$value["url"].'\');';
		/*
		if(array_key_exists('permission',$value) && $value['permission'] != ""){
			$redirectFunction = 'return getOutput(\''.$value["url"].'\',\''.$value["permission"].'\');';
		}
		*/
		$menu_item_path .= '<a onclick="'.$redirectFunction.'" id="menuID_'.$value["name"].'">'.$value["name"];
	}
	else{
		$menu_item_path .= '<a id="menuID_'.$value["name"].'">'.$value["name"];
	}
	if(array_key_exists('subMenu',$value)){
		$menu_item_path .=' <i class="uk-icon-caret-down uk-icon-small"></i>';
	}
	$menu_item_path .= "</a>";
	echo $menu_item_path;

	if(array_key_exists('subMenu',$value)){
		echo '<div class="uk-dropdown uk-dropdown-navbar">
                <ul class="uk-nav uk-nav-navbar">';
		foreach($value["subMenu"] as $subValue){
			$redirectFunction = 'return getOutput(\''.$subValue["url"].'\');';
			/*
			if(array_key_exists('permission',$subValue) && $subValue['permission'] != ""){
				$redirectFunction = 'return getOutput(\''.$subValue["url"].'\',\''.$subValue["permission"].'\');';
			}
			*/
			echo '<li><a href="#" onclick="'.$redirectFunction.'" id="menuID_'.$subValue["name"].'">'.$subValue["name"].'</a></li>';
		}
		echo   '</ul>
			  </div>';
	}
	
	echo '</li>';
}
echo '</ul>
	  </nav>
	</div>';
?>