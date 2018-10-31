function TJ_Utils() { }

TJ_Utils.prototype.getRandomNumber = function(_max, _min, _exceptions)
{
	var _return;
	if(_min == undefined) _min = 0;
	if(_max < _min)
	{
		var tmp_min = _min;
		_min = _max;
		_max = tmp_min;
	}
	if(_max == _min) return _max;

	_return = Math.floor(Math.random() * 10000) % (_max - _min + 1) + _min;

	if(_exceptions != undefined)
	{
		if(_exceptions.length >= _max - _min + 1) return 0;

		for(var i = 0; i < _exceptions.length; i++)
		{
			if(_exceptions[i] == _return)
			{
				_return = this.getRandomNumber(_max, _min, _exceptions);
				break;
			}
		}
	}

	return _return;
}

TJ_Utils.prototype.shuffleArray = function(_target, _numShuffle)
{
	if(_numShuffle == undefined) _numShuffle = _target.length * 2;
	
	var index1, index2;
	var _temp;

	for(var i = 0; i < _numShuffle; i++)
	{
		index1 = this.getRandomNumber(_target.length - 1);
		index2 = this.getRandomNumber(_target.length - 1);
		_temp = _target[index1];
		_target[index1] = _target[index2];
		_target[index2] = _temp;
	}

	return _target;
}

//currently only positive values work
TJ_Utils.prototype.getAccurateFloat = function(_orig, _diff, _sign)
{
	if(typeof(_orig) != 'string') _orig = _orig.toString();
	if(typeof(_deff) != 'string') _diff = _diff.toString();
	if(_sign == undefined) _sign = 1; //add = 1, subtract = 0
	
	var _orig_split = _orig.split('.');
	var _diff_split = _diff.split('.');

	var _result = parseInt(_orig_split[0]) + parseInt(_diff_split[0]);
	var _result_dec;

	if(_sign == 1) //addition
	{
		if(_orig_split.length < 2 && _diff_split.length < 2)
			_result_dec = 0;
		else if(_orig_split.length < 2)
			_result_dec = _diff_split[1];
		else if(_diff_split.length < 2)
			_result_dec = _orig_split[1];
		else
		{
			var _max = Math.max(_orig_split[1].length, _diff_split[1].length);
			var _dec_array = new Array();
			var _raise = false;

			for(var i = 0; i < _max; i++)
				_dec_array[i] = 0;
			
			for(i = _max - 1; i >= 0; i--)
			{
				if(_orig_split[1].charAt(i))
					_dec_array[i] += parseInt(_orig_split[1].charAt(i));
				if(_diff_split[1].charAt(i))
					_dec_array[i] += parseInt(_diff_split[1].charAt(i));

				if(_dec_array[i] > 9) 
				{
					if(i == 0)
						_raise = true;
					else
						_dec_array[i-1] += 1;

					_dec_array[i] -= 10;
				}
			}

			if(_raise) _result += 1;

			_result_dec = _dec_array.toString().replace(/,/g, '');
		}
	}
	else //subtraction
	{
		var _borrow = false;
		if(_orig_split.length < 2 && _diff_split.length < 2)
			_result_dec = 0;
		else if(_diff_split.length < 2)
			_result_dec = _orig_split[1];
		else
		{	
			if(_orig_split.length == 1) _orig_split.push('0');
			_max = Math.max(_orig_split[1].length, _diff_split[1].length);
			_dec_array = new Array();
			var _orig_array = new Array();
			var _diff_array = new Array();

			for(i = 0; i < _max; i++)
			{
				if(_orig_split[1].charAt(i))
					_orig_array[i] = parseInt(_orig_split[1].charAt(i));
				else
					_orig_array[i] = 0;

				if(_diff_split[1].charAt(i))
					_diff_array[i] = parseInt(_diff_split[1].charAt(i));
				else
					_diff_array[i] = 0;

				_dec_array[i] = 0;
			}
			
			for(i = _max - 1; i >= 0; i--)
			{
				if(_orig_array[i] < _diff_array[i])
				{
					if(i == 0)
						_borrow = true;
					else
						_orig_array[i - 1] -= 1;

					_orig_array[i] += 10;
				}

				_dec_array[i] = _orig_array[i] - _diff_array[i];
			}

			if(_borrow) 
				_result = (parseInt(_orig_split[0]) - 1) - parseInt(_diff_split[0]);
			else
				_result = parseInt(_orig_split[0]) - parseInt(_diff_split[0]);

			_result_dec = _dec_array.toString().replace(/,/g, '');
		}
	}
	
	var _final_result = _result.toString() + '.' + _result_dec.toString();
	
	return parseFloat(_final_result);
}

