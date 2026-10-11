$(document).ready(function(){

  // Tracks from Wikimedia Commons (HTTPS). The original jplayer.org files return HTML placeholders.
  // Licenses: Submarine Song, Blow The Man Down (Wikimedia, public domain, US Naval Academy Glee Club); To Be Free (Wikimedia, CC BY-SA 4.0);
  // Indian Romantic, Hindi No Copyright Song (VibeDepot, Waveloom), Hindi songs (Soundore): CC BY-ND 4.0; Alex Morgan tracks: CC BY 4.0. Free Music Archive.
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
      artist:"Wikimedia Commons",
      mp3:"https://upload.wikimedia.org/wikipedia/commons/1/12/03may2020-tobefree.mp3",
      poster: "https://i.imgur.com/klJKSVZ.jpg"
    },{
      title:"Indian Romantic",
      artist:"Waveloom",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/YznELElwUIc91sqYrfbnslJWW10Q4PfYcuKptKT8.mp3",
      poster: "https://i.imgur.com/sCbrzQa.png"
    },{
      title:"Hindi No Copyright Song",
      artist:"VibeDepot",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Nf5knmcPpsbGLcZgJPcOwAMGDTECcZhXEnFPZtLV.mp3",
      poster: "https://i.imgur.com/lXvsuBu.png"
    },{
      title:"Old Bollywood Cinematic With Strings and Tabla",
      artist:"Alex Morgan",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/m614bopzRaWAHXMBeaG9igwz3qY7rczDagMM2wdq.mp3",
      poster: "https://i.imgur.com/klJKSVZ.jpg"
    },{
      title:"Free Hindi Song",
      artist:"Soundore",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/67ZWCWNaWhHVXeacsNxdQLCfE1R9Xaafx9IBAQvB.mp3",
      poster: "https://i.imgur.com/sCbrzQa.png"
    },{
      title:"Hindi Song",
      artist:"Soundore",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/b5CShMAoTfKhvgWUgTbPFQrL58UdZUmuzUJxiZUk.mp3",
      poster: "https://i.imgur.com/lXvsuBu.png"
    },{
      title:"Hindi Song Free",
      artist:"Soundore",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/u3CgoZKtaobvw1ljAJKPVg05d7uaNAkWvDgTp4FX.mp3",
      poster: "https://i.imgur.com/klJKSVZ.jpg"
    },{
      title:"Free Hindi Music",
      artist:"Soundore",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/IJjA8HWM7D5e0dipdGZyKTJmw9WzYMBig1wh7EyJ.mp3",
      poster: "https://i.imgur.com/sCbrzQa.png"
    },{
      title:"Indian Music",
      artist:"Alex Morgan",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/9XNmDG7gvAvUeInsHjMQHDy3TFJGAwq0dqTh1fZi.mp3",
      poster: "https://i.imgur.com/lXvsuBu.png"
    },{
      title:"Indian Classical Music",
      artist:"Alex Morgan",
      mp3:"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/UBc10i3uYNr8HOYBxj5WFl7OuP6EQGaFvXsz2hDP.mp3",
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

  // Song picker: choose any track from a dropdown; stays in sync with next/previous.
  var $picker = $('<select class="song-picker"></select>');
  $.each(playlist, function(i, track) {
    $picker.append($('<option></option>').val(i).text(track.title + " - " + track.artist.split(" (")[0]));
  });
  $(".info").append($picker);
  $picker.on("change", function() {
    myPlaylist.play(parseInt(this.value, 10));
  });
  $(cssSelector.jPlayer).on($.jPlayer.event.play, function() {
    $picker.val(myPlaylist.current);
  });
  
  
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