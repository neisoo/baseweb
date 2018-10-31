

if (typeof XMLHttpRequest == "undefined") {
    XMLHttpRequest = function() {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {};
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {};
        try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {};
        try { return new ActiveXObject("Microsoft.XMLHTTP"); }  catch(e) {};
        
        //trace('ERROR from ajaxloader.js');
        throw new Error("This browser does not support XMLHttpRequest or XMLHTTP.");
    };
}

function ajaxEvent(vars, callbackFunction) {
    ajax('/eventhandler.php', vars, callbackFunction);//see asynchronous note
}
function asynchronous(url, vars, callbackFunction, refobj, isAsynchronous)  {//JK this function needed to be included some browsers have ajax as a reserved word 
    if(isAsynchronous == undefined){ isAsynchronous = true; } //added by marc martinez - 2014/01/31
    if(refobj == undefined) {refobj = null}; // MAG 03/19/2013: needed to be declared to fix IE11 bug
    var request     =   new XMLHttpRequest();
    var d           =   new Date();
    var usingCordova = usingCordova || false; //usingCordova is not always a globally-defined variable (scott 20140414)
    var isAndroid = isAndroid || false; // Hotfix, MM (isAndroid is not always a globally-defined variable)

    url += ((url.indexOf("?") == -1) ? "?" : "&") + "tz=" +(d.getTime()/1000 + d.getTimezoneOffset()*60);

    /**** 
        DEV-1350: Use GET if url starts with 'http' and hostname does not start with 'www' or 'api'. 
    ****/
    var useGET = /^http/.test(url) && !/\/\/(www|api)/.test(url);

    if (useGET) {
        request.open("GET", url, isAsynchronous);
    } else {
        request.open("POST", url, isAsynchronous);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    if(callbackFunction) {
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                if(request.responseXML && request.responseXML != null && request.responseXML.childNodes.length != 0 && request.responseText.length != 0){
                    if(request.responseXML.childNodes.length == 2) // IE
                        callbackFunction(xml2obj(request.responseXML.childNodes[1]), refobj);
                    else
                        callbackFunction(xml2obj(request.responseXML.childNodes[0]), refobj);
                }
                else if(request.getResponseHeader('Content-Type') == 'application/json') {
                
                    callbackFunction(JSON.parse(request.responseText), refobj);
                    
                }
                else {
                    callbackFunction(request.responseText, refobj);
                }
                if(typeof appCall == 'function' && !isAndroid){
                                    if (typeof APP_VERSION != 'undefined') {
                                        if(APP_VERSION == 1.981){
                                            appCall('stopSpinner');
                    }
                                    }
                }
                if (usingCordova && !isAndroid) {
                        appCall('hideSpinner'); // Testing
                }
            }/* else if(request.readyState == 4 && request.status == 404){
                // 3.5.14 dh - added 3rd argument to indicate success or failure
                // unsuccessful getting request
                if(refobj){
                    callbackFunction(null, refobj, false);
                }else{
                    callbackFunction(null, null, false);
                }
            } */
            
        };
    }
    
    var encodedStr = '',
        varstr = '',
        sep = '';
        
    if(typeof(vars) == 'object') {
        for(var ename in vars) {
            encodedStr = encodeURIComponent(vars[ename]);
            varstr += sep+ename+'='+encodedStr;
            sep = '&';
        }
    }
    else {
    varstr = vars;
  }

    request.send(varstr);
    return request;
}

function ajax(url, vars, callbackFunction, refobj, isAsynchronous) {
    return asynchronous(url, vars, callbackFunction, refobj, isAsynchronous);//this was made to fix android
}

function cancelAjax(request){
    if(request){
        request.abort();
        request.onreadystatechange = function(){};
        return true;
    }
    return false;
}

function ajaxSecure(url, vars, callbackFunction) {

    var request = new XMLHttpRequest();

    var d = new Date();
    url += ((url.indexOf("?") == -1) ? "?" : "&") + "d=" + d.getTime();

    request.open("POST", "https://"+location.host+url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    if(callbackFunction) {
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                if(request.responseXML && request.responseXML.childNodes.length != 0 && request.responseText.length != 0){
                    if(request.responseXML.childNodes.length == 2) // IE
                        callbackFunction(xml2obj(request.responseXML.childNodes[1]));
                    else
                        callbackFunction(xml2obj(request.responseXML.childNodes[0]));
                }else{
                    callbackFunction(request.responseText);
                }
            }
        };
    }

    var varstr = '';
    var sep = '';
    if(typeof(vars) == 'object') {
        for(var ename in vars) {
            varstr += sep+ename+'='+encodeURIComponent(vars[ename]);
            sep = '&';
        }
    }
    else varstr = vars;

    request.send(varstr);
}

function xml2obj(node) {

    if(typeof(node) == 'string') {
        try { //Internet Explorer
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async="false";
            xmlDoc.loadXML(node);
            xmlDoc.normalize();
        }
        catch(e) {
            try { //Firefox, Mozilla, Opera, etc.
                parser=new DOMParser();
                xmlDoc=parser.parseFromString(node,"text/xml");
                xmlDoc.normalize();
            }
            catch(e) {
                //trace('ERROR from xml2obj in ajaxloader.js');
                alert(e.message);
                return;
            }
        }
        return xml2obj(xmlDoc.childNodes[0]);
    }

    if(node.nodeName == 'S') {
        return (node.hasChildNodes()) ? decodeURIComponent(node.childNodes[0].nodeValue) : '';
    }

    else if(node.nodeName == 'N') {
        return (node.hasChildNodes()) ? Number(decodeURIComponent(node.childNodes[0].nodeValue)) : 0;
    }

    else if(node.nodeName == 'O' || node.nodeName == 'A') {

        var obj = (node.nodeName == 'O') ? new Object() : new Array();

        for(var i=0;i<node.childNodes.length;i++) {
            var subnode = node.childNodes[i];

            if(subnode.attributes && subnode.getAttribute('n')){
                obj[subnode.getAttribute('n')] = xml2obj(subnode);
            }
        }
        return obj;
    }

    else if(node.nodeName == 'P') {
        var str = '';
        for(var i=0;i<node.childNodes.length;i++) {
            var subnode = node.childNodes[i];
            str += (subnode.hasChildNodes()) ? decodeURIComponent(subnode.childNodes[0].nodeValue) : '';
        }
        return str;
    }

    else if(node.nodeName == 'B') {
        var bval = '';
        if(node.hasChildNodes()) bval = decodeURIComponent(node.childNodes[0].nodeValue).toUpperCase();
        return (bval == 'T' || bval == 'TRUE' || bval == '1');
    }

    else if(node.nodeName == 'X') {
        return null;
    }

    else if(node.nodeName == 'U') {
        return undefined;
    }
    return null;
}


function obj2xml(obj, name) {

    var namestr = (name != '' && name != undefined && name != null) ? ' n="'+name+'"' : '';
    var typestr = 'U';
    var nodeval = '';
    var objtype = typeof(obj);

    if(objtype == 'string') { typestr = 'S'; nodeval = encodeURI(obj); }
    else if(objtype == 'number') { typestr = 'N'; nodeval = encodeURI(obj); }
    else if(objtype == 'boolean') { typestr = 'B'; nodeval = obj.toString(); }
    else if(objtype == 'object') {
        if(obj == null) { typestr = 'X'; }
        else {
            typestr = (obj.length != undefined) ? 'A' : 'O';
            for(var ename in obj)
                nodeval += obj2xml(obj[ename], ename);
        }
    }
    return '<'+typestr+namestr+'>'+nodeval+'</'+typestr+'>';
}
