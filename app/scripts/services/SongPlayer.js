(function() {
    function SongPlayer() {
         var SongPlayer = {};

         /**
         *@desc Current song object
         *@type {Object}
         */
         var currentSong = null;

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
         var currentBuzzObject = null;


           /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
           var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
              });

              currentSong = song;
          };

          /**
          *@function SongPlayer.play
          *@desc Determines what to do with the song file
          *@param {Object} song
          */
         SongPlayer.play = function(song) {

           if (currentSong !== song) {
              setSong(song);

             currentBuzzObject.play();
           } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                  playSong(currentBuzzObject);
                }
              }
          };

          /**
          *@function SongPlayer.pause
          *@desc Pauses the song file
          *@param {Object} song
          */
          SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
          };

          /**
          *@function playSong
          *@desc Plays the song file
          *@param {Object} song
          */
          var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
          }


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
