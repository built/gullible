//-------|---------|---------|---------|---------|---------|---------|---------|---------|
var addPortraitToDictionary = function(info) {

	var definition = $(info.target_selector);

	if(definition == null) return; // Can't figure out where to display portrait.

	var portraitSize = {width: 150, height: 150};

	var top = definition.position().top + (info.position_offset.top || 0);
	var left = definition.position().left + definition.width() - (portraitSize.width + (info.position_offset.right || 0));

	if(definition){
		definition.append(
			template
			.replace(/WIDTH/g, portraitSize.width)
			.replace(/TOP/g, top)
			.replace(/LEFT/g, left)
		);
	}
}

var displayPortrait = function() {

    chrome.storage.local.get("portrait_url", function(data) {

		if("portrait_url" in data) {
			$('#gullible_portrait').show();
			$('#gullible_portrait_url').attr('src', data["portrait_url"]);
		}

    });
}

var template = "<div id='gullible_portrait' style='text-align: center; width: WIDTHpx; \
position: absolute; top: TOPpx; left: LEFTpx; display: none;'>\
<img id='gullible_portrait_url' width='WIDTH' src=''/><br/>Example</div>";

var supportedDictionaries = {
	"www.google.com" : { 
		"must_match": ["gullible"],
		"target_selector": "li.dct",
		"position_offset": { "right": 20}
	},
	"dictionary.reference.com": {
		"must_match": ["/browse/gullible"],
		"target_selector": "#rpane",
		"position_offset": { "top": 10, "right": 20}
	}
}

var isGullible = function(info) {
	return _.all(info.must_match, function(substring){
		return document.location.href.indexOf(substring) > -1;
	});
}

$(function() {

	if(document.location.hostname in supportedDictionaries) {

		console.log(document.location.hostname);

		var dictionary = supportedDictionaries[document.location.hostname];

		if(dictionary && isGullible(dictionary)) {

			addPortraitToDictionary(dictionary);

			displayPortrait();
		}


	}
});

