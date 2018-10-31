///////////////////////////////////////////////////////
function getOutputExt(id, url, checkLogin)
{
    checkLogin = typeof checkLogin !== 'undefined' ? checkLogin : true;

    // add timestamp to login.html
    if (url.indexOf("login.html") != -1) {
        var d = new Date();
        url += "?time=" + d.getTime();
    }

    if (checkLogin == true) {
        $.post("resources/templates/verifyLogin.php", function(data) {
            if (data == "ISLOGIN") {
                redirectExt(id, url);
            }
            else {
                alert("Session timeout.\r\nPlease login again.");
                logout(false);
                return false;
            }
        });
    }
    else {
        redirectExt(id, url);
    }
    return true;
}

function redirectExt(id, url)
{
    var params = "";
    var ret = false;

    if (url.indexOf("?") != -1) {
        params = url.substr(url.indexOf("?") + 1);
        url = url.substr(0, url.indexOf("?"));
    }

    $.ajax({
        type: "POST",
        url: 'public_html/' + url,
        data: params,
        success: function(response) {
            drawOutputExt(id, url, response);
            ret = true;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            getOutputExt(id, '../resources/templates/404page.php');
        },
        cache: false,
        async: false
        });

    return ret;
}

// handles the response, adds the html
function drawOutputExt(id, url, responseText) {
    var folder = "";
    var file = "";
    var fullPath = "";

    var noCharOfExtention = -1;
    var extention = "";
    var e = $('#' + id);

    extention = url.substring(url.lastIndexOf("."));

    if (url.indexOf("/") == 0) {
        url = url.substring(1, url.length);
    }

    if (extention == ".html" || extention == ".php" || extention == ".htm") {
        noCharOfExtention = extention.length;

        folder = url.substring(0,url.lastIndexOf("/"));

        if (url.lastIndexOf("/") != -1) {
            folder += "/";
            file = url.substring(url.lastIndexOf("/") + 1, url.length - noCharOfExtention);
        }
        else {
            file = url.substr(0, url.length-noCharOfExtention);
        }

        e.html("");

        // Load css
        fullPath = 'public_html/' + folder + 'css/' + file + '.css';
        $('<link/>',
        {
            rel : 'stylesheet',
            type : 'text/css',
            href : fullPath
        }
        ).appendTo(e);

        // Output html.
        e.append(responseText);

        // Load js.
        fullPath = 'public_html/' + folder + 'js/' + file + '.js';
        $.ajax({
            url:fullPath,
            type:'HEAD',
            error: function() {
                //file not exists
            },
            success: function() {
                //file exists
                $.getScript(fullPath);
            },
            async: false
        });

    }
    else {
        // Output page only.
        e.html(responseText);
    }
}
///////////////////////////////////////////////////////
var loadingUrl = "";

// handles the click event for link 1, sends the query
function getOutput(url,checkLogin) {
  checkLogin = typeof checkLogin !== 'undefined' ? checkLogin : true;

  //add timestamp to login.html
  if(url.indexOf("login.html") != -1){
    var d= new Date();
	url += "?time=" + d.getTime();
	//alert(d.getTime());
  }

  if(checkLogin == true){
	$.post("resources/templates/verifyLogin.php",function(data){
	 if(data == "ISLOGIN"){
		redirect(url);
		return true;
	 }else{
		alert("Session timeout.\r\nPlease login again.");
		logout(false);
		return false;
	 }
	});
  }
  else{
    redirect(url);
	return true;
  }
}

function redirect(url){
  loadingUrl = url;
  var params="";

  if(url.indexOf("?") != -1){
	params = url.substr(url.indexOf("?")+1);
	url = url.substr(0,url.indexOf("?"));
	loadingUrl = url;
  }

  getRequest(
	'public_html/'+url, // URL for the PHP file
	drawOutput,  // handle successful request
	drawError,    // handle error
	params
  );

  return false;
}

