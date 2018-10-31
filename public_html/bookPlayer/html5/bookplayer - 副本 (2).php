

<!DOCTYPE html>
<html class="">
<head>
	<title>ABCmouse.cn 国际英语学堂</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>    
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
</head>
<body class="lang-zhs" onUnload="SoundControl.stopAllSound();" onkeypress="return disableCtrlKeyCombination(event);" onkeydown="return disableCtrlKeyCombination(event);" style="background-color: #003793;">
	<div id="content-wrapper">
        <div draggable="false" unselectable="on" id="maindiv">
			<div draggable="false" unselectable="on" id="panel-left">
				<div class="btn-shell cn_logo" id="btn-mouse"></div>
				<div id='shell-aboutme' style="background-image:url(http://localhost/photobook/public_html/bookPlayer//userart/2379564311_avatar_1497050109679.png)"></div>            
				<div class="btn-shell" id="btn-aboutme" onclick="shellbtn_aboutme(); ">
				<div draggable="false" unselectable="on" id="user_points">54</div>
			</div>
			<span id='username-shell'>希希</span>
			<div class="btn-shell" id="btn-home" onclick="shellbtn_home(); ">
				<span class='btn-text'>Home</span>
			</div>
				<div class="btn-shell" id="btn-language" onclick="shellbtn_toggle()">
					<span class='btn-text'>Language</span>
				</div>
            <div class="btn-shell" id="btn-back" onclick="shellbtn_back(); ">
                <span class='btn-text'>Back</span>
            </div>
			<div class="btn-shell" id="btn-search" onclick="shellbtn_search();">
				<span class='btn-text'>Search</span>
			</div>
			<div id="shell-spinner"></div>
			<div id="panel-left-mask"></div>
			<div class="btn-shell" id="btn-shell-options">
                        <ul id="shell-options-list" class="gpu-accelerate" style="">
                                                        <li id="btn-parents-unmerged" onclick="shellbtn_parents()">
                              <span>Parent</span>
                            </li>
                                                                                                                    <li id="btn-settings" onclick="shellbtn_settings()">
                                    <span>Settings</span>
                                </li>
                                                                                        <li id="option-btn-change" onclick="shellbtn_changeuser()">
                                    <span>Change User</span>
                                </li>
                                                        <li id="option-btn-volume" onclick="shellbtn_volume()">
                                <span>Volume</span>
                            </li>
                            <li id="btn-printables" onclick="trackShellButtonClick('shell:printables'); loadPage('/html5#abc/print')">
                                <span>Printables</span>
                            </li>
                                                                                        <li id="option-3g">
                                    <div id="toggle-3g" data-speedsetting=" normal">
                                        <span id="normal-3g" class="active">Normal</span>
                                        <span id="high-3g">High</span>
                                    </div>
                                    <span>Image Resolution</span>
                                </li>
                                                    </ul>
                        <div id="shell-arrow"></div>
                    </div>
                    <span id='btn-shell-options-text'>Options</span>
                            </div>
                      <div id="activity_safety_mask" onclick="javascript:doNothing();"></div> <div id="activity_safety_mask_remove" onclick="javascript:remove_mask();">Remove Mask</div><div class="gpu-accelerate" draggable="false" unselectable="on" id="content_area">
<style type="text/css">
	* {
		margin: 0;
		padding: 0;
	}
	#maindiv{
		overflow: hidden !important;
	}
</style>


<div id="game" unselectable="on" class="unselectable" style="position: absolute; width: 900px; height: 650px; overflow: visible !important; z-index: 0;">
	
<div id="readPageAgainButton" onclick="onReadPageAgainClick();" style="display:none">
  <div> Read Page Again </div>
