(function() {
    function SongPlayer($rootScope, Fixtures) {
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
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          SongPlayer.currentTime = null;

          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(time) {
              if (currentBuzzObject) {
                  currentBuzzObject.setTime(time);
              }
          };


           /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
           var setSong = function(song) {
              if (currentBuzzObject) {
                  stopSong(song);
               }

               currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
                });

                currentBuzzObject.bind('timeupdate', function() {
                     $rootScope.$apply(function() {
                         SongPlayer.currentTime = currentBuzzObject.getTime();
                     });
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
                   stopSong(song);
               } else {
                   var song = currentAlbum.songs[currentSongIndex];
                   setSong(song);
                   playSong(song);
               }
          };

          /**
          *@function SongPlayer.next
          *@desc Plays the next song
          *@param {Object}
          */
          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length - 1) {
              stopSong(song);
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
          }

          /**
          *@function stopSong
          *@desc Stops currentBuzzObject and sets playing song to null
          *@param {Object} song
          */
          var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
          }


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
