var listOfChannels = ['storbeck', 'freecodecamp', 'twistgaming'];

$(document).ready(function(){
	startup();

	checkAllList(listOfChannels);

	checkInput();

	printItem();
});

function startup(){
	$(".list-item").hide();
}

function requestToTwitch(channel) {
	$.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?', function(data) {
		return data;
	});
}

function checkAllList(list){
	for(var i = 0; i < list.length; i++) {
		console.log(list[i]);
	}
}

function printItem(){
	var $origItem = $( ".list-item" ).first();
	$item = $origItem.clone();
	$item.appendTo( "#SelectList" );
	$item.find("h3").text("Title");
	$item.find("p").text("text");
	$item.find("a").attr("href", "link");
	$item.show();
}

function checkInput() {
	var timeout;
	$("#SearchBox").on("keyup", function () {
		var userInput = $("#SearchBox").val();
		window.clearTimeout(timeout);
		timeout = window.setTimeout(function() {
			showOnlyOptionsSimilarToText($("#SelectList"), userInput, true);
		}, 500);

	});
}

var showOnlyOptionsSimilarToText = function (selectionEl, str, isCaseSensitive) {
    if (typeof isCaseSensitive == 'undefined')
        isCaseSensitive = true;
    if (isCaseSensitive)
        str = str.toLowerCase();

    var $el = $(selectionEl);

    $el.children("li:selected").removeAttr('selected');
    $el.val('');
    $el.children("li").hide();


	$el.children("li").filter(function () {
		var text = $(this).text();
		var id= $(this).attr('id');
		if (isCaseSensitive)
			text = text.toLowerCase();
		if (text.indexOf(str) > -1){
			if (id != "o2") {
				return true;
			}
		}
			//return true;
		return false;
	}).show();

};