</div>
  <div class="borderContainer" style="float: left;" onclick="onTurnLeftPage();"></div>
  <div class="borderContainer" style="float: right;" onclick="onTurnRightPage();"></div>

  <div class="bookBg">
    <div id="version-container" align="right" style="position: absolute; right: 0px; top:0px; opacity:0.0;">
        v.1.0.22 &nbsp;&nbsp;
    </div>

    <div id="bookContainer" unselectable="on" class="unselectable resizedBook" style="font-family: 'aofl_century_gothic'; display:none">

      <div id="leftPageDiv" class="containerLeft forceHardwareRender" style=" z-index: 1;">
        <canvas id="leftPageDivCanvas" cover="true" class="bookCanvasPage" width="400" height="550" style=" z-index: 1; transform: scale(1, 1);"></canvas>
      </div>
      <div id="rightPageDiv" class="containerRight forceHardwareRender" style=" z-index: 1;">
        <canvas id="rightPageDivCanvas" cover="true" class="bookCanvasPage" width="400" height="550" style=" z-index: -1; transform: scale(1, 1);"></canvas>
      </div>
      <!-- cover containers -->
      <div id="leftCoverDiv" class="containerCoverLeft forceHardwareRender" style=" z-index: 0;">
        <canvas id="leftCoverDivCanvas" cover="true" class="bookCanvasPage" width="400" height="550" style=" z-index: 1; transform: scale(1, 1);"></canvas>
      </div>
      <div id="bottomLeftShadow" class="bottomLeftShadow front" width="182" height="520" style=" z-index: 0; visibility: hidden;"></div>
      <div id="rightCoverDiv" class="containerCoverRight" style=" z-index: 0;">
        <canvas id="rightCoverDivCanvas" cover="true" class="bookCanvasPage" width="400" height="550" style=" z-index: 1; transform: scale(1, 1);"></canvas>
      </div>
      <div id="bottomRightShadow" class="bottomRightShadow front" width="182" height="520" style=" z-index: 0; visibility: hidden;"></div>
      <!-- flip containers -->
      <div id="containerFlipLeft" class="containerLeft forceHardwareRender" style=" z-index: 2;"><!-- To apply 'style.clip' to a canvas it must be applied to a parent div, otherwise the clip wont work on Chrome, thats the reason why the canvas is inside a div, for more details -> https://code.google.com/p/chromium/issues/detail?id=242565 -->
        <canvas id="containerFlipLeftCanvas" cover="true" class="bookCanvasPage" width="400" height="550" style=" z-index: 1; transform: scale(1, 1);"></canvas>
      </div>
      <div id="containerFlipRight" class="containerRight forceHardwareRender" style=" z-index: 2;"><!-- To apply 'style.clip' to a canvas it must be applied to a parent div, otherwise the clip wont work on Chrome, thats the reason why the canvas is inside a div, for more details -> https://code.google.com/p/chromium/issues/detail?id=242565 -->
         <canvas id="containerFlipLeftCanvas" cover="true" class="bookCanvasPage" width="400" height="550" style=" z-index: -1; transform: scale(1, 1);"></canvas>
      </div>
      <div id="centerCoverBackground" class="centerCoverBackground" style="z-index: 0">
      <!-- centerCoverBackgroundCanvas close front -->
        <canvas id="centerCoverBackgroundCanvas" width="30" height="551"></canvas>
      </div>
      <div id="centerCoverBackgroundShadow" class="centerCoverBackgroundShadow" style="z-index: -7">
        <canvas id="centerCoverBackgroundShadowCanvas" class="centerCoverBackgroundShadowCanvas close front" style="position: absolute" width="10" height="540"></canvas>
      </div>


      <canvas id="centerShadow" style="position:absolute; z-index: 3; opacity: 0;" width="80" height="540"></canvas>
      <canvas id="centerShadowFlipAnimation" style="position:absolute;" width="80" height="520"></canvas>
      <canvas id="reflectionLightFlipAnimation" style="position:absolute;" width="10" height="520"></canvas>
      <canvas id="borderShadowFlipAnimation" style="position:absolute;" width="22" height="520"></canvas>

      <div id="centerCoverClosed" class="centerCoverClosed">
        <canvas id="centerCoverClosedCanvas" style="position:absolute; top: 2px; pointer-events: none;" width="600" height="680"></canvas>
      </div>

      <div id="leftPageSideBorder" style="overflow:hidden; z-index: 0; display:block; position: absolute; left: 10px; top: 9px;">
        <canvas id="leftPageSideBorderCanvas" width="30" height="729"></canvas>
      </div>
      <div id="leftPageBottomBorder" style="overflow:hidden; z-index: 0; display:block; position:absolute; top: 525px;">
        <canvas id="leftPageBottomBorderCanvas" style="" width="592" height="30"></canvas>
      </div>

      <div id="rightPageSideBorder" style="overflow:hidden; z-index: 0; display:block; position: absolute; left: 780px; top: 5px;">
        <canvas id="rightPageSideBorderCanvas" style="" width="30" height="729"></canvas>
      </div>

      <div id="rightPageBottomBorder" style="overflow:hidden; z-index: 0; display:block; position: absolute; top: 525px;">
        <canvas id="rightPageBottomBorderCanvas" style="" width="592" height="30"></canvas>
      </div>

    </div><!-- / #bookContainer -->

    <div class="highlight-backdrop" id="settingsBoxBackdrop" onclick="onOpenCloseSettingsBox(event);" style="visibility: hidden"></div>

    <!-- box colors -->
    <div class="settingsBox blue hide" id="settingsBox">


      <div class="boxBody">
        <ul class="list-color">
          <li>
            <div class="link yellow" onclick="settingsPopup.onSelectHighlightColor(event);" color="fdf558"></div>
          </li>
          <li>
            <div class="link green" onclick="settingsPopup.onSelectHighlightColor(event);" color="a0cb69"></div>
          </li>
          <li>
            <div class="link pink" onclick="settingsPopup.onSelectHighlightColor(event);" color="f0666e"></div>
          </li>
          <li>
            <div class="link blue" onclick="settingsPopup.onSelectHighlightColor(event);" color="8eceec"></div>
          </li>
          <li>
            <div class="link white" onclick="settingsPopup.onSelectHighlightColor(event);" color="ffffff"></div>
          </li>
          <li>
            <div class="link off" onclick="settingsPopup.onSelectHighlightColor(event);" color="000000" style="center no-repeat;">
              <img class="list-off" style="pointer-events:none" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAB3RJTUUH4AYCESM35CmXIAAAABd0RVh0U29mdHdhcmUAR0xEUE5HIHZlciAzLjRxhaThAAAACHRwTkdHTEQzAAAAAEqAKR8AAAAEZ0FNQQAAsY8L/GEFAAAABmJLR0QAAAAAAAD5Q7t/AAAEfklEQVR4nL1ZSU9UQRDuMUpQFhf05lU9IKJe4OYKMRhFoyc3UCKi/Aqi4JJ4QEy4eNKEKEHjYcYFMiQKQtyXeEIDI5qAcvGgTIDos77paqbm8WbmvZl5VvIldL+uqo/uqupllPIgZYQOwiTBUmoN4RDhIuEeYZjwkTHMfW08ZvUk65Z5cehWKgkhTWoZ4QShnzBLsFwCY8OE47ARYptZy0pCpyaWRzhH+Org/BdhhPCEEGQ84b5fDuPH2VZeJ/vISCoIEU1uK+GNzckEoZ2wbVapohEaFyTcIHTx3+ijb8UYw2MnbTZew3aEfXmSGkJUqQAZaCJEhdEx7isI05g6QkkKOyU8Jqz/0QLWjQh704TGKPt0TW5aqUUc/H9FDKFd2K10oAc8/MMB1unWRAsJl0QMw0crfKYliamOaiNtgtwPwu4J6q/ySMyJKGz81D72EOYkyahKsdwI1ohWPCPIIdZKsURrsyAm5ZCKxeZisnvTFpN/sNwRlSRxOFu3clyYmSvto/783JJbQnZvJSlH8L2l065YqeZLiclWxEdV2B9y9pkb5+QxMfkKXBLqJBfhs0LpImIux8uajNy6Oe3/suhvChnlMv1xKQ+2uAwUVv0fcut76PtezaFIlKAv4BTbFjv0x+NC8SzKQTbZ6oIcCGwAuSXsK6gWrOJRcDMbf7/I2sJcbOgiW+0JkUDOCK8kaqTZcfrADZ2rRYC2h1X2s5eilIw7kVPsc0jz6RCJWoKOg8LAtjp/ya13ImekXhPcIXRq0dHKjd/Y3FPtrS7JOdW5WLamIgcp0frLwYX1LoDgXW58GskNOc8zJ+Wbis3iKOt2o/GMGwNBf8ilnTkpnM2DrD+IxgduPOjKPTnXM2fkvib4iG28y4pgmjrnmZwg+JDtvM94ib3WObfitMQ93PjsNkmyKSXpxClJPJUZP8mJMmOOfOdB8IBwsr0+PbmM61w6gW+ys9NeqOVWdw3bjdNWl8tS4iRiq7vOdmcIq8xhoY87sVEX2Q8LfpODVKj5I9cU2+4dxQc+bh0TTs8FVXwWc13nnAS++jWPZmH/SOy4JQ6sX0SZKK5KTS7jOucktZpDsZV4aM6fX0k+8p8RBK78VP7UObvgWjGh/V8VPhpDcpC4NL204mexGj+XFYILGb86VFvxO/ILy35pgvC1c7MVP+rM+U2uT/vcKBIDvssXXDsh4uLeYOlLtC/ZCsGyhuPkzBEfPk9FVIoXr01q/unjvBV/XYhdA3E1PKyyf/pAQnDMVYuZg6+WKHNIKfx4FGCSZiYRk1eQaSgHFR6JBliHS0kxJ8ScmLkW+PT0wsUz2SBi0iw1alURqn69Sv/8hjFDcWLNopSYmDvp6fnNCKY6og2Xc2bJmPxu6S1pJzZ3nECCNqCPvq2gMbt47JTNxnPCpohysazJRDwBo1g3WomPjwY4eYxZ+lz5mDHEfdMO49F/GjazegKWIh7R8wlHCL2W3sztzpNhholDNz9nj+h2sf0MsYqwn5PpDmGA8JbxlHCbv+0jrBxVmf0M8Q/QWFiklPiRGwAAAABJRU5ErkJggg==' color="000000"/>
            </div>
          </li>
        </ul>
      </div>
      <div class="boxArrow"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAUCAMAAAD1Cu7vAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAANoaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDI4MDExNzQwNzIwNjgxMTgwODNDRkRFRERDOTlGOUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEE2NjY3N0E2RUFFMTFFNTg5OUFEOTQ4QkVDN0E0MTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEE2NjY3Nzk2RUFFMTFFNTg5OUFEOTQ4QkVDN0E0MTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQ0ZERUREQzk5RjlDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQ0ZERUREQzk5RjlDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+UEedggAAAMBQTFRFTGlxAH7/AH7/AH7/AH3/AH7/AH7/gNf/gNf/I5L/AH7/AH7/AH7/hNr/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/AH7/PKf/BoH/AH7/AH7/gNf/gdj/AH7/AH3/AHv/AHn/g9r/hNv/AHf/it7/h93/htz/G5D/W77/R7D/e9T/D4f/LZ7/ZsX/OKX/JZj/gNb/bcv/C4P/T7b/dM//edL/Qar/ZMT/Q+SOywAAACN0Uk5TAHPonPYeAvj2C8Ev8vdKY9cR48oHgShWjPuvQT64qPb1ExTWKtWMAAABXElEQVQ4y5WR6XaCMBBGR0EsCO773prJYhBcQHHt+79Vo55ylIrV+y8n+U7ufANwwYwcQZJMJndH4Qjz+hoKlt7Rx6Mw7+STfCRwxGisd+xuDuBLs5FKP/TE5CnCCwNO0W5fvyuVEeVqcfRIeoRMl/uVRCy34FexqyPnwSH9M+IdAs5R7zYhxmxkkUl/HqWkxOR7IzlmG3W4pWgh5Xh6qEi85WKnxqkVIUFOsylnQSiSsUhMD2vKqT5swh8M1QeVq72Y3aWI6819zrCaMeER/YFK4Xrr3kxGZmSxk4/UYkXVB1d9uLO4ATcMUKKuNSGVequmWlQrc68Zz5378qxWgWcUNNUi21wUiXc8rVTGKsI/VDJKkfv7aCrc7Yappp+pxfTUyhiuj+LSWrZUgVfItTvI6Ga9YxStvgGvYbbUyhhjiO0cvIxRGJ4VqyUT3qGSsXFQMOA9jF7mM+3uB56XSTjHRbBmAAAAAElFTkSuQmCC"/></div>
    </div>

    <div id="hud" unselectable="on" class="unselectable hide" onclick>
      <div onclick="hud.hideShow(event);" class="hudControl"><i></i></div>
      <div id="playPauseCheckbox" onclick="hud.playPauseCheckbox.onElementClick(event);" class="HUDButton delay1">
          <div class="checked playPauseButton" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/theme/play_icon.png')  center no-repeat;"></div>
          <div class="unchecked playPauseButton" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/theme/pause_icon.png') center no-repeat;"></div>
      </div>

      <div class="bookProgressSlider delay2" id="bookProgressSlider">
        <div id="background_fill_0">
          <div id="background_fill_1" style="pointer-events: visible;">
            <div id="background_fill_2">
                <div id="foreground-fill" class="foregroundFill" style="pointer-events: none;">
                </div>
            </div>
          </div>
        </div>
        <div id="progressCircle" class="progressCircle" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/icons/player_slider_grip.png') center no-repeat;" width="30" height="30"></div>
        <span id="progress-currentTime" class="progressTime init"></span>
        <span id="progress-totalTime" class="progressTime fim"></span>
      </div>

      <div id="slowerButtonContainer">
        <div id="slowerButton" class="HUDButton delay3" onclick="onNormalSlowerCheckboxStateChangeEvent(event)"></div>
        <div id="slowerButtonHoverShadow" class="hoverShadow"></div>
      </div>

      <div id="fasterButtonContainer">
        <div id="fasterButton" class="HUDButton delay3" onclick="onNormalSlowerCheckboxStateChangeEvent(event)" style="display: none;"></div>
        <div id="fasterButtonHoverShadow" class="hoverShadow"></div>
      </div>

      <div id="pauseToreadContainer">
        <div id="pauseToread" class="HUDButton delay4" onclick="onPauseAfterPageStateChangedEvent(event)">
          <div id="feedbackShadow"></div>
        </div>
        <div id="pauseToreadHoverShadow" class="hoverShadow"></div>
      </div>

      <div id="glossaryButtonContainer">
        <div id="glossaryButton" onclick="onGlossaryClick(event);" class="HUDButton delay5" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/theme/glossary_icon.png') center no-repeat;"></div>
        <div id="glossaryButtonHoverShadow" class="hoverShadow"></div>
      </div>

      <div id="settingButtonContainer">
        <div id="settingButton" onclick="onOpenCloseSettingsBox(event);" class="HUDButton delay6" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/theme/highlighter_icon.png') center no-repeat;"></div>
        <div id="settingButtonHoverShadow" class="hoverShadow"></div>
      </div>

      <div id="loadingSpinner" unselectable="on" class="unselectable maskContainer">
        <img src="data:image/png;base64,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">
      </div>
    </div> <!-- / #hud -->

  </div> <!-- / .bookBg -->
  <div id="settingsPopUpMask" unselectable="on" class="unselectable maskContainer" style="visibility: hidden">
    <div id="settingsPopUp" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/background_settings.png')  center no-repeat;">
      <div id="closeSettingsPopUpButton" onclick="settingsPopup.onClosePopUp(event);" class="closeButton" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/close_botton.png') center no-repeat; left: 450px;"></div>

      <div id="highlightContainer">
            <div id="highlightColor">
              <p class="titleText">Select Highlight Color</p>
              <div id="colorHighlightPanel">

                 <div class="circleColorContainer" style="left: 0px;">
                    <div class="circleColorBackGround" style="background-color: #FFFFFF;"></div>
                    <div class="colorHighLight" onclick="settingsPopup.onSelectHighlightColor(event);" color="FFFFFF" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/white_circle.png')center no-repeat;">
                         <div id="colorCheckBox" class="checkBoxIcon checkElement" style="visibility: hidden; background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/check_mark.png')   center no-repeat;"></div>
                    </div>
                 </div>

                 <div class="circleColorContainer" style="left: 65px;">
                    <div class="circleColorBackGround" style="background-color: #FEF667;"></div>
                    <div class="colorHighLight" onclick="settingsPopup.onSelectHighlightColor(event);" color="FEF667" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
                 </div>

                 <div class="circleColorContainer" style="left: 127.5px;">
                    <div class="circleColorBackGround" style="background-color: #F0666E;"></div>
                    <div class="colorHighLight" onclick="settingsPopup.onSelectHighlightColor(event);" color="F0666E" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
                 </div>

                 <div class="circleColorContainer" style="left: 194px;">
                    <div class="circleColorBackGround" style="background-color: #6AC541;"></div>
                    <div class="colorHighLight" onclick="settingsPopup.onSelectHighlightColor(event);" color="6AC541" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
                 </div>

                 <div class="circleColorContainer" style="left: 255px;">
                    <div class="circleColorBackGround" style="background-color: #A6E7FF;"></div>
                    <div class="colorHighLight" onclick="settingsPopup.onSelectHighlightColor(event);" color="A6E7FF" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
                 </div>

              </div>
              <div id="sampleTextContainer" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/sample_text_frame.png')  center no-repeat;">
                <div id="sampleTextMaskBackGround"></div>
                <div id="sampleTextBackGround"></div>
                <p id="sampleText">Sample Text</p>
              </div>
            </div>
            <div id="brightness">
              <p class="titleText">Brightness</p>
              <div id="brightnessSlider" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/brightness_slider_line.png')   center no-repeat;">
                <div id="brightnessProgressCircle" class="progressCircle" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/toolbar_slider-ball.png') center no-repeat;"></div>
              </div>
            </div>
      </div>

      <div id="playSpeed">
          <p class="titleText">Play Speed</p>
            <p id="normalText">Normal</p>
            <div id="normalSpeed" isNormal="true" onclick="settingsPopup.selectPlaySpeed(event);" class="colorHighLight" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/white_circle.png')   center no-repeat;">
                 <div id="playSpeedCheckBox" class="checkBoxIcon" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/check_mark.png')   center no-repeat;"></div>
            </div>
            <p id="slowText">Slow</p>
            <div id="slowSpeed" isNormal="false" onclick="settingsPopup.selectPlaySpeed(event);" class="colorHighLight" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/white_circle.png')   center no-repeat;"></div>
      </div>
      <div id="pauseAfterPage">
          <p class="titleText">Pause After Page</p>
          <div id="pauseAfterPageCheckBox" onclick="settingsPopup.pauseAfterPageCheckBoxElement.onElementClick(event);">
            <div class="unchecked pauseAfterPageIcon" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/check_box.png') center no-repeat;"></div>
            <div class="checked pauseAfterPageIcon" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/check_mark_square.png')   center no-repeat;"></div>
          </div>
      </div>
      <div id="favorite">
          <p class="titleText">Add To Favorite</p>
          <div id="favoriteCheckBox" onclick="settingsPopup.onAddToFavoriteButton(event);">
            <div class="unchecked favoriteIcon" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/heart_icon_empty.png') center no-repeat;"></div>
            <div class="checked favoriteIcon" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/heart_icon.png')   center no-repeat;"></div>
          </div>
      </div>
      <div id="translation">
         <p class="titleText">Translation</p>
          <div id="translationButton" onclick="settingsPopup.onTranslationButton(event);" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/translation_icon.png') center no-repeat;"></div>
      </div>
      <div id="UIColor">
         <p class="titleText">HUD Color</p>
          <div id="UIColorButton" onclick="settingsPopup.onOpenUIColorPopUp(event);" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/UI_color_icon.png')   center no-repeat;"></div>
      </div>
    </div>
  </div>

  <div id="UIColorPopUpMask" unselectable="on" class="unselectable maskContainer" style="visibility : hidden;">
    <div id="UIColorPopUp" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/change_color_popup/ui_color_frame.png') center no-repeat; ">
       <div id="closeUIColorPopUpButton" onclick="settingsPopup.UIColorPopUp.onCloseUIColorPopUp(event);" class="closeButton" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/close_botton.png') center no-repeat; left: 280px;"></div>
       <p id="selectHUDText">Select HUD Color</p>


        <div class="circleColorContainer" style="left: 35px; top: 60px;">
            <div class="circleColorBackGround" style="background-color: #669999;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="669999" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
        </div>

        <div class="circleColorContainer" style="left: 90px; top: 60px;">
            <div class="circleColorBackGround" style="background-color: #FDF558;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="FDF558" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
        </div>

        <div class="circleColorContainer" style="left: 146px; top: 60px;">
            <div class="circleColorBackGround" style="background-color: #F0666E;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="F0666E" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
        </div>

        <div class="circleColorContainer" style="left: 200px; top: 60px;">
            <div class="circleColorBackGround" style="background-color: #A0CB69;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="A0CB69" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
        </div>

        <div class="circleColorContainer" style="left: 255px; top: 60px;">
            <div class="circleColorBackGround" style="background-color: #8ECEEC;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="8ECEEC" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;">
                 <div id="colorHUDCheckBox" class="checkBoxIcon checkElement" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/check_mark.png')   center no-repeat;"></div>
            </div>
        </div>

        <div class="circleColorContainer" style="left: 35px;  top: 120px;">
            <div class="circleColorBackGround" style="background-color: #b93ecd;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="b93ecd" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
        </div>

        <div class="circleColorContainer" style="left: 90px;  top: 120px;">
            <div class="circleColorBackGround" style="background-color: #3e3e3e;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="3e3e3e" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
        </div>

        <div class="circleColorContainer" style="left: 146px; top: 120px;">
            <div class="circleColorBackGround" style="background-color: #ff5a00;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="ff5a00" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
        </div>

        <div class="circleColorContainer" style="left: 200px; top: 120px;">
            <div class="circleColorBackGround" style="background-color: #e61c33;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="e61c33" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
         </div>

        <div class="circleColorContainer" style="left: 255px; top: 120px;">
            <div class="circleColorBackGround" style="background-color: #1dc6e5;"></div>
            <div class="colorHighLight" onclick="settingsPopup.UIColorPopUp.onSelectHUDColor(event);" color="1dc6e5" style="background: url('http://localhost/photobook/public_html/bookPlayer/artmin/html5/bookplayer/settings_popup/circle_default.png')center no-repeat;"></div>
        </div>
    </div>
  </div>

  <div id="glossaryMask" unselectable="on" class="unselectable">></div>


