(function() {
<<<<<<< HEAD
    function AlbumCtrl(Fixtures, SongPlayer) {
       this.albumData = Fixtures.getAlbum();
       this.songPlayer = SongPlayer;
     }


    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
=======
    function AlbumCtrl() {
      this.albumData = angular.copy(albumPicasso);
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
>>>>>>> a-5
})();
