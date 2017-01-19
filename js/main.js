var listOfChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "comster404", "habathcx", "RobotCaleb", "noobs2ninjas", 'storbeck', 'twistgaming'];
var on = true;
var off = true;

$(document).ready(function(){
	startup();

	checkAllList(listOfChannels);

	checkInput();

	showOnlyOptionsSimilarToText($("#SelectList"), "", true);
	//printItem();
	//
	$('#checkbox-on').change(function(){
		if (this.checked) {
			console.log("on true");
			on = true;
		} else {
			console.log("on false");
			on = false;
		};
		var userInput = $("#SearchBox").val();
		showOnlyOptionsSimilarToText($("#SelectList"), userInput, true);
	});
	$('#checkbox-off').change(function(){
		if (this.checked) {
			console.log("off true");
			off = true;
		} else {
			console.log("off false");
			off = false;
		};
		var userInput = $("#SearchBox").val();
		showOnlyOptionsSimilarToText($("#SelectList"), userInput, true);
	});
});

function startup(){
	$(".demo-item").hide();
	$('#checkbox-on').prop('checked', true);
	$('#checkbox-off').prop('checked', true);
}

function removeAll() {
	var $items = $("#SelectList").children();
	for (var i = 0; i < $items.length; i++) {
		$items[i].remove();
	}
}

function requestToTwitch(channel) {
	

	$.getJSON('https://api.twitch.tv/kraken/channels/' + channel + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?', function(data1) {
	if (data1["status"] != "404") {
		$.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?', function(data2) {
			console.log(data2);
			//console.log(data["stream"]["game"]);
			if (data2["stream"]) {
				printItem(channel,"Online, run: " + data2["stream"]["game"],"https://www.twitch.tv/" + channel, "green");
			} else {
				printItem(channel,"Offline","https://www.twitch.tv/" + channel, "yellow");
			};
		});
	} else {
		printItem(channel,"Channel not found","https://www.twitch.tv/" + channel, "red");
	}});
}

function checkAllList(list){
	//console.log(onStatus);
	for(var i = 0; i < list.length; i++) {
		var data = requestToTwitch(list[i]);
	}
}

function printItem(name, text, link, on){
	var $origItem = $( ".demo-item" );
	var $item = $origItem.clone();
	$item.removeClass("demo-item");
	$item.addClass("list-item");
	$item.appendTo( "#SelectList" );
	$item.find("h3").text(name);
	$item.find("p").text(text);
	$item.find("a").attr("href", link);
	if (on == "green") {
		$item.addClass( "item-on" );
		$item.find("p").css("color", on);
	} else {
		$item.addClass( "item-off" );
		$item.find("p").css("color", on);
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
			//console.log(on);
			if (on == true && $(this).hasClass("item-on")) {
				console.log("item is on");
				return true;
			} else if (off == true && $(this).hasClass("item-off")) {
				console.log("item is off");
				return true;
			}
			//return true;
		}
			//return true;
		return false;
	}).show();

};
