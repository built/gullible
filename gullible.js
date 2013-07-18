//-------|---------|---------|---------|---------|---------|---------|---------|---------|

var displayPortrait = function() {

    chrome.storage.local.get("portrait_url", function(value) {

    	console.log(value);
    	console.log("url:", value["portrait_url"]);

    	if("portrait_url" in value) {
			$('#gullible_portrait').show();
			$('#gullible_portrait_url').attr('src', value["portrait_url"]);
		}

    });
}

var template = "<div id='gullible_portrait' style='text-align: center; width: WIDTHpx; \
position: absolute; top: TOPpx; left: LEFTpx; display: none;'>\
<img id='gullible_portrait_url' width='WIDTH' src=''/><br/>Example</div>";


$(function() {

	var portraitSize = {width: 150, height: 150};

	console.time("gullible");

	var divHTML = "";

	if(document.location.href.indexOf('google.com/search?q=gullible') > -1) {

		console.log("Google");
		
		var definition = $("li.dct");

		if(definition == null) return;

		var top = definition.position().top;
		var left = definition.position().left + definition.width() - (portraitSize.width + 20);


		definition.append(
			template
			.replace(/WIDTH/g, portraitSize.width)
			.replace(/TOP/g, top)
			.replace(/LEFT/g, left)
		);
	}
	else if(document.location.href.indexOf('dictionary.reference.com/browse/gullible') > -1) {

		console.log("Dictionary.com");

		var definition = $("#rpane");

		if(definition == null) return;

		var top = definition.position().top + 10;
		var left = definition.position().left + definition.width() - (portraitSize.width + 20);


		definition.append(
			template
			.replace(/WIDTH/g, portraitSize.width)
			.replace(/TOP/g, top)
			.replace(/LEFT/g, left)
		);


	}

	displayPortrait();


	console.timeEnd("gullible");
});