</div>

</div>            <canvas id="timer_settings_canvas" onclick="showTimeLeft();" width="40" height="40" style="position:absolute;right:5px;top:5px;cursor:pointer;"></canvas>

                    <div draggable="false" unselectable="on" id="small_screen" onClick="doNothing()"></div>
                <div draggable="false" unselectable="on" id="large_screen" onclick="doNothing();"></div>


<div draggable="false" unselectable="on" id="sidepaneldiv">
		<div id="sidepanel_wrapper_ticketmachine" class="sidepanel-wrapper sidepanel-wrapper-right" style="width:403px; height:650px; left:1010px; top:0px;">
			<div class="sidepanel-icon gpu-accelerate" id="sidepanel_icon_ticketmachine" style="padding:0px; background-color:transparent; height:116px; width:58px; top:0px; left:-58px;">
			<img class="sidepanel-icon-img" id="sidepanel_icon_img_ticketmachine" src="http://localhost/photobook/public_html/bookPlayer/artmin/blank.png" width="100%" height="100%"/>
			</div>
			<div class="sidepanel-content" id="sidepanel_content_ticketmachine">
<div id="tm_counter_wrap" class="gpu-accelerate">
    <div id="tm_counter"></div>
</div>
<div id="tm_nav">
    <div id="tm_nav-favorite" class="tm_nav-item">
        <div class="tm_nav-icon"></div>
        <div class="tm_nav-label deboss">Favorite</div>
    </div>
    <div id="tm_nav-more" class="tm_nav-item">
        <div class="tm_nav-icon"></div>
        <div class="tm_nav-label deboss"></div>
    </div>
    <div id="tm_nav-shopping" class="tm_nav-item">
        <div class="tm_nav-icon"></div>
        <div class="tm_nav-label deboss">Go Shopping</div>
    </div>
    <div id="tm_nav-learningpath" class="tm_nav-item">
        <div class="tm_nav-icon"></div>
        <div class="tm_nav-label deboss">Learning Path</div>
    </div>
