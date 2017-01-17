var listOfChannels = ['storbeck', 'freecodecamp', 'twistgaming'];

$(document).ready(function(){
	checkAllList(listOfChannels);
	
	$("#o2").hide();

	//checkInput();
	checkInput2();
});

function checkInput() {
	var timeout;
	$("#SearchBox").on("keyup", function () {
		var userInput = $("#SearchBox").val();
		window.clearTimeout(timeout);
		timeout = window.setTimeout(function() {
			showOnlyOptionsSimilarToText($("#SelectBox"), userInput, true);
		}, 500);

	});
}

function checkInput2() {
	var timeout;
	$("#SearchBox").on("keyup", function () {
		var userInput = $("#SearchBox").val();
		window.clearTimeout(timeout);
		timeout = window.setTimeout(function() {
			showOnlyOptionsSimilarToText2($("#SelectList"), userInput, true);
		}, 500);

	});
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


var showOnlyOptionsSimilarToText = function (selectionEl, str, isCaseSensitive) {
    if (typeof isCaseSensitive == 'undefined')
        isCaseSensitive = true;
    if (isCaseSensitive)
        str = str.toLowerCase();

    var $el = $(selectionEl);

    $el.children("option:selected").removeAttr('selected');
    $el.val('');
    $el.children("option").hide();


	$el.children("option").filter(function () {
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

var showOnlyOptionsSimilarToText2 = function (selectionEl, str, isCaseSensitive) {
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