TJ_Utils.prototype.translate = function(_target, _x, _y)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);
	
	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_x == undefined && _y == undefined)
	{
		if(_transform = _transform_data.match(/translate\([0-9\s\-\,px]*\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\,px]+/);
			_transform = _transform[0].replace(/[|]|px/g, '');

			return _transform.split(',');
		}
	}
	else
	{
		if(_x == undefined || isNaN(_x)) _x = 0;
		if(_y == undefined || isNaN(_y)) _y = 0;
		
		if(_transform_data.match(/translate\([0-9\s\-\,px]*\)/))
		{
			_transform_data = _transform_data.replace(/translate\([0-9\s\-\,px]*\)/, '');
		}

		_transform_data += 'translate(' + _x + 'px,' + _y + 'px)';
		
		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}

TJ_Utils.prototype.scaleX = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/scaleX\([0-9\s\-\.]*\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.]+/);
			return parseInt(_transform[0]);
		}
	}
	else
	{
		if(_transform_data.match(/scaleX\([0-9\s\-\.]*\)/))
		{
			_transform_data = _transform_data.replace(/scaleX\([0-9\s\-\.]*\)/, '');
		}

		_transform_data += 'scaleX(' + _val + ')';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}
TJ_Utils.prototype.scaleY = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/scaleY\([0-9\s\-\.]*\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.]+/);
			return parseInt(_transform[0]);
		}
	}
	else
	{
		if(_transform_data.match(/scaleY\([0-9\s\-\.]*\)/))
		{
			_transform_data = _transform_data.replace(/scaleY\([0-9\s\-\.]*\)/, '');
		}

		_transform_data += 'scaleY(' + _val + ')';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}
TJ_Utils.prototype.scale = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/scale\([0-9\s\-\.\,]*\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.\,]+/);

			return _transform[0].split(',');
		}
	}
	else
	{
		if(_transform_data.match(/scale\([0-9\s\-\.\,]*\)/))
		{
			_transform_data = _transform_data.replace(/scale\([0-9\s\-\.\,]*\)/, '');
		}

		_transform_data += ' scale(' + _val + ',' + _val + ')';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}

TJ_Utils.prototype.skewX = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/skewX\([0-9\s\-\.]*deg\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.]+deg/);
			return parseInt(_transform[0]);
		}
	}
	else
	{
		if(_transform_data.match(/skewX\([0-9\s\-\.]*deg\)/))
		{
			_transform_data = _transform_data.replace(/skewX\([0-9\s\-\.]*deg\)/, '');
		}

		_transform_data += 'skewX(' + _val + 'deg)';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}
TJ_Utils.prototype.skewY = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/skewY\([0-9\s\-\.]*deg\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.]+deg/);
			return parseInt(_transform[0]);
		}
	}
	else
	{
		if(_transform_data.match(/skewY\([0-9\s\-\.]*deg\)/))
		{
			_transform_data = _transform_data.replace(/skewY\([0-9\s\-\.]*deg\)/, '');
		}

		_transform_data += 'skewY(' + _val + 'deg)';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}
TJ_Utils.prototype.skew = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{
		if(_transform = _transform_data.match(/skew\([0-9\s\-\.\,]*deg\)/))
		{
			_transform = _transform[0].match(/[0-9\s\-\.\,]+/);

			return _transform[0].split(',');
		}
	}
	else
	{
		if(_transform_data.match(/skew\([0-9\s\-\.\,]*deg\)/))
		{
			_transform_data = _transform_data.replace(/skew\([0-9\s\-\.\,]*deg\)/, '');
		}

		_transform_data += ' skew(' + _val + 'deg,' + _val + 'deg)';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}

