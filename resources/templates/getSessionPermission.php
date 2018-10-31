<?php
 session_start();
 
 /*
 $permission = $_POST['permission'];
 
 if(isset($_SESSION['token']) && isset($_SESSION['permission'])){
	if(!in_array($permission,$_SESSION['permission'])){
		//haven't permission
		echo 'Have no permission';
	}
	else{
		echo 'Have permission';
	}
 }
 else{
	//haven't login
	echo 'Have no Login';
 } 
 */
 
 echo json_encode($_SESSION['permission']);
 ?>