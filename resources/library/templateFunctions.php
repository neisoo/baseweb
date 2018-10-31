<?php
    //require_once("/../config.php");

	// 读取配置中的js文件
	function requireJS($config){
		//require default.js and plugins
		foreach($config["library"] as $library => $value){
			if(substr($value, -2) == "js"){
				echo '<script src="'.LIBRARY_PATH.'/'.$value.'"></script>';
			}
		}

		//require customLibrary.js
		foreach($config["custom_library"] as $custom_library => $value){
			if(substr($value, -2) == "js"){
				echo '<script src="'.CUSTOM_LIBRARY_PATH.'/'.$value.'"></script>';
			}
		}
	}

	// 读取配置中的css文件
	function requireCSS($config){
		//require default.css and plugins		
		foreach($config["library"] as $library => $value){
			if(substr($value, -3) == "css"){
				echo '<link rel="stylesheet" type="text/css" href="'.LIBRARY_PATH.'/'.$value.'" />';
			}
		}

		//require customLibrary.css
		foreach($config["custom_library"] as $custom_library => $value){
			if(substr($value, -3) == "css"){
				echo '<link rel="stylesheet" type="text/css" href="'.CUSTOM_LIBRARY_PATH.'/'.$value.'" />';
			}
		}		
	}

	// 导入顶部标题条
	function importTopPanel()
	{
		global $config;
		require_once(TEMPLATES_PATH . "/top_panel.php");
	}

	// 顶部菜单
	function importMenu(){
		global $config;
		require_once(TEMPLATES_PATH . "/menu.php");
	}
	
	function setCSS($style){
		$css = "";
		foreach($style as $tag => $value){
			$css = $css.$tag.":".$value.";";
		}
		return $css;
	}
	
	function setMenuByPermission($config,$permission){
		$jsToControlMenu = array();
		//menu
		foreach($config["menu"]["item"] as $value){
			if(array_key_exists('permission',$value) && $value['permission'] != ""){
				if(strpos($value["permission"],"||")){
					$existOnePermission = checkOrPermission($value["permission"],$permission);
					if($existOnePermission == false){
						$jsToControlMenu[] = array("name"=>$value['name'],"bool"=>false);
					}
					else{
						$jsToControlMenu[] = array("name"=>$value['name'],"bool"=>true);
					}
				}
				else if(strpos($value["permission"],"&&")){					
					$existAllPermission = checkAndPermission($subValue["permission"],$permission);
					if($existAllPermission == false){
						$jsToControlMenu[] = array("name"=>$value['name'],"bool"=>false);
					}
					else{
						$jsToControlMenu[] = array("name"=>$value['name'],"bool"=>true);
					}
				}
				else{
					if(!in_array($value['permission'],$permission)){
						$jsToControlMenu[] = array("name"=>$value['name'],"bool"=>false);
					}
					else{
						$jsToControlMenu[] = array("name"=>$value['name'],"bool"=>true);
					}
				}
			}
			
			//submenu
			if(array_key_exists('subMenu',$value)){
				foreach($value["subMenu"] as $subValue){
					if(array_key_exists('permission',$subValue) && $subValue['permission'] != ""){
						if(strpos($subValue["permission"],"||")){
							$existOnePermission = checkOrPermission($subValue["permission"],$permission);
							if($existOnePermission == false){
								$jsToControlMenu[] = array("name"=>$subValue['name'],"bool"=>false);
							}
							else{
								$jsToControlMenu[] = array("name"=>$subValue['name'],"bool"=>true);
							}
						}
						else if(strpos($subValue["permission"],"&&")){
							$existAllPermission = checkAndPermission($subValue["permission"],$permission);
							if($existAllPermission == false){
								$jsToControlMenu[] = array("name"=>$subValue['name'],"bool"=>false);
							}
							else{
								$jsToControlMenu[] = array("name"=>$subValue['name'],"bool"=>true);
							}
						}
						else{
							if(!in_array($subValue['permission'],$permission)){
								$jsToControlMenu[] = array("name"=>$subValue['name'],"bool"=>false);
							}
							else{
								$jsToControlMenu[] = array("name"=>$subValue['name'],"bool"=>true);
							}
						}
					}
				}
			}
		}
		
		return json_encode($jsToControlMenu);
	}
	
	function checkOrPermission($configPermission,$permission){
		$array = explode("||",$configPermission);
		$existOnePermission = false;
		foreach($array as $explodePermission){
			if(strpos($explodePermission,"&&")){
				$existAllPermission = checkAndPermission($explodePermission,$permission);
				if($existAllPermission == true){
					$existOnePermission = $existAllPermission;
					break;
				}
			}
			if(in_array($explodePermission,$permission)){
				$existOnePermission = true;
				break;
			}
		}
		return $existOnePermission;
	}

	function checkAndPermission($configPermission,$permission){
		$array = explode("&&",$configPermission);
		$existAllPermission = true;
		foreach($array as $explodePermission){
			if(!in_array($explodePermission,$permission)){
				$existAllPermission = false;
			}
		}
		return $existAllPermission;
	}
	
	function sqlEncode($str){
		$str=str_replace("\\","\\\\",$str);
		$str=str_replace("'","\'",$str);
		$str=str_replace('"','\"',$str);
		return $str;
	}
	// Larry 2013-02-20 (V2_3_0) - START
	function sqlDecode($str){
		$str=str_replace("\\\\","\\",$str);
		$str=str_replace("\'","'",$str);
		$str=str_replace('\"','"',$str);
		return $str;
	}
?>