TJ_Utils.prototype.rotate = function(_target, _val)
{
	if(_target == undefined) return null;
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	var _transform_data;
	var _transform;

	if(_target.style.MozTransform) _transform_data = _target.style.MozTransform;
	if(_target.style.msTransform) _transform_data = _target.style.msTransform;
	if(_target.style.OTransform) _transform_data = _target.style.OTransform;
	if(_target.style.webkitTransform) _transform_data = _target.style.webkitTransform;

	if(_transform_data == undefined) _transform_data = '';

	if(_val == undefined)
	{	
		if(_transform = _transform_data.match(/rotate\([\-0-9]*deg\)/))
		{
			_transform = _transform[0].match(/[\-0-9]+/);
			return Math.floor(parseInt(_transform[0]));
		}
	}
	else
	{
		if(_transform_data.match(/rotate\([\-\.0-9]*deg\)/))
		{
			_transform_data = _transform_data.replace(/rotate\([\-\.0-9]*deg\)/, '');
		}
		_transform_data += 'rotate(' + Math.floor(_val) + 'deg)';

		_target.style.MozTransform = _transform_data;
		_target.style.msTransform = _transform_data;
		_target.style.OTransform = _transform_data;
		_target.style.webkitTransform = _transform_data;
	}

	return null;
}

TJ_Utils.prototype.origin = function(_target, _x, _y)
{
	if(_x == undefined) _x = 0;
	if(_y == undefined) _y = 0;
	_target.style.transformOrigin = _x + 'px ' + _y + 'px';
	_target.style.mozTransformOrigin = _x + 'px ' + _y + 'px';
	_target.style.oTransformOrigin = _x + 'px ' + _y + 'px';
	_target.style.msTransformOrigin = _x + 'px ' + _y + 'px';
	_target.style.webkitTransformOrigin = _x + 'px ' + _y + 'px';
}

TJ_Utils.prototype.releaseMemory = function (_target)
{
	if(typeof(_target) == 'string') _target = document.getElementById(_target);
	
	var _lists = _target.getElementsByTagName('*');
	for(var i = 0; i < _lists.length; i++)
		this.releaseMemory(_lists[i]);

	if(_target.parentNode) _target.parentNode.removeChild(_target);

	_target = null;
	_lists = null;
}

