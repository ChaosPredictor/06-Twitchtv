var listOfChannels = ['storbeck', 'freecodecamp', 'twistgaming'];

$(document).ready(function(){
	checkAllList(listOfChannels);
});

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


