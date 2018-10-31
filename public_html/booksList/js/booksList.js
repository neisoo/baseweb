//@ sourceURL=http://localhost/photobook/public_html/booksList/js/booksList.js

$(document).ready(function(){
	display_element('loading_div',false);

	var nowTop = $(document).scrollTop();
	$('#top_panel').css({
		position:'fixed',
		top:0,
	});

	var height = $('#top_panel').outerHeight(true);
	$("#head_padding").height(height);

	$(window).scroll(function() {
		var nowTop = $(document).scrollTop();
		$('#top_panel').css({
			position:'fixed',
			top:0,
		});

		var height = $('#top_panel').outerHeight(true);
		$("#head_padding").height(height);
	});
	
});

function onClickBook(id)
{
	display_element("top_panel",false);
	getOutput('bookPlayer/html5/bookPlayer.php?cid=' + encodeURI(id));
}