TJ_Utils.prototype.hitTest = function(_target, _x, _y, _adjx, _adjy, _error_size, _use_square, _stagewidth, _stageheight)
{
	if(typeof(_target) == 'string') _target = document.getElementById(_target);

	if(_adjx == undefined) _adjx = 0;
	if(_adjy == undefined) _adjy = 0;
	if(_error_size == undefined) _error_size = 1;
	if(_use_square == undefined) _use_square = true;
	if(_stagewidth == undefined) _stagewidth = 900;
	if(_stageheight == undefined) _stageheight = 650;
	
	var _imgs;
	var _simply_img = false;

	if(_target.tagName == 'DIV')
	{
		_imgs = _target.getElementsByTagName('IMG');
	}
	else if(_target.tagName == 'IMG')
	{
		_simply_img = true;
		_imgs = new Array();
		_imgs.push(_target);
	}
	
	var _cur_target = _target;

	var _transform_data;
	var _transform;

	var _rotate = 0;
	var _translatex = 0;
	var _translatey = 0;
	var _scalex = 1;
	var _scaley = 1;
	
	var _targets = new Array();
	var _target_obj;

	var _imgdata;

	while(_cur_target.id != 'content_area')
	{
		_target_obj = new Object();
		_target_obj.scalex = 1;
		_target_obj.scaley = 1;
		_target_obj.translationx = 0;
		_target_obj.translationy = 0;

		if(_cur_target.style.transform != undefined && _cur_target.style.transform != '') _transform_data = _cur_target.style.transform;
		else if(_cur_target.style.MozTransform != undefined) _transform_data = _cur_target.style.MozTransform;
		else if(_cur_target.style.msTransform != undefined) _transform_data = _cur_target.style.msTransform;
		else if(_cur_target.style.OTransform != undefined) _transform_data = _cur_target.style.OTransform;
		else if(_cur_target.style.webkitTransform != undefined) _transform_data = _cur_target.style.webkitTransform;
		
		//parse transform
		if(_transform_data)
		{
			if(_transform = _transform_data.match(/rotate\([\-0-9]*deg\)/))
			{
				_transform = _transform[0].match(/[\-0-9]+/);
				_rotate += parseInt(_transform[0]);
			}
			if(_transform = _transform_data.match(/scale\([0-9\-\,\.\s]+/))
			{
				_transform = _transform[0].match(/[0-9\-\.]+/g);
				
				if(!isNaN(_transform[0]) && !isNaN(_transform[1]))
				{				
					_scalex *= parseInt(_transform[0]);
					_scaley *= parseInt(_transform[1]);

					_target_obj.scalex = parseInt(_transform[0]);
					_target_obj.scaley = parseInt(_transform[1]);
				}
				else if(isNaN(_transform[0]) || isNaN(_transform[1]))
				{
					var _tmp_transform = (!isNaN(_transform[0]))? _transform[0] : _transform[1];
					_scalex *= parseInt(_tmp_transform);
					_scaley *= parseInt(_tmp_transform);

					_target_obj.scalex = parseInt(_tmp_transform);
					_target_obj.scaley = parseInt(_tmp_transform);
				}
				else
				{
					if(!isNaN(_transform[0])) _scalex *= parseInt(_transform[0]);
					if(!isNaN(_transform[1])) _scaley *= parseInt(_transform[1]);

					if(!isNaN(_transform[0])) _target_obj.scalex = parseInt(_transform[0]);
					if(!isNaN(_transform[1])) _target_obj.scaley = parseInt(_transform[1]);
				}
			}
			if(_transform = _transform_data.match(/translate\([0-9\s\-\,px]*\)/))
			{
				_transform = _transform[0].match(/[0-9\-]+/g);
				if(_transform[0]) _target_obj.translationx = parseInt(_transform[0]);
				if(_transform[1]) _target_obj.translationy = parseInt(_transform[1]);
			}
		}

		_target_obj.translationx += _cur_target.offsetLeft;
		_target_obj.translationy += _cur_target.offsetTop;
		_targets.push(_target_obj);

		_cur_target = _cur_target.parentNode;
	}
	
	var _cur_scale_x = 1;
	var _cur_scale_y = 1;
	while(_targets.length > 0)
	{
		_target_obj = _targets.pop();

		_translatex += _target_obj.translationx * _cur_scale_x;
		_translatey += _target_obj.translationy * _cur_scale_y;

		_cur_scale_x *= _target_obj.scalex;
		_cur_scale_y *= _target_obj.scaley;
	}

	if(_rotate != 0)
	{
		_translatex += _adjx;
		_translatey += _adjy;
	}

	var _canvas = document.createElement('CANVAS');
	_canvas.width = _stagewidth;
	_canvas.height = _stageheight;
	var _ctx = _canvas.getContext('2d');
	//_ctx.fillRect(0, 0, 900, 650);
	_ctx.translate(_translatex,_translatey);
	_ctx.scale(_scalex, _scaley);
	_ctx.rotate(_rotate*Math.PI/180);
	
	for(var i = 0; i < _imgs.length; i++)
	{	
		if(_use_square == true || _imgs[i].src.match('http://img') || navigator.userAgent.indexOf('Firefox') != -1)
		{
			if(_simply_img)
				_ctx.fillRect(0, 0, _imgs[i].offsetWidth, _imgs[i].offsetHeight);	
			else
				_ctx.fillRect(_imgs[i].offsetLeft, _imgs[i].offsetTop, _imgs[i].offsetWidth, _imgs[i].offsetHeight);
		}
		else
		{
			_ctx.drawImage(_imgs[i], _imgs[i].offsetLeft, _imgs[i].offsetTop);
		}
	}
	//document.body.appendChild(_canvas);
	var _imgdata;
	if(_error_size == 1)
	{
		_imgdata = _ctx.getImageData(_x,_y,1,1); //get target pixel info
		if(_imgdata.data[3] > 0)
			return true;
		else 
			return false;
	}
	else
	{
		_imgdata = _ctx.getImageData(_x - Math.floor(_error_size / 2), _y - Math.floor(_error_size / 2), Math.floor(_error_size / 2), Math.floor(_error_size / 2));
		
		for(i = 0; i < _imgdata.data.length; i++)
		{
			if(i % 4 == 3 && _imgdata.data[i] > 0) return true;
		}
		return false;
	}
}

TJ_Utils.prototype.hitTestFromEvent = function(_evt, _targets, _offsets, _error_size, _full_search)
{
	if(!_targets) return false;
	
	if(_error_size == undefined) _error_size = 0;
	if(_full_search == undefined) _full_search = false;
	if(_offsets == undefined) _offsets = nodeOffsets('content_area');
	
	var _pos = pagePosition(_evt, _offsets);
	
	var _returns = new Array();
	
	for(var i = 0; i < _targets.length; i++)
	{
		var _computedstyle = window.getComputedStyle(_targets[i]);
		if(_pos.x >= parseInt(_computedstyle.left) - _error_size &&
			_pos.x <= parseInt(_computedstyle.left) + parseInt(_computedstyle.width) + _error_size &&
			_pos.y >= parseInt(_computedstyle.top) - _error_size &&
			_pos.y <= parseInt(_computedstyle.top) + parseInt(_computedstyle.height) + _error_size)
		{
			if(!_full_search) return _targets[i];
			_returns.push(_targets[i]);
		}
	}
	
	if(_returns.length > 0) return _returns;
	else return false;
}

TJ_Utils.prototype.useStdChar = function(_target)
{
	if(typeof(_target) != 'string') _target = _target.toString();

	var _split = _target.split('');
	var _adjusted = '';

	for(var i = 0; i < _split.length; i++)
	{
		if(_split[i] == '1') _adjusted += '&dagger;';
		else if(_split[i] == '4') _adjusted += '&Dagger;';
		else if(_split[i] == 'J') _adjusted += '&#128;';
		else if(_split[i] == 'I') _adjusted += '&#163;';
		else _adjusted += _split[i];
	}

	return _adjusted;
}

TJ_Utils.prototype.bezierMotion = function(_points, _cnt)
{
	var _motions = new Array();
	var _prev_points, _new_points;
	var _progress;

	if(_points.length <= 2) return _points;

	for(var i = 0; i < _cnt; i++)
	{
		_new_points = new Array();
		_prev_points = new Array();
		for(var j = 0; j < _points.length; j++)
			_prev_points.push(_points[j]);
		
		_progress = i / (_cnt - 1);

		while(_new_points.length != 2)
		{
			_new_points = new Array();
			for(j = 0; j < _prev_points.length - 1; j++)
			{
				_dx = _prev_points[j+1][0] - _prev_points[j][0];
				_dy = _prev_points[j+1][1] - _prev_points[j][1];

				_new_points.push([_prev_points[j][0] + (_progress * _dx), _prev_points[j][1] + (_progress * _dy)]);
			}

			_prev_points = new Array();
			for(j = 0; j < _new_points.length; j++)
				_prev_points.push(_new_points[j]);
		}	

		_dx = _new_points[1][0] - _new_points[0][0];
		_dy = _new_points[1][1] - _new_points[0][1];
		_motions.push([_new_points[0][0] + (_progress * _dx), _new_points[0][1] + (_progress * _dy)]);
	}

	return _motions;
}

TJ_Utils.prototype.findCSS = function(_target)
{
	if(!_target) return;
	
	_target = _target.toString();
	
	for(var prop in document.styleSheets)
	{
		var _rule; 
		
		if(document.styleSheets[prop].cssRules)
			_rule = document.styleSheets[prop].cssRules;
		else if(document.styleSheets[prop].rules)
			_rule = document.styleSheets[prop].rules;
		
		if(_rule)
		{
			for(var prop2 in _rule)
			{
				if(_rule[prop2].selectorText == _target)
					return _rule[prop2];
			}
		}
	} 
	
	return;
}

TJ_Utils.prototype.turnOffSelectable = function(_target)
{
	if(typeof(_target) == 'string') _target = document.getElementById(_target);
	if(!_target) return;
	
	_target.setAttribute('unselectable', 'on');
	_target.setAttribute('draggable', false);
	if(_target.tagName == 'IMG') _target.style.pointerEvents = 'none';
	
	var _lists = _target.getElementsByTagName('*');
	for(var i = 0; i < _lists.length; i++)
		this.turnOffSelectable(_lists[i]);	
}

TJ_Utils.prototype.ping = function(_callback)
{
	var _img  = new Image();
	var _timeout = setTimeout(function(){
		if(_callback) _callback(-1);
	}, 30000);
	
	_img.onload = function(){
		if(_timeout) clearTimeout(_timeout);
		if(_callback) _callback(new Date().getTime() - this.starttime);
	};
	_img.onerror = function(){
		if(_timeout) clearTimeout(_timeout);
		if(_callback) _callback(-1);
	};
	
	_img.starttime = new Date().getTime();
	_img.src = IMGHOST + '/blank.png?' + new Date().getTime();
}
