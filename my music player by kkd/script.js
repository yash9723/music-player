$(document).ready(function(){

  // Tracks from Wikimedia Commons (HTTPS). The original jplayer.org files return HTML placeholders.
  var playlist = [{
      title:"Submarine Song",
      artist:"USNA Midshipmen Glee Club",
      mp3:"https://upload.wikimedia.org/wikipedia/commons/5/57/%22Submarine_Song%22_or_%22Down_Down_Underneath_The_Sea%22_sung_by_the_USNA%27s_Midshipmen_Glee_Club.mp3",
      poster: "https://i.imgur.com/sCbrzQa.png"
    },{
      title:"Blow The Man Down",
      artist:"USNA Midshipmen Glee Club",
      mp3:"https://upload.wikimedia.org/wikipedia/commons/6/62/%22Blow_The_Man_Down%22_sung_by_the_U.S._Naval_Academy%27s_Midshipmen_Glee_Club.mp3",
      poster: "https://i.imgur.com/lXvsuBu.png"
    },{
      title:"To Be Free",
      artist:"Wikimedia Commons (CC BY-SA 4.0)",
      mp3:"https://upload.wikimedia.org/wikipedia/commons/1/12/03may2020-tobefree.mp3",
      poster: "https://i.imgur.com/klJKSVZ.jpg"
  }];
  
  var cssSelector = {
    jPlayer: "#jquery_jplayer",
    cssSelectorAncestor: ".music-player"
  };
  
  var options = {
    swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
    supplied: "ogv, m4v, oga, mp3",
    volumechange: function(event) {
      $( ".volume-level" ).slider("value", event.jPlayer.options.volume);
    },
    timeupdate: function(event) {
      $( ".progress" ).slider("value", event.jPlayer.status.currentPercentAbsolute);
    }
  };
  
  var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
  var PlayerData = $(cssSelector.jPlayer).data("jPlayer");
  
  
  // Create the volume slider control
  $( ".volume-level" ).slider({
     animate: "fast",
		max: 1,
		range: "min",
		step: 0.01,
		value : $.jPlayer.prototype.options.volume,
		slide: function(event, ui) {
			$(cssSelector.jPlayer).jPlayer("option", "muted", false);
			$(cssSelector.jPlayer).jPlayer("option", "volume", ui.value);
		}
  });
  
  // Create the progress slider control
  $( ".progress" ).slider({
		animate: "fast",
		max: 100,
		range: "min",
		step: 0.1,
		value : 0,
		slide: function(event, ui) {
			var sp = PlayerData.status.seekPercent;
			if(sp > 0) {
				// Move the play-head to the value and factor in the seek percent.
				$(cssSelector.jPlayer).jPlayer("playHead", ui.value * (100 / sp));
			} else {
				// Create a timeout to reset this slider to zero.
				setTimeout(function() {
					 $( ".progress" ).slider("value", 0);
				}, 0);
			}
		}
	});
});