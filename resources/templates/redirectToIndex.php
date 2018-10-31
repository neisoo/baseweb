<?php
SESSION_START();
$configPath = realpath(dirname(__FILE__) . "/../config.php");
require $configPath;

$indexPath = $protocol . '://' . $host ."/".$folderLocation."/index.php";
header( 'Location: '.$indexPath );
?>
The page does not exist.<br/>
<a href="<?php echo $indexPath;?>">Please click here to go to index</a>