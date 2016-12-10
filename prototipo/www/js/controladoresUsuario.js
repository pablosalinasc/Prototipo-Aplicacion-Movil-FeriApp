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
            $scope.marcadores = [];
            $scope.strings = [];
            $scope.infoFeria=[];
            for(var i in $rootScope.ferias){
                $scope.marcadores[i] = new google.maps.Marker({
                    map : $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng($rootScope.ferias[i].latitud_feria,$rootScope.ferias[i].longitud_feria)
                });
                $scope.strings[i] = "<div><a ui-sref='/mapaFeria' ng-click='captura_index(";
                $scope.strings[i] = $scope.strings[i].concat(i);
                $scope.strings[i] = $scope.strings[i].concat(")'>");
                $scope.strings[i] = $scope.strings[i].concat($rootScope.ferias[i].nombre_feria);
                $scope.strings[i] = $scope.strings[i].concat("</a></div>");
                console.log($scope.strings[i]);
                $scope.infoFeria[i] = new google.maps.InfoWindow({
                    content: $scope.strings[i]
                });
            }
            google.maps.event.addListener($scope.marcadores[0], 'click', function () {
                $scope.infoFeria[0].open($scope.map, $scope.marcadores[0]);
            });
            google.maps.event.addListener($scope.marcadores[1], 'click', function () {
                $scope.infoFeria[1].open($scope.map, $scope.marcadores[1]);
            });
            google.maps.event.addListener($scope.marcadores[2], 'click', function () {
                $scope.infoFeria[2].open($scope.map, $scope.marcadores[2]);
            });
        });
    }, function (error) {
        console.log("No funcionó el mapa");
    });

});

FeriApp.controller('MapaFeriaController', function ($rootScope, $scope, $state, $stateParams, $cordovaGeolocation) {
    var options = { timeout: 10000, enableHighAccuracy: true };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log("Funcionó el mapa");
        var latLng = new google.maps.LatLng($rootScope.ferias[$rootScope.feria_index].latitud_feria, $rootScope.ferias[$rootScope.feria_index].longitud_feria);
        var mapOptions = {
            center: latLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.mapFeria = new google.maps.Map(document.getElementById("map2"), mapOptions);
        google.maps.event.addListenerOnce($scope.mapFeria, 'idle', function () {
            //var marcadorPosicion = new google.maps.Marker({
            //    map: $scope.mapFeria,
            //    animation: google.maps.Animation.DROP,
            //    position: latLng
            //});
            //var infoUsuario = new google.maps.InfoWindow({
            //    content: "Esta es tu posición actual!"
            //});
            //google.maps.event.addListener(marcadorPosicion, 'click', function () {
            //    infoUsuario.open($scope.mapFeria, marcadorPosicion);
            //});
            $scope.marcadoresLocales = [];
            $scope.stringsLocales = [];
            $scope.infoLocal= [];
            for (var i in $rootScope.locales) {
                if ($rootScope.ferias[$rootScope.feria_index].id_feria == $rootScope.locales[i].id_feria_local) {
                    console.log($rootScope.locales[i]);
                    $scope.marcadoresLocales[i] = new google.maps.Marker({
                        map: $scope.mapFeria,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng($rootScope.locales[i].latitud_local, $rootScope.locales[i].longitud_local)
                    });
                    $scope.stringsLocales[i] = "<div><a ui-sref='/mapalocal' ng-click='captura_index(";
                    $scope.stringsLocales[i] = $scope.stringsLocales[i].concat(i);
                    $scope.stringsLocales[i] = $scope.stringsLocales[i].concat(")'>");
                    $scope.stringsLocales[i] = $scope.stringsLocales[i].concat($rootScope.locales[i].descripcion_local);
                    $scope.stringsLocales[i] = $scope.stringsLocales[i].concat("</a></div>");
                    $scope.infoLocal[i] = new google.maps.InfoWindow({
                        content: $scope.stringsLocales[i]
                    });
                }
            }
        });
    }, function (error) {
        console.log("No funcionó el mapa");
    });
});

FeriApp.controller('MuroFeriaController', function ($rootScope, $scope, $state, $stateParams, $cordovaGeolocation) {
    $scope.variable = 0;
    $rootScope.feria_index = 0;
    $scope.ratingFull = {};
    $scope.ratingFull.rate = 3;
    $scope.ratingFull.max = 5;

    $scope.ratingHalf = {};
    $scope.ratingHalf.rate = 3.5;
    $scope.ratingHalf.max = 5;

    $scope.reset = function () {
        $scope.ratingFull.rate = 0;
    }
});

FeriApp.controller('MuroPuestoController', function ($rootScope, $scope, $state, $stateParams, $cordovaGeolocation) {
    $scope.variable = 0;
    $rootScope.locales_index = 0;
    $scope.ratingFull = {};
    $scope.ratingFull.rate = 3;
    $scope.ratingFull.max = 5;

    $scope.ratingHalf = {};
    $scope.ratingHalf.rate = 3.5;
    $scope.ratingHalf.max = 5;

    $scope.reset = function () {
        $scope.ratingFull.rate = 0;
    }
});