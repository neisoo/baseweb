<?php
	//设置session,必须处于脚本最顶部,用session保存生成的验证码的字符串，在表单提交时进行验证。
	session_start();

	$width = 200;
	$height = 60;

	//设置验证码图片大小的函数
	$image = imagecreatetruecolor($width, $height);

	//设置图形背景色颜色，并埴充整个图形
	$bgcolor = imagecolorallocate($image, 255, 255, 255);
	imagefill($image, 0, 0, $bgcolor);

	//生成随机数字的验证码并画入图片中
	$captcha_code = "";
	for ($i = 0; $i < 4; $i++) {
		//设置字体角度
		$fontangle = rand(-20, 20);
		//设置字体大小
		$fontsize = $height / 2;    
		//设置字体颜色，随机颜色
		$fontcolor = imagecolorallocate($image, rand(0, 120), rand(0, 120), rand(0, 120));      //0-120深颜色
		//设置数字
		$fontcontent = rand(0, 9);
		//连续定义变量
		$captcha_code .= $fontcontent;  
		//设置坐标
		$x = ($i * $width / 4) + rand($height / 8, $height / 4);
		$y = $height / 2 + rand(1, $height / 4);

		//imagestring($image, $fontsize, $x, $y, $fontcontent, $fontcolor);
		imagettftext($image, $fontsize, $fontangle, $x, $y, $fontcolor, 'captchaFont.ttf', $fontcontent);
	}

	//验证码字串存到session
	$_SESSION['captcha_authcode'] = $captcha_code;

	//增加图片中的干扰元素，设置雪花点
	for($i = 0; $i < 200; $i++){
		//设置点的颜色，50-200颜色比数字浅，不干扰阅读
		$pointcolor = imagecolorallocate($image,rand(50, 200), rand(50, 200), rand(50, 200));    
		//imagesetpixel — 画一个单一像素
		imagesetpixel($image, rand(1, $width - 1), rand(1, $height - 1), $pointcolor);
	}

	//增加干扰元素，设置横线
	for($i = 0; $i < 4; $i++){
		//设置线的颜色
		$linecolor = imagecolorallocate($image, rand(80,220), rand(80,220), rand(80,220));
		//设置线，两点一线
		imageline($image,rand(1, $width - 1), rand(1, $height - 1), rand(1, $width - 1), rand(1, $height - 1),$linecolor);
	}

	//设置头部，image/png
	header('Content-Type: image/png');
	//imagepng() 建立png图形函数
	imagepng($image);
	//imagedestroy() 结束图形函数 销毁$image
	imagedestroy($image);
?>