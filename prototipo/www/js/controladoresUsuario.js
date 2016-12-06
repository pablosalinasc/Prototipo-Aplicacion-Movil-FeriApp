var FeriApp = angular.module('FeriApp');

FeriApp.controller('MapaController', function ($rootScope,$scope, $state, $cordovaGeolocation) {
    var options = { timeout: 10000, enableHighAccuracy: true };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log("Funcionó el mapa");
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'idle', function() {
            var marcadorPosicion = new google.maps.Marker({
                map: $scope.map,
                animation : google.maps.Animation.DROP,
                position: latLng
            });
            var infoUsuario = new google.maps.InfoWindow({
                content: "Esta es tu posición actual!"
            });
            google.maps.event.addListener(marcadorPosicion, 'click', function () {
                infoUsuario.open($scope.map, marcadorPosicion);
            });
            var marcadores=[];
            var strings=[];
            var infoFeria=[];
            for(var i in $rootScope.ferias){
                marcadores[i] = new google.maps.Marker({
                    map : $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng($rootScope.ferias[i].latitud_feria,$rootScope.ferias[i].longitud_feria)
                });
                strings[i] = "<div><a ui-sref='app_usuario.home_usuario'>";
                strings[i] = strings[i].concat($rootScope.ferias[i].nombre_feria);
                strings[i] = strings[i].concat("</a></div>");
                console.log(strings[i]);
                infoFeria[i] = new google.maps.InfoWindow({
                    content: strings[i]
                });
                google.maps.event.addListener(marcadores[i], 'click', function () {
                    infoFeria[i].open($scope.map, marcadores[i]);
                });
            }
        });
    }, function (error) {
        console.log("No funcionó el mapa");
    });


});