// handles drawing an error message
function drawError () {
    //var container = document.getElementById('MainContent');
    //container.innerHTML = 'Bummer: there was an error!';
	getOutput('../resources/templates/404page.php');
}
// handles the response, adds the html
function drawOutput(responseText) {
    //var container = document.getElementById('MainContent');
    //container.innerHTML = responseText;

	/*
	//handle to run javascript of redirect page
	var javascriptString = "";

	responseText = responseText.replace(new RegExp("<script>",'g'),"<script type=\"text/javascript\">");
	var	javascriptArray = responseText.split("<script type=\"text/javascript\">");
	for (var index = 1; index < javascriptArray.length; index++) {
		if(javascriptArray[index].contains("</script>")){
			javascriptString += javascriptArray[index].substr(0,javascriptArray[index].indexOf("</script>"));
		}
	}

	//alert(javascriptString);
    eval(javascriptString);
	*/


//    loadingUrl = "abc/abc/abc.html";
//    js = js/abc.js

    var folder = "";
    var file = "";
    var fullPath = "";

    var noCharOfExtention = -1;
    var extention = "";

    extention = loadingUrl.substring(loadingUrl.lastIndexOf("."));

    if (loadingUrl.indexOf("/") == 0) {
        loadingUrl = loadingUrl.substring(1, loadingUrl.length);
    }

    if (extention == ".html" || extention == ".php" || extention == ".htm") {
        noCharOfExtention = extention.length;

        folder = loadingUrl.substring(0,loadingUrl.lastIndexOf("/"));

        if (loadingUrl.lastIndexOf("/") != -1) {
            folder += "/";
            file = loadingUrl.substring(loadingUrl.lastIndexOf("/") + 1, loadingUrl.length - noCharOfExtention);
        }
        else {
            file = loadingUrl.substr(0, loadingUrl.length-noCharOfExtention);
        }

        $('#MainContent').html("");

        // Load css
        fullPath = 'public_html/' + folder + 'css/' + file + '.css';
        $('<link/>',
        {
            rel : 'stylesheet',
            type : 'text/css',
            href : fullPath
        }
        ).appendTo('#MainContent');

        // Output html.
        $('#MainContent').append(responseText);

        // Load js.
        fullPath = 'public_html/'+folder+'js/' + file + '.js';
        $.ajax({
            url:fullPath,
            type:'HEAD',
            error: function()
            {
                //file not exists
            },
            success: function()
            {
                //file exists
                $.getScript(fullPath);
            },
            async: false
        });

    }
    else{
        // Output page only.
        $('#MainContent').html(responseText);
    }
}

// helper function for cross-browser request object
function getRequest(url, success, error, params) {
	params = typeof params !== 'undefined' ? params : "";
    var req = false;
    /*try{
        // most browsers
        req = new XMLHttpRequest();
    } catch (e){
        // IE
        try{
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            // try an older version
            try{
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e){
                return false;
            }
        }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
        if(req .readyState == 4){
            return req.status === 200 ?
                success(req.responseText) : error(req.status)
            ;
        }
    }
	/*
    //req.open("GET", url, true);
    //req.send(null);
	alert(url);
	req.open("POST", url, false);

	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//req.setRequestHeader("Content-length", params.length);
	//req.setRequestHeader("Connection", "close");

	req.send(params);
	*/

	$.ajax({
		   type: "POST",
		   url: url,
		   data: params,
		   success: function(response) {
			 success(response);
		   },
		   error: function(XMLHttpRequest, textStatus, errorThrown){
			error();
		   },
		   cache: false,
		   async: false
		});
    return req;
}

/*
function post(page,permission){
	var outputPath = page;
	for (var i = 2; i < arguments.length; i++) {
		if(i<=2){
			outputPath += "?";
		}
		else{
			outputPath += "&";
		}
		outputPath += arguments[i] +"="+ document.getElementById(arguments[i]).value;
	}

	getOutput(outputPath,permission);
}
*/

function submitForm(processPage,receivePage,formID){
	loadingUrl = processPage;
	display_element('loading_div',true);
	/*
	if(permission != '' && permission != null){
	  $.post("resources/templates/verifyPermissionProcess.php",'permission='+permission,function(data){
		if(data == "User don't have all the input permission" || data == "Unhandle response"){
			getOutput("../resources/templates/NoPermissionPage.html");
			return false;
		}
		else{
			$.ajax({
			   type: "POST",
			   url: 'public_html/'+processPage,
			   data: $("#"+formID).serialize(),
			   success: function(response) {
				 if(receivePage != '' && receivePage != null){
					loadingUrl = receivePage;
					var params="";
					if(receivePage.indexOf("?") != -1){
						params = receivePage.substr(url.indexOf("?")+1) + "&";
						receivePage = receivePage.substr(0,url.indexOf("?"));
						loadingUrl = receivePage;
					}
					getRequest(
						'public_html/'+receivePage, // URL for the PHP file
						drawOutput,  // handle successful request
						drawError,    // handle error
						params + "response="+response
					);
				 }
				 else{
					drawOutput(response);
				 }
			   }
			});
		}
	  });
	}
	*/
		$.ajax({
		   type: "POST",
		   url: 'public_html/'+processPage,
		   data: $("#"+formID).serialize(),
		   success: function(response) {
			 if(receivePage != '' && receivePage != null){
				loadingUrl = receivePage;
				var params="";
				if(receivePage.indexOf("?") != -1){
					params = receivePage.substr(url.indexOf("?")+1) + "&";
					receivePage = receivePage.substr(0,url.indexOf("?"));
					loadingUrl = receivePage;
				}
				getRequest(
					'public_html/'+receivePage, // URL for the PHP file
					drawOutput,  // handle successful request
					drawError,    // handle error
					params + "response="+response
				);
			 }
			 else{
				drawOutput(response);
			 }
			 display_element('loading_div',false);
		   },
		   error: function(XMLHttpRequest, textStatus, errorThrown){
			display_element('loading_div',false);
			alert('Fail to post the form.');
		   }
		});

}

function display_element(id,display){
	display = typeof display !== 'undefined' ? display : true;
	if(display==true){
		document.getElementById(id).style.display = 'inline';
	}
	else if(display==false){
	//display==false
		document.getElementById(id).style.display = 'none';
	}
}

