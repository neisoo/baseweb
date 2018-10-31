<?php
//require("../config.php");

//top_panel
echo '<div id="top_panel" class="uk-width-1-1">';
echo '<nav class="uk-navbar">';
echo '<div class="uk-float-left">
	  </div>';
echo '  <div class="uk-navbar-flip">
			<div class="uk-navbar-content" id="loginName">';
if(isset($_SESSION["token"])){
	echo 'Hi, '.$_SESSION["token"];
}
echo '		</div>
			<div class="uk-navbar-content">
				<button href="#" class="uk-button-danger" id="logout" onclick="logout('.$config['index']['showHead'].');">Logout</button>
			</div>
			
		</div>';
echo '</nav>';
echo '</div>';
?>