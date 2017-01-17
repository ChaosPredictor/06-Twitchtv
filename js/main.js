var listOfChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", 'storbeck', 'freecodecamp', 'twistgaming'];

$(document).ready(function(){
	startup();

	checkAllList(listOfChannels);

	checkInput();

	//printItem();
});

function startup(){
	$(".list-item").hide();
}

function requestToTwitch(channel) {
	$.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?client_id=3ayqtffruo2goxf0cvyp75wjm28g4pq&callback=?', function(data) {
		console.log(data);
		console.log(data["stream"]["game"]);
	});
}

function checkAllList(list){
	for(var i = 0; i < list.length; i++) {
		var data = requestToTwitch(list[i]);
		printItem(list[i]);
		//console.log(data);
		//var obj = JSON.parse(data);
		//console.log(data);
		//console.log(obj);
		//console.log(data["responseJSON"]);
	}
}

function printItem(name, text = "none", link = "none"){
	var $origItem = $( ".list-item" ).first();
	$item = $origItem.clone();
	$item.appendTo( "#SelectList" );
	$item.find("h3").text(name);
	$item.find("p").text(text);
	$item.find("a").attr("href", link);
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
