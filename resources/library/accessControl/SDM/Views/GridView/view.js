/*** Version 1.0.1 ***/

var SDMGObjGlobal = [];

(function($) {

	$.fn.SDMGrid = function(config) {
		var defaultConfig = {
			action : "getPage",
			prefix : "",
			src : "",
			dataSet : null,
			dataType : "jsonString",
			reqMethod : "GET",
			reqParam : {},
			debugMode : true,
			headerMode : 1,
			pageBreak : 0,
			minRows : 1,
			totalPage : 0,
			currentPage : 0,
			sortKey : "",
			sortDataType : "string",
			sortDesc : false,
			gridFilter : [],
			triggerFilter : [],
			cols : [],
			width : "800px",
			textAlign : "left",
			fontSize : "12px",
			fontWeight : "normal",
			fontColor : "#000000",
			fontFamily : "Arial",
			headerTextAlign : "center",
			headerFontSize : "16px",
			headerFontWeight : "normal",
			headerFontColor : "#000000",
			headerFontFamily : "Arial",
			headerBackgroundColor : "#888888",
			rowBackgroundColor : "#ffffff",
			rowEvenBackgroundColor : "#FAF2F2",
			borderColor : "#000000",
			borderSize : "1px",
			borderStyle : "solid",
			rowHeight : "auto",
			cellPadding : "3px",
			fixedWidth : "0px",
			onChanged   : function() {}
		}
//
		var config = $.extend({}, defaultConfig, config);
		if (config.width.indexOf("%") > -1) {
			config.width = Math.round(
					+(this.width().toString().replace("px", ""))
							* +(config.width.replace("%", "")) / 100)
					.toString()
					+ "px";
		}

		var id = "";
		if (this != null) {
			if (this.attr("id") != null) {
				id = this.attr("id");
			} else {
				id = "SDMGrid_Default_" + (SDMGObjGlobal.length + 1).toString();
				this.attr("id", id);
			}
			SDMGObjGlobal[id] = config;
		}
	};

	$.fn.SDMGetGridConfig = function() {
		var id = this.attr("id");
		var gridConfig = SDMGObjGlobal[id];
		return gridConfig;
	}

	$.fn.SDMGSetData = function(dataObj) {

		function find(element, find_key) {
			if (typeof element != "object" && typeof element != "array") {
				return null;
			}

			if (element[find_key]) {
				return element;
			} else {
				for ( var key in element) {
					var found = find(element[key], find_key);
					if (found) {
						return found;
					}
				}
			}

			return null;
		}

		function getDataFromUrl(dataSrc, callback) {
			gridConfig.reqParam["sdm_prefix"] = gridConfig.prefix;
			gridConfig.reqParam["sdm_page_break"] = gridConfig.pageBreak;
			gridConfig.reqParam["sdm_page_no"] = gridConfig.currentPage;
			gridConfig.reqParam["sdm_sort_key"] = gridConfig.sortKey;
			gridConfig.reqParam["sdm_sort_desc"] = gridConfig.sortDesc;
			gridConfig.reqParam["sdm_sort_type"] = gridConfig.sortDataType;
			gridConfig.reqParam["sdm_grid_filter"] = JSON
					.stringify(gridConfig.triggerFilter);

			$.ajax({
				async : false,
				type : gridConfig.reqMethod.toUpperCase(),
				url : dataSrc,
				data : gridConfig.reqParam
			}).done(
					function(data) {
						var dataSet = JSON.parse(data);
						if (dataSet.totalRecord) {
							gridConfig.totalPage = Math
									.ceil(dataSet.totalRecord
											/ gridConfig.pageBreak);
						}

						return callback.call(this, find(dataSet,
								gridConfig.prefix));
					}).fail(function(jqXHR, textStatus, errorThrown) {
				throw new SDMGException(errorThrown);
			});
		}

		function SDMGException(message) {
			this.message = message;
			this.name = "SDMGException";
		}

		try {
			var id = this.attr("id");
			var gridConfig = SDMGObjGlobal[id];
			if (gridConfig == null) {
				return false;
			}

			if (dataObj.prefix == null) {
				throw new SDMGException("No prefix");
			} else {
				gridConfig.prefix = dataObj.prefix;
			}

			gridConfig.dataType = dataObj.dataType || gridConfig.dataType;

			gridConfig.reqMethod = dataObj.reqMethod != null ? dataObj.reqMethod
					: gridConfig.reqMethod;

			gridConfig.reqParam = dataObj.reqParam != null ? dataObj.reqParam
					: gridConfig.reqParam;

			if (dataObj.src == null) {
				// return false;
				throw new SDMGException("No dataSrc");
			} else {
				gridConfig.src = dataObj.src;
				if (gridConfig.dataType == "url") {
					getDataFromUrl(dataObj.src, function(data) {
						gridConfig.dataSet = data[gridConfig.prefix];
					});
				}

				else if (gridConfig.dataType == "jsonString") {
					var dataSet = find(JSON.parse(dataObj.src),
							gridConfig.prefix);
					gridConfig.dataSet = dataSet[gridConfig.prefix];
				} else {
					throw new SDMGException("No such data type: "
							+ gridConfig.dataType);
				}

			}
		} catch (e) {
			console.warn(e.name + ":" + e.message);
			return false;
		}

		return true;

	};

	$.fn.SDMGAddCol = function(object) {
		var id = this.attr("id");

		var gridConfig = SDMGObjGlobal[id];
		if (gridConfig == null) {
			return;
		}

		var defaultObj = {
			type : "text",
			nowSort : 0,
			dataType : "string",
			cursor : "auto"
		}

		object = $.extend({}, defaultObj, object);
		
		if(gridConfig.selectRow){
			object.cursor = gridConfig.cursor?gridConfig.cursor:object.cursor;
		}
		

		object.type = "text";

		gridConfig.cols.push(object);

	}

	$.fn.SDMGAddButtonCol = function(object) {
		var id = this.attr("id");
		var gridConfig = SDMGObjGlobal[id];
		if (gridConfig == null) {
			return;
		}

		var defaultObj = {
			type : "button",
			text : "button",
			cursor : "auto",
			fontColor : gridConfig.fontColor
		}

		object = $.extend({}, defaultObj, object);
		object.type = "button";

		gridConfig.cols.push(object);
	}

	$.fn.SDMGAddImageCol = function(object) {
		var id = this.attr("id");
		var gridConfig = SDMGObjGlobal[id];
		if (gridConfig == null) {
			return;
		}

		var defaultObj = {
			type : "image",
			cursor : "auto"
		}

		object = $.extend({}, defaultObj, object);
		object.type = "image";

		gridConfig.cols.push(object);
	}

	$.fn.SDMGAddFilter = function(object) {
		var defaultObj = {
			filter : "like",
			dataType : "string",
			input : "",
			inputTo : "",
			stringFormat : "",
			fieldName : "",
			caseSensitive : false
		}

		object = $.extend({}, defaultObj, object);

		object.filter = object.filter.trim().toLowerCase();

		var id = this.attr("id");
		var gridConfig = SDMGObjGlobal[id];
		if (gridConfig == null) {
			return;
		}
		gridConfig.gridFilter.push(object);
		if (typeof (object.input) != "object"
				&& (typeof (object.inputTo) != "object")) {
			gridConfig.triggerFilter.push({
				filter : object.filter,
				dataType : object.dataType,
				value : object.input,
				valueTo : object.inputTo,
				stringFormat : object.stringFormat,
				fieldName : object.fieldName.trim(),
				caseSensitive : object.caseSensitive
			});
		}

	}

	$.fn.SDMGClearFilter = function(object) {
		var id = this.attr("id");
		var gridConfig = SDMGObjGlobal[id];
		if (gridConfig == null) {
			return;
		}
		gridConfig.gridFilter = {};
	}

	$.fn.SDMGShowGrid = function() {
		var id = this.attr("id");
		var gridConfig = SDMGObjGlobal[id];

        //if (typeof(gridConfig.width) == "undefined") {
            //alert("kkkk width undefine" + this.attr("id"));
        //}
		var gridDiv = document.createElement('div');
		gridDiv.className = "sdm_grid";
		var gridStyle = "width:" + gridConfig.width + "; " + "display: block; ";
		gridDiv.setAttribute("style", gridStyle);
		gridDiv = $(gridDiv);

		var drawArr = [];

		function getHeader(jsonArr) {
			var headerArr = [];
			var checkArr = [];
			if (gridConfig.cols.length <= 0) {
				for ( var row in jsonArr) {
					for ( var key in jsonArr[row]) {
						if (jQuery.inArray(key, checkArr) == -1) {
							checkArr.push(key);
						}
					}
				}

				for ( var idx in checkArr) {
					gridConfig.cols.push({
						type : "text",
						jsonName : checkArr[idx],
						titleText : checkArr[idx]
					});
				}
			}

			for ( var idx in gridConfig.cols) {
				headerArr.push([ idx, gridConfig.cols[idx].jsonName,
						gridConfig.cols[idx].titleText ]);
			}
			return headerArr;
		}

		function getGridHeaderDiv() {
			var headerDiv = document.createElement('div');
			switch (gridConfig.headerMode) {
			case 1:
				headerDiv.className = "sdm_grid_header";
				headerDiv.setAttribute("style",
						"display:block; position:relative; z-index: 1");

				var headerRow = document.createElement('div');
				headerRow.className = "sdm_grid_row";
				headerRow.setAttribute("style", getHeaderRowAttrs());

				var col_count = 0;
				for ( var header in drawArr["header"]) {

					var columnDiv = document.createElement('div');
					columnDiv.className = "sdm_col_" + col_count
							+ " sdm_grid_cell";

					// alert("&#x25BC");
					var innerDiv = document.createElement('div');
					$(innerDiv).append(drawArr["header"][header][1]);
					innerDiv.setAttribute("style", "display:inline-block;");

					$(columnDiv).append(innerDiv);

					if (gridConfig.cols[header].nowSort == 1) {
						$(innerDiv)
								.append(
										"<div style=\"display: inline-block; margin-left: 5px; height:0; width:0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid black;\"></div>");
					} else if (gridConfig.cols[header].nowSort == 2) {
						$(innerDiv)
								.append(
										"<div style=\"display: inline-block; margin-left: 5px; height:0; width:0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 6px solid black;\"></div>");
					}

					if (gridConfig.cols[header].sortable
							&& gridConfig.dataType == "url"
							&& gridConfig.cols[header].type != "button") {
						(function(col) {
							columnDiv.addEventListener("click", function() {
								SDMSortCol(gridDiv, gridConfig, col);
							});
						}({
							jsonName : drawArr["header"][header][0],
							colCount : col_count,
							type : gridConfig.cols[header].dataType
						}));

						columnDiv.setAttribute("style",
								getHeaderAttrs(gridConfig.cols[header])
										+ "cursor: pointer;");
					} else {
						columnDiv.setAttribute("style",
								getHeaderAttrs(gridConfig.cols[header]));
					}

					$(headerRow).append(columnDiv);
					col_count++;
				}

				$(headerDiv).append(headerRow);
				break;
			}

			return headerDiv;
		}

		function getGridDataDiv() {
			var dataDiv = document.createElement('div');
			dataDiv.className = "sdm_grid_data";
			dataDiv.setAttribute("style", "display:block; position:relative;");
			var pageRows = 0;
			if (drawArr.length < gridConfig.minRows) {
				pageRows = gridConfig.minRows;
			} else {
				pageRows = drawArr.length;
			}

			for ( var row = 0; row < pageRows; row++) {
				var rowDiv = document.createElement('div');
				rowDiv.className = "sdm_grid_row";
				rowDiv.setAttribute("style", getRowAttrs());

				var col_count = 0;
				if (drawArr[row]) {
					for ( var col in drawArr[row]) {
						var columnDiv = document.createElement('div');
						columnDiv.className = "sdm_col_" + col_count
								+ " sdm_grid_cell";

						var contentDiv = getGridCell(gridConfig.cols[col], {
							value : drawArr[row][col] || "&nbsp;",
							rowData : gridConfig.dataSet[row]
						});

						columnDiv.setAttribute("style", getCellAttrs(
								row % 2 == 0, gridConfig.cols[col]));

						if (gridConfig.cols[col].onClick != null
								&& gridConfig.cols[col].type != "button"
								&& gridConfig.cols[col].type != "image") {

							(function(obj) {
								columnDiv.addEventListener("click", function() {
									obj.item.onClick(obj.data);

								}, false);
							}({
								item : gridConfig.cols[col],
								data : gridConfig.dataSet[row]
							}));

							columnDiv = getHoverAttr(gridConfig.cols[col],
									columnDiv);

						} else if (gridConfig.onRowClick != null
								&& gridConfig.cols[col].type != "button"
								&& gridConfig.cols[col].type != "image") {

							(function(obj) {
								columnDiv.addEventListener("click", function() {
									obj.item.onRowClick(obj.data);
								}, false);
							}({
								item : gridConfig,
								data : gridConfig.dataSet[row]
							}));
							columnDiv = getHoverAttr(gridConfig.cols[col],
									columnDiv);
						}

						$(columnDiv).append(contentDiv);
						$(rowDiv).append(columnDiv);
						col_count++;
					}
				} else {
					var col_count = 0;
					for ( var i in gridConfig.cols) {
						var columnDiv = document.createElement('div');
						columnDiv.className = "sdm_col_" + col_count
								+ " sdm_grid_cell";

						var contentDiv = getGridCell(gridConfig.cols[i], {
							value : "&nbsp;"
						});

						columnDiv.setAttribute("style", getCellAttrs(
								row % 2 == 0, gridConfig.cols[i]));

						columnDiv = getHoverAttr(gridConfig.cols[col],
								columnDiv);

						$(columnDiv).append(contentDiv);
						$(rowDiv).append(columnDiv);
						col_count++;
					}
				}

				$(dataDiv).append(rowDiv);
			}

			return dataDiv;
		}

		function getFooter() {

            if (gridConfig.pageBreak <= 0 || gridConfig.dataType != "url") {
                return "";
            }

            var footerDiv = document.createElement('div');
            footerDiv.className = "sdm_grid_footer";
            footerDiv.setAttribute("style",
                    "display: block; position: relative; margin-top: 10px;");

            // 使用uikit风格的分页
            var footerUl = document.createElement('ul');
            footerUl.className = "uk-pagination";
            $(footerUl).uk("pagination", {
                pages : gridConfig.totalPage,
                currentPage : gridConfig.currentPage,
                displayedPages: 10,
                edges : 3
            });
            $(footerUl).on('select.uk.pagination', function(e, pageIndex) {
                SDMGGetPage($(this).parent().parent().parent(), gridConfig, pageIndex);
            });
            $(footerDiv).append(footerUl);
            return footerDiv;
/* 原始的分页
			if (gridConfig.pageBreak <= 0 || gridConfig.dataType != "url") {
				return "";
			}
			var footerDiv = document.createElement('div');
			footerDiv.className = "sdm_grid_footer";
			footerDiv.setAttribute("style",
					"display: block; position: relative;");
			var start = Math.floor(gridConfig.currentPage / 10) * 10;
			if (start < 0) {
				start = 0;
			}

			var end = (start + 11) <= gridConfig.totalPage ? start + 11
					: gridConfig.totalPage;

			if (gridConfig.currentPage >= 10) {
				var footerToFirstBtn = document.createElement('a');
				footerToFirstBtn
						.setAttribute("style",
								"display: inline-block; padding: 2px; cursor: pointer;");
				footerToFirstBtn.className = "sdm_grid_footer_button";
				footerToFirstBtn.setAttribute("href", "#");
				footerToFirstBtn.addEventListener("click", function() {
					// 这里用gridDiv会有问题，应该用它的父元素
					SDMGGetPage($(this).parent().parent().parent().parent(), gridConfig, 0);
				});
				$(footerToFirstBtn).append("<");
				$(footerDiv).append(footerToFirstBtn);
			}

			for ( var i = start - 1; i < end; i++) {
				if (i >= 0) {
					var footerBtn = document.createElement('a');
					if (i != gridConfig.currentPage) {
						footerBtn.setAttribute("href", "#");
						footerBtn
								.setAttribute("style",
										"display: inline-block; padding: 2px; cursor: pointer;");
						footerBtn.className = "sdm_grid_footer_button";
						(function(page) {
							footerBtn.addEventListener("click", function() {
								// 这里用gridDiv会有问题，应该用它的父元素
								SDMGGetPage($(this).parent().parent().parent().parent(), gridConfig, page);
							});
						}(i));
						$(footerBtn).append(i + 1);
					} else {
						footerBtn.setAttribute("style",
								"display: inline-block; padding: 5px;");
						footerBtn.className = "sdm_grid_footer_button";
						$(footerBtn).append('[' + (i + 1) + ']');
					}

					$(footerDiv).append(footerBtn);
				}
			}

			if (gridConfig.currentPage <= gridConfig.totalPage - 10) {
				var footerToLastBtn = document.createElement('a');
				footerToLastBtn
						.setAttribute("style",
								"display: inline-block; padding: 2px; cursor: pointer;");
				footerToLastBtn.className = "sdm_grid_footer_button";
				footerToLastBtn.setAttribute("href", "#");
				footerToLastBtn.addEventListener("click", function() {
					SDMGGetPage($(this).parent().parent().parent().parent(), gridConfig, gridConfig.totalPage - 1);
				});
				$(footerToLastBtn).append(">");
				$(footerDiv).append(footerToLastBtn);
			}
			return footerDiv;
*/
		}

		function getGridCell(obj, data) {

			switch (obj.type) {
			case "button":
				return getButton(obj, data);
			case "image":
				return getImage(obj, data);
			default:
				return getText(obj, data);
			}

		}

		function getButton(obj, data) {

			var div = document.createElement("div");
			var button = document.createElement("input");
			button.type = "button";
			button.value = obj.text;
			if(button.buttonClass != "undefined"){
			    button.className = obj.buttonClass;
			}
			if (obj.onClick != null) {
				// button.onclick = obj.button.onClick();
				button.addEventListener("click", function() {
					obj.onClick(data.rowData)
				}, false);
			}

			div.setAttribute("style", "text-align: " + obj.align || "" + ";");
			button.setAttribute("style", getButtonAttrs(obj));
			getHoverAttr(obj, button);

			$(div).append(button);

			return div;
		}

		function getImage(obj, data) {

			var div = document.createElement("div");
			var image = document.createElement("img");
			if (obj.imageLocation == "url") {
				image.src = "url(\"" + data.value + "\")";
			} else {
				image.src = data.value;
			}

			if (obj.onClick != null) {
				image.addEventListener("click", function() {
					obj.onClick(data.rowData)
				}, false);
			}

			div.setAttribute("style", "text-align: " + obj.align || "" + ";");
			image.setAttribute("style", getImageAttrs(obj));
			// getHoverAttr(obj, image);

			$(div).append(image);

			return div;
		}

		function getText(obj, data) {
			var div = document.createElement("div");

			$(div).append(data.value || "&nbsp");

			div.setAttribute("style", "display:block; height:auto");
			return div;
		}

		function getHoverAttr(config, element) {
			var defaults = {
				selectRow : false,
				hoverFontColor : $(element).css("color"),
				hoverBackgroundColor : $(element).css("background-color"),
				backgroundColor : $(element).css("background-color")
			}

			config = $.extend({}, defaults, config);

			if (gridConfig.selectRow) {
				config.hoverFontColor = gridConfig.hoverFontColor ? gridConfig.hoverFontColor
						: config.hoverFontColor;
				config.hoverBackgroundColor = gridConfig.hoverBackgroundColor ? gridConfig.hoverBackgroundColor
						: config.hoverBackgroundColor;
			}

			$(element).hover(
					function() {
						if (gridConfig.selectRow) {
							$(this).parent().children().each(
									function() {
										$(this).css("color",
												config.hoverFontColor);
										$(this).css("background-color",
												config.hoverBackgroundColor);
									});
						} else {
							$(this).css("color", config.hoverFontColor);
							$(this).css("background-color",
									config.hoverBackgroundColor);
						}

					},
					function() {
						if (gridConfig.selectRow) {
							$(this).parent().children().each(
									function() {
										$(this).css("color", config.fontColor);
										$(this).css("background-color",
												config.backgroundColor);
									});
						} else {
							$(this).css("color", config.fontColor);
							$(this).css("background-color",
									config.backgroundColor);
						}
					});

			return element;
		}

		function getButtonAttrs(config) {
			var defaults = {
				buttonTextAlign : "center",
				buttonBackgroundColor : "#cccccc",
				buttonWidth : "80%",
				buttonHeight : "auto"
			}

			config = $.extend({}, defaults, config);
			var attrStr = "";

			if(config.buttonClass=="undefined"){
        			attrStr += "text-align: " + config.buttonTextAlign + ";";
        			attrStr += "font-size: " + config.fontSize + ";";
        			attrStr += "font-weight: " + config.fontWeight + ";";
        			attrStr += "font-family: " + config.fontFamily + ";";
        			attrStr += "color: " + config.fontColor + ";";
        			attrStr += "background-color: " + config.buttonBackgroundColor
        					+ ";";
        			attrStr += "cursor: " + config.cursor + ";";

        			attrStr += "width: " + config.buttonWidth + ";";
        			attrStr += "height: " + config.buttonHeight + ";";
        			attrStr += "z-index: 1;";
			}


			return attrStr;

		}

		function getImageAttrs(config) {
			var defaults = {
				imageWidth : "80%"
			}

			config = $.extend({}, defaults, config);

			var attrStr = "";
			attrStr += "width: " + config.imageWidth + ";";
			attrStr += "height: auto;";
			attrStr += "cursor: " + config.cursor + ";";
			attrStr += "z-index: 1;";

			return attrStr;

		}

		function getCellAttrs(rowEven, colConfig) {
			var defaults = {
				textAlign : gridConfig.textAlign || gridConfig.align,
				fontSize : gridConfig.fontSize,
				fontWeight : gridConfig.fontWeight,
				fontFamily : gridConfig.fontFamily,
				padding : gridConfig.cellPadding,
				borderSize : gridConfig.borderSize,
				backgroundColor : gridConfig.rowEvenBackgroundColor,
				columnWidth : calColumnWidth()
			}
			colConfig = $.extend({}, defaults, colConfig);

			colConfig.backgroundColor = rowEven ? gridConfig.rowEvenBackgroundColor
					: gridConfig.rowBackgroundColor;

			var attrStr = "";
			attrStr += "text-align: " + colConfig.textAlign + ";";
			attrStr += "color: " + colConfig.fontColor + ";";
			attrStr += "font-size: " + colConfig.fontSize + ";";
			attrStr += "font-weight: " + colConfig.fontWeight + ";";
			attrStr += "color: " + gridConfig.fontColor + ";";
			attrStr += "font-family: " + colConfig.fontFamily + ";";
			attrStr += "cursor: " + colConfig.cursor + ";";
			attrStr += gridConfig.rowHeight.trim() != "auto" ? "height: 100%;"
					: " height:auto;";

            var columnWidth = convertColWidth(colConfig.columnWidth);
            var padding = Math.round(+(colConfig.padding.replace("px", "")));
            var borderSize = Math.round(+(colConfig.borderSize.replace("px", "")));
            columnWidth = columnWidth - 2 * padding - 2 * borderSize;

			attrStr += "width: "
					+ columnWidth.toString() + "px;";
			attrStr += "padding: " + colConfig.padding + ";";
			attrStr += "background-color: " + colConfig.backgroundColor + ";";
			attrStr += "display: block;";
			attrStr += "float: left;";
			attrStr += "border-style: " + gridConfig.borderStyle + ";";
			attrStr += "border-width: " + colConfig.borderSize + ";";
			attrStr += "border-color: " + gridConfig.borderColor + ";";
			attrStr += "margin-left:-1px;";
			attrStr += "margin-top:-1px;";
			attrStr += "overflow: hidden;";

			return attrStr;
		}

		function getHeaderAttrs(colConfig) {
			var defaults = {
				headerTextAlign : gridConfig.headerTextAlign,
				headerFontSize : gridConfig.headerFontSize,
				headerFontWeight : gridConfig.headerFontWeight,
				headerFontColor : gridConfig.headerFontColor,
				headerFontFamily : gridConfig.headerFontFamily,
				padding : gridConfig.cellPadding,
                borderSize : gridConfig.borderSize,
				headerBackgroundColor : gridConfig.headerBackgroundColor,
				columnWidth : calColumnWidth()
			}

			colConfig = $.extend({}, defaults, colConfig);

			var attrStr = "";
			attrStr += "text-align: " + colConfig.headerTextAlign + ";";
			attrStr += "font-size: " + colConfig.headerFontSize + ";";
			attrStr += "font-weight: " + colConfig.headerFontWeight + ";";
			attrStr += "color: " + colConfig.headerFontColor + ";";
			attrStr += "font-family: " + colConfig.headerFontFamily + ";";
			attrStr += gridConfig.rowHeight.trim() != "auto" ? "height: 100%;"
					: " height:auto;";

            var columnWidth = convertColWidth(colConfig.columnWidth);
            var padding = Math.round(+(colConfig.padding.replace("px", "")));
            var borderSize = Math.round(+(colConfig.borderSize.replace("px", "")));
            columnWidth = columnWidth - 2 * padding - 2 * borderSize;

			attrStr += "width: "
					+ columnWidth.toString() + "px;";
			attrStr += "padding: " + colConfig.padding + ";";
			attrStr += "background-color: " + colConfig.headerBackgroundColor
					+ ";";
			attrStr += "display: block;";
			attrStr += "float: left;";
			// attrStr += "border: 1px solid black;";
			attrStr += "border-style: " + gridConfig.borderStyle + ";";
			attrStr += "border-width: " + colConfig.borderSize + ";";
			attrStr += "border-color: " + gridConfig.borderColor + ";";

			attrStr += "margin-left:-1px;";
			attrStr += "margin-top:-1px;";
			attrStr += "overflow: hidden;";
			return attrStr;
		}

		function getHeaderRowAttrs() {
			var attrStr = "";
			attrStr += "height: " + gridConfig.rowHeight + ";";
			attrStr += "clear: both;";
			attrStr += "display: block;";
			attrStr += "margin-top: -1px;";
			attrStr += "position: relative;";

			return attrStr;
		}

		function getRowAttrs() {
			var attrStr = "";
			attrStr += "height: " + gridConfig.rowHeight + ";";
			attrStr += "clear: both;";
			attrStr += "display: block;";
			attrStr += "margin-top: -1px;";
			attrStr += "position: relative;";
			return attrStr;
		}

		function convertColWidth(width) {
			if (width.indexOf('%') != -1) {
				var totalWidth = Math.round(+(gridConfig.width.replace("px", " ")));
				var fixedWidth = Math.round(+(gridConfig.fixedWidth.replace("px", " ")));
				var colWidth = Math.round((totalWidth - fixedWidth)
						* +(width.replace("%", "")) / 100);
				return colWidth;
			} else {
				width = Math.round(+(width.replace("px", "")));
			}

			return width
		}

		function calColumnWidth() {
			var totalWidth = +(gridConfig.width.replace("px", ""));
			var colCount = gridConfig.cols.length;
			for ( var col in gridConfig.cols) {
				if (gridConfig.cols[col].columnWidth) {
					totalWidth -= convertColWidth(gridConfig.cols[col].columnWidth);
					colCount--;
				}
			}
			return Math.round(totalWidth / colCount).toString() + "px";
		}

		function draw() {
			var headerDiv = getGridHeaderDiv();
			var dataDiv = getGridDataDiv();
			var footerDiv = getFooter();

			gridDiv.append(headerDiv);
			gridDiv.append(dataDiv);
			gridDiv.append(footerDiv);
		}

		function handleError(message) {
			if (gridConfig.debugMode) {
				console.warn(message);
			}
			return gridDiv;
		}

		function getEmptyResultDiv() {
			var div = document.createElement('div');
			$(div).append("No Data");
			return div;
		}

		function SDMGAutoResize(grid) {
			if (gridConfig.rowHeight == "auto") {
				grid.find(".sdm_grid_row").each(function() {
					var row = $(this);
					var cols = row.find(".sdm_grid_cell");
					var heights = cols.map(function() {
						return $(this).height();
					}).get();
					var tallest = Math.max.apply(Math, heights);

					cols.css('height', tallest);
					row.css('height', tallest);
				});

				var w = 0;
				$(grid).find(".sdm_grid_row:first .sdm_grid_cell").each(
						function() {
							w += $(this).outerWidth();
						});

				// alert(grid.find(".sdm_grid").width());
				if (w > grid.find(".sdm_grid").width()) {
					grid.find(".sdm_grid_row").css("width", w);
				}
			}
		}

		if (gridConfig == null) {
			return;
		}

		try {
			drawArr = SDMGCreateDrawArr(gridConfig);
			draw();
		} catch (e) {
			handleError(e.message);
		}

		this.html("");
		this.append(gridDiv);

		// Auto tune row height
		SDMGAutoResize(this);

		gridConfig.onChanged(this);
		return this;
	};

	$.fn.SDMGToCSV = function(fileName, onlyVisible) {
		onlyVisible = onlyVisible || false;

		var id = this.attr("id");
		var gridConfig = SDMGObjGlobal[id];
		if (gridConfig == null || gridConfig.dataType != "url") {
			return;
		}

		var form = $("<form />");

		form.attr("action", gridConfig.src);
		form.attr("method", "POST");

		var param_json = JSON.stringify(gridConfig.reqParam);

		form.append($(document.createElement("input")).attr("type", "hidden")
				.attr("name", "sdm_param").attr("value", param_json));

		form.append($(document.createElement("input")).attr("type", "hidden")
				.attr("name", "sdm_action").attr("value", "getCSV"));

		form.append($(document.createElement("input")).attr("type", "hidden")
				.attr("name", "sdm_file_name").attr("value", fileName));

		form.append($(document.createElement("input")).attr("type", "hidden")
				.attr("name", "sdm_only_visible").attr("value", onlyVisible));

		var hArr = SDMGGetHeader(gridConfig);
		var headerArr = [];
		for ( var i in hArr) {
			if (hArr[i][1] != null && hArr[i][2] != null) {
				headerArr.push({
					idx : hArr[i][0],
					id : hArr[i][1],
					name : hArr[i][2]
				});
			}
		}

		form.append($(document.createElement("input")).attr("type", "hidden")
				.attr("name", "sdm_header").attr("value",
						JSON.stringify(headerArr)));
		this.append(form);
		form.submit();
		form.remove();
	}

	$.fn.SDMGRefresh = function() {
		var id = this.attr("id");
		var gridConfig = SDMGObjGlobal[id];
		if (gridConfig == null) {
			return;
		}

		for ( var i in gridConfig.gridFilter) {
			var value = "";
			var valueTo = "";
			if (typeof (gridConfig.gridFilter[i].input) != "object") {
				value = gridConfig.gridFilter[i].input;
			} else {
				if (gridConfig.gridFilter[i].input != null) {
					value = gridConfig.gridFilter[i].input.val();
				}
			}

			if (typeof (gridConfig.gridFilter[i].inputTo) != "object") {
				valueTo = gridConfig.gridFilter[i].inputTo;
			} else {
				if (gridConfig.gridFilter[i].inputTo != null) {
					valueTo = gridConfig.gridFilter[i].inputTo.val();
				}
			}

			gridConfig.triggerFilter[i] = {
				filter : gridConfig.gridFilter[i].filter,
				dataType : gridConfig.gridFilter[i].dataType,
				value : value,
				valueTo : valueTo,
				stringFormat : gridConfig.gridFilter[i].stringFormat,
				fieldName : gridConfig.gridFilter[i].fieldName.trim(),
				caseSensitive : gridConfig.gridFilter[i].caseSensitive
			};
		}

		gridConfig.currentPage = 0;
		this.SDMGSetData(gridConfig);
		this.SDMGShowGrid();
	}

	function SDMSortCol(grid, config, col) {

		var sortStatus = config.cols[col.colCount].nowSort;

		for ( var c in config.cols) {
			config.cols[c].nowSort = 0;
		}

		switch (sortStatus) {
		case 0:
			config.cols[col.colCount].nowSort = 2
			config.sortDesc = false;
			break;
		case 1:
			config.cols[col.colCount].nowSort = 2
			config.sortDesc = false;
			break;
		case 2:
			config.cols[col.colCount].nowSort = 1;
			config.sortDesc = true;
			break;
		}

		config.sortKey = col.jsonName;
		config.sortDataType = col.type.toLowerCase();
		config.currentPage = 0;

		grid.SDMGrid(config);
		grid.SDMGSetData(config);
		grid.SDMGShowGrid();

	}

	function SDMGGetPage(grid, config, page) {
		config.currentPage = page;
		grid.SDMGrid(config);
		grid.SDMGSetData(config);
		grid.SDMGShowGrid();
	}

	function SDMGGetHeader(config) {
		var headerArr = [];
		var checkArr = [];
		if (config.cols.length <= 0) {
			for ( var row in config.dataSet) {
				for ( var key in config.dataSet[row]) {
					if (jQuery.inArray(key, checkArr) == -1) {
						checkArr.push(key);
					}
				}
			}

			for ( var idx in checkArr) {
				config.cols.push({
					type : "text",
					jsonName : checkArr[idx],
					titleText : checkArr[idx]
				});
			}
		}

		for ( var idx in config.cols) {
			headerArr.push([ idx, config.cols[idx].jsonName,
					config.cols[idx].titleText ]);
		}
		return headerArr;
	}

	function SDMGCreateDrawArr(config) {
		var drawArr = [];

		if (config.prefix == "") {
			throw new SDMGException(
					".SDMGSetData() missing parameter \"Prefix\"");
		}

		var headerArr = SDMGGetHeader(config);

		if (headerArr != null) {
			for ( var header in headerArr) {
				if (config.headerMode > 0) {
					if (drawArr["header"] == null) {
						drawArr["header"] = [];
					}

					drawArr["header"][headerArr[header][0]] = [
							headerArr[header][1], headerArr[header][2] ];
				}

			}
		}

		if (config.dataSet != null) {

			for ( var row in config.dataSet) {
				if (drawArr[row] == null) {
					drawArr[row] = [];
				}

				for ( var header in headerArr) {
					if (config.headerMode > 0) {
						if (drawArr["header"] == null) {
							drawArr["header"] = [];
						}

						drawArr["header"][headerArr[header][0]] = [
								headerArr[header][1], headerArr[header][2] ];
					}

					drawArr[row][headerArr[header][0]] = config.dataSet[row][headerArr[header][1]];

				}
			}
		}
		return drawArr;
	}

	function SDMGException(message) {
		this.message = message;
		this.name = "SDMGException";
	}

}(jQuery));