/*
function display_element_by_permission(id,permission){
	$.post("resources/templates/checkSessionPermission.php",'permission='+permission,function(data){
		if(data == "Have no permission" || data == "Have no Login"){
			document.getElementById(id).style.display = 'none';
		}
		else{
			//data == "Have permission"
			document.getElementById(id).style.display = 'inline';
		}
	});
}
*/

function display_menu(id,display){
	display = typeof display !== 'undefined' ? display : true;
	if(display==true){
		document.getElementById(id).style.display = 'block';
	}
	else if(display==false){
	//display==false
		document.getElementById(id).style.display = 'none';
	}
}

function login_init(jsToControlMenu,redirectPage,name) {
	var menu_js_array = JSON.parse(jsToControlMenu);

	for (var i = 0; i < menu_js_array.length; i++) {
		display_menu("menuID_"+menu_js_array[i]["name"],menu_js_array[i]["bool"]);
	}

	document.getElementById("loginName").innerHTML = "Hi, "+name;
	display_element("top_panel",true);
	display_element("loginName",true);
	display_element("logout",true);
	display_element("menu",true);
	getOutput(redirectPage);
}

function logout(showTopPanel){
	display_element('loading_div',true);
	$.post("public_html/accessControl/logoutProcess.php",function(data){
		if(data != "fail"){
		  /*
		  if(!showTopPanel){
			display_element("top_panel",false);
		  }
		  else{
			display_element("top_panel",true);
		  }
		  display_element("loginName",false);
		  display_element("logout",false);
		  display_element("menu",false);
		  getOutput(data,false);
		  */
		  window.location.href = 'index.php';
		}
		else{
			alert("Logout fail~~");
			display_element('loading_div',false);
		}
	});
}

function checkPermission(callBackFunction){
	  //show div
	  display_element('loading_div',true);

	  $.post("resources/templates/getSessionPermission.php",function(data){
		callBackFunction(data);
		//close div
		 display_element('loading_div',false);
	  });
}

function checkVerifyLogin(callBackFunction){
	$.post("resources/templates/verifyLogin.php",function(data){
	 if(data == "ISLOGIN"){
		callBackFunction(data);
		return true;
	 }else{
		alert("Session timeout.\r\nPlease login again.");
		logout(false);
		return false;
	 }
	});

}

function setLoadingDiv(){
	var loadingLayer = document.getElementById('loading_div');
	loadingLayer.style.height = "100%";
	loadingLayer.style.width = '100%';
	loadingLayer.style.left = '0px';
	loadingLayer.style.top = '0px';
	loadingLayer.style.position = 'fixed';
	loadingLayer.style.zIndex = 999;

	var loadingBar = document.createElement('div');
	loadingBar.className = 'uk-progress uk-progress-striped uk-active uk-width-1-3 uk-container-center';
	loadingLayer.style.height = "100%";
	loadingLayer.style.top = '50%';
	//loadingBar.width = '50%';
	var process = document.createElement('div');
	process.className = 'uk-progress-bar';
	process.style.width = '100%';
	loadingBar.appendChild(process);
	loadingLayer.appendChild(loadingBar);

	var backgroundLayer = document.createElement('div');
	backgroundLayer.style.background = "#000000";
	backgroundLayer.style.height = "100%";
	backgroundLayer.style.width = '100%';
	backgroundLayer.style.left = '0px';
	backgroundLayer.style.top = '0px';
	backgroundLayer.style.position = 'fixed';
	$(backgroundLayer).css({ opacity: 0.3 });
	loadingLayer.appendChild(backgroundLayer);
/*
	loadingLayer = document.createElement('div');
	loadingLayer.style.height = "100%";
	loadingLayer.style.width = '100%';
	loadingLayer.style.left = '0px';
	loadingLayer.style.top = '0px';
	loadingLayer.style.position = 'fixed';
	var backgroundLayer = document.createElement('div');
	backgroundLayer.style.background = "#000000";
	backgroundLayer.style.height = "100%";
	backgroundLayer.style.width = '100%';
	backgroundLayer.style.left = '0px';
	backgroundLayer.style.top = '0px';
	backgroundLayer.style.position = 'fixed';
	//loadingLayer.style.zIndex = "999";
	$(backgroundLayer).css({ opacity: 0.3 });
	loadingLayer.appendChild(backgroundLayer);

		var loadingIconWhite = document.createElement('div');
		//loadingIconWhite.id = 'ajaxloader_white';
		loadingIconWhite.className = 'uk-progress uk-progress-striped uk-active';
		var test = document.createElement('div');
		test.className = 'uk-progress-bar';
		test.style.width = '100%';
		loadingIconWhite.appendChild(test);
		loadingLayer.appendChild(loadingIconWhite);
*/
}

function MD5(string) {
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}

	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}

	function F(x,y,z) { return (x & y) | ((~x) & z); }
	function G(x,y,z) { return (x & z) | (y & (~z)); }
	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }

	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}

	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	return temp.toLowerCase();
}
