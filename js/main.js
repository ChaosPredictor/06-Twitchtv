var listOfChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", 'storbeck', 'twistgaming'];

$(document).ready(function(){
	startup();

	checkAllList(listOfChannels, true, true);

	checkInput();

	//printItem();
	//
	$('#checkbox-on').change(function(){
		removeAll();
		checkAllList(listOfChannels, this.checked, $('#checkbox-off'));
	});
	$('#checkbox-off').change(function(){
		removeAll();
		checkAllList(listOfChannels, $('#checkbox-on'), this.checked);
	});
});

function startup(){
	$(".list-item").hide();
}

function removeAll() {
	var $items = $("#SelectList").children();
	for (var i = 0; i < $items.length; i++) {
		$items[i].remove();
	}
}

function requestToTwitch(channel, onStatus, offStatus) {
	$.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?', function(data) {
		//console.log(data);
		//console.log(data["stream"]["game"]);
		if (data["stream"] && onStatus) {
			printItem(channel,"Online, run: " + data["stream"]["game"],"https://www.twitch.tv/" + channel, true);
		} else if (offStatus) {
			printItem(channel,"Offline","https://www.twitch.tv/" + channel, false);
		};
	});
}

function checkAllList(list, onStatus, offStatus){
	for(var i = 0; i < list.length; i++) {
		var data = requestToTwitch(list[i], onStatus, offStatus);
	}
}

function printItem(name, text, link, on){
	var $origItem = $( ".list-item" ).first();
	var $item = $origItem.clone();
	var t = on;
	$item.appendTo( "#SelectList" );
	$item.find("h3").text(name);
	$item.find("p").text(text);
	$item.find("a").attr("href", link);
	console.log(on);
	if (t) {
		$item.find("p").css("color", "green");
	} else {
		$item.find("p").css("color", "red");
	};
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
