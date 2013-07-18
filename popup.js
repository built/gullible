var iconUrl = chrome.extension.getURL('icons/logo_16x16.png');

var showPortraitUrl = function() {
  chrome.storage.local.get("portrait_url", function(value) {
    $('#portrait_url').val( value.portrait_url ? value.portrait_url : "" );
  });
}

var savePortraitUrl = function(url) {
  chrome.storage.local.set({'portrait_url': url});
}

document.addEventListener('DOMContentLoaded', function () {

  // Display any previously set url.
  showPortraitUrl();

  $('#save').click(function(){

    var url = $('#portrait_url').val();

    if(!url || url.match(/^(http|https|file|ftp):/)) {
      
      savePortraitUrl(url);

      $('#msg').text("Saved!");

      window.close();
    }
    else {
      $('#msg').text("Is that image on the web?");
    }



  });

});















