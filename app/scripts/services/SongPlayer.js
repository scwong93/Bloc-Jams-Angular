(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
         *@desc Retrieves the current playing album
         */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         *@function playSong
         *@desc Plays the song file
         *@param {Object} song
         */
         var playSong = function(song) {
           currentBuzzObject.play();
           song.playing = true;
         }

         /**
         *@function getSongIndex
         *@desc Retrieves the song's index
         *@param {Object} song
         */
          var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };

         /**
         *@desc Current song object from list of song
         *@type {Object}
         */
         SongPlayer.currentSong = null;


           /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
           var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
              });

              SongPlayer.currentSong = song;
          };

          /**
          *@function SongPlayer.play
          *@desc Determines what to do with the song file
          *@param {Object} song
          */
         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
              setSong(song);

             currentBuzzObject.play();
           } else if (SongPlayer.currentSong === song) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
          };

          /**
          *@function SongPlayer.previous
          *@desc Plays the previous song
          *@param {Object}
          */
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;

              if (currentSongIndex < 0) {
                   currentBuzzObject.stop();
                   SongPlayer.currentSong.playing = null;
               } else {
                   var song = currentAlbum.songs[currentSongIndex];
                   setSong(song);
                   playSong(song);
               }
          };


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
