var FeriApp= angular.module('FeriApp');

FeriApp.controller('QRController', function ($scope, $rootScope,  $cordovaBarcodeScanner, $state) { 
    $scope.scanBarcode = function () {
        $cordovaBarcodeScanner.scan().then(function (imageData) {
            var local;
            for(var i in $rootScope.locales){
                if($rootScope.locales[i].id_local==imageData.text){
                    local = imageData.text;
                    $rootScope.indice_local = i;
                }
            }
            if (typeof local !== "undefined") {
                alert("Local Encontrado");
                $state.go('puesto');
            } else {
                alert("El codigo escaneado no corresponde a un local");
            }
                
        }, function (error) {
            alert("A ocurrido un error -> " + error);
        });
    };
});