</div>
<div id="tm_btn-continue"><div id="tm_btn-continue-label">Continue</div></div>
<div id="tm_msg"></div>
<div id="tm_avatar_wrap">
    <div id="tm_avatar"></div>
</div>
<div id="tm_btn-replay"><div id="tm_btn-replay-label" class="deboss">Play Again</div></div>

			</div>
		</div>


		</div><div draggable="false" unselectable="on" id="popupdiv"></div><div id='headerText' style='display:none;'>  <table cellpadding='0' cellspacing='0' border='0' style='display:inline-block;'>      <tr>          <td width='23' height='60'><img id='left_header_holder' style="float: right; margin-right: -1px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAA8CAMAAAC6n9FnAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADAUExURQAAAAAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagM+qgAkahVWvDhrwTRowCJevitjvy9mwCZgvx1bvgEwiBFUvBlZvTxtwkBwwg1SvERywgpQu0h0w0t2wwdOuwRMu013wwNFs094xAEodAoxegM7pQQ1jwNBrhRDlxNAkQI5nwEtggJEsgAlbQpLtkFtvDRjtQI4nEpzvj1nsydPmzBZpZDeT3gAAAAUdFJOUwBwpe/pJVt5yI9drVD3mIQQgwVhKf6dggAAAPpJREFUOMvV1GlTwjAQgOEgoNxnA6goh9ylUEAB8eD//yt20y1ptul3eD8xT0tmMrNbIe6uRimfS0vqqtl6RkYKOVWW0uIPUtq8qH6v/v9+l5TiPKp3ni50yAX18vc0GnpO8cQI+BH4cBqZgVfAd0MWON7nNGDBRfH0Nk+IJh7T4QnxBL595ZG/8Mi7vMB3z7zA/Tde4O99HvmxxSLf9FjkjvthFrpzHBtd3XFn0bQ7G3euizg+2u/dINN1t+epBMdx+7I4zo9ncTVvnxav2A6ieY79IZx/bx13tS/sgd6vgx9z2kfP/1mbnrS/ifsO165avw9Qzfo9uZEu905drMrxJAwAAAAASUVORK5CYII="/></td>          <td id='mid_header_holder' height='60' style='background-image:url("http://localhost/photobook/public_html/bookPlayer/artmin/html5/header_center.png");background-repeat:repeat-x;font-size:28px;color:white;'></td>          <td width='23' height='60'><img id='right_header_holder' style="float: left; margin-left: -1px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAA8CAMAAAC6n9FnAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADAUExURQAAAAAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagAkagM+qgAkahVWvDhrwTRowCJevi9mwCtjvyZgvx1bvgIyjBFUvBlZvUBwwjxtwg1SvERywgpQu0h0w0t2wwdOuwRMu013wwJFs094xAEodAoxegM7pQNBrgZItBVFmgI5nwAlbQEtgkFtvDRjtStUoAs9lgI4nA5NthlDkUpzvj1nswEwhxRAjyxHhp4AAAATdFJOUwDHm1CRXfWI63KtJYRbJxCpymG1lr3TAAAA8klEQVQ4y9XUxYLCMBCA4WCLL5Lgzi5eoLjD+78VkSlpprlwg//4DdJCpoR8SQxKhOIRm8tZJm11xn6SdmcsDD6DrrfDXA5Syie64cERg6j0ob+dfEtM+MBIDkLC/8z2Gz7Icu+iLnBNPdRe3B/3Mk58wy8hFdyDe5GQGm7Fnf8adZzwOCENHHgVd1TexIF3cC3lJdQZvI1agvfNXAr+b+RSz0f+pvTlY527pNqnXhK1U9y3+F39vwHfqgMXcEedH8xrOG+2jwkHfe0tgMkLxzv/QVb7YtzSRu/X66WnluPfR7y/+Tf23fZ8SBSikdznPvae9o5aElonCN8AAAAASUVORK5CYII="/></td>      </tr>  </table></div><img src="http://localhost/photobook/public_html/bookPlayer/artmin/html5/back_button.png" class="full-screen-back-button" onclick="clickBack()">        <div id="clickping" style="position:absolute;display:none;width:20px;height:20px;overflow:hidden;pointer-events:none;">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAUCAMAAAD/eoL4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACTUExURQAAAP7+/v////////////////////////////////////////////7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z7A5ukAAAAxdFJOUwCaAQIyT3EDDRwHCQTJEgwVJRkFaSsKMBYPHztNSieIDkBUNyhzHViQIkWjf6+WvH289eoaAAACNUlEQVRIx82XeVOzMBCHIRwh3FCO2sNWa1v1PfT7fzpDCGE3YXQ6iu3z52/amTzZLNlY1nUhIWeBojgSxAT8yqECh1i3QFZyUgqSMGWCZTZqNIEkU35SQ6j89qLTe04ZgySv3R6mVO6YIpd7HQaAxvDgzLnqnK8khEG09gSvqYqYq3gaKsQA/S/jABGZHjPWZP/oc6oXcMq33sBgkrqAlYgaxnQTkmGRgJeUUDqHCauOx6qASVj5PUxFD8rD24pNtWgLRdyuJUiJRbqaRppHd7iowU90fPRsd0CTs/Twq71MTh6gFVGJPNzu/3vNg+WWFRjExBS5vCR+kvzHyVF42LsxaX3FRkZrKOKJ6AmLuLxll7oII7EpEjmmyMX9nr0lSeKig2VLWhVtRpFKRsij7xLNoztbhgcLFxMi9GKRv//05Mw9kh1MikFko6LHUcS/DZHVSk/KTuT8RUVuT2SCXZL8yXDSezx/2iMPSCT+Vo+EP9EjfCMLLWj1kzV+fcfv7wv0OPTlxh41vtblnGKRub5aU/fIu23je6QePF4n7sPhRlxgkS6kugi/MxpDZK57ZHJA6WtSg+YaPYZ0pRfEKMmyk9M9FsaEMuvcWB8O7R6NjLJNtqchoQXw6G97grqkFLNuZFzsZkl+dZSPT2uOXLEsnJq0hmYlKaiHDJFJIzafXNFjEpoXHAbl7kptiufdpM2++vx7G08r84GY5Rz02KKyKBF4zDhXe1d9s3bmzhOHQz4pxwf+GTZR7LXGVwAAAABJRU5ErkJggg==">
        </div>

            </div><!--enf maindiv-->


    </div><!-- end content-wrapper-->
        </body>
        </html>
    