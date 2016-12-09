var FeriApp= angular.module('FeriApp');

FeriApp.controller('SignUpController', function ($scope, $ionicLoading) { //$cordovaFacebook, $cordovaGooglePlus
    /*
     * Learn how facebooks graph api works: https://developers.facebook.com/docs/graph-api/quickstart/v2.2
     * The array params "public_profile", "email", "user_friends" are the permissions / data that the app is trying to access.
    */
    $scope.fbLogin = function () {

        //$cordovaFacebook.login(["public_profile", "email", "user_friends"])
        //.then(function (success) {
        //    /*
        //     * Get user data here. 
        //     * For more, explore the graph api explorer here: https://developers.facebook.com/tools/explorer/
        //     * "me" refers to the user who logged in. Dont confuse it as some hardcoded string variable. 
        //     * 
        //    */
        //    //To know more available fields go to https://developers.facebook.com/tools/explorer/
        //    $cordovaFacebook.api("me?fields=id,name,picture", [])
        //    .then(function (result) {
        //        /*
        //         * As an example, we are fetching the user id, user name, and the users profile picture
        //         * and assiging it to an object and then we are logging the response.
        //        */
        //        var userData = {
        //            id: result.id,
        //            name: result.name,
        //            pic: result.picture.data.url
        //        }
        //        //Do what you wish to do with user data. Here we are just displaying it in the view
        //        $scope.fbData = JSON.stringify(userData, null, 4);


        //    }, function (error) {
        //        // Error message
        //    })

        //}, function (error) {
        //    // Facebook returns error message due to which login was cancelled.
        //    // Depending on your platform show the message inside the appropriate UI widget
        //    // For example, show the error message inside a toast notification on Android
        //});

    }

    /*
     * Google login
    */

    $scope.googleLogin = function () {

        $ionicLoading.show({ template: 'Loading...' });
        ///*
        // * Google login. This requires an API key if the platform is "IOS".
        // * Example: $cordovaGooglePlus.login('yourApiKey')
        //*/
        //$cordovaGooglePlus.login()
        //.then(function (data) {

        //    $scope.googleData = JSON.stringify(data, null, 4);
        //    $ionicLoading.hide();

        //}, function (error) {

        //    // Google returns error message due to which login was cancelled.
        //    // Depending on your platform show the message inside the appropriate UI widget
        //    // For example, show the error message inside a toast notification on Android
        //    $ionicLoading.hide();

        //});
    }
});

FeriApp.controller('UserController', function ($http, $scope, $state, $rootScope) {
    $scope.data = { mail:"", password: "" };
    $scope.error_login = false;
    $scope.datos_usuario = {};
    $scope.campos_vacios_registro=false;
    $scope.login = function () {
        var bandera = 0;
        if($scope.data.mail!=""){
            for (var i in $rootScope.sesiones) {
                if ($scope.data.mail == $rootScope.sesiones[i].correo_sesion && $scope.data.password == $rootScope.sesiones[i].password_sesion) {
                    $rootScope.sesion_logueada = $rootScope.sesiones[i];
                    console.log($rootScope.sesion_logueada);
                    if($rootScope.sesion_logueada.rol_sesion=="cliente"){
                        $rootScope.esCliente = true;
                        $rootScope.esUsuario = false;
                        bandera = 1;
                        $state.go('app_cliente.home_cliente');
                    }else{
                        $rootScope.esUsuario = true;
                        $rootScope.esCliente = false;
                        bandera = 1;
                        $state.go('app_usuario.home_usuario');
                    }
                    break;
                }
            }
        }

        if (bandera == 0) {
            $scope.error_login = true;
        }
    };
    $scope.registro_usuario = function () {
        //validación de campos
        if ($scope.datos_usuario.nombre_sesion != "") {
            $scope.datos_usuario.id_sesion = ($rootScope.sesiones.length + 1) * 1000 + ($rootScope.sesiones.length + 1) * 100 + ($rootScope.sesiones.length + 1) * 10 + ($rootScope.sesiones.length + 1);
            $scope.datos_usuario.rol_sesion = "usuario";
            $rootScope.sesiones.push({ id_sesion: $scope.datos_usuario.id_sesion, nombre_sesion: $scope.datos_usuario.nombre_sesion, correo_sesion: $scope.datos_usuario.correo_sesion, password_sesion: $scope.datos_usuario.password_sesion, rol_sesion: $scope.datos_usuario.rol_sesion });
            console.log($rootScope.sesiones);
            $state.go('login');
        } else {
            $scope.campos_vacios_registro = true;
        }
    };
    $scope.captura_index= function (indice) {
        $rootScope.feria_index = indice;
    };
});

FeriApp.controller('AppController', function ($http, $scope, $state, $rootScope, $ionicSideMenuDelegate) {
    $scope.go = function (state) {
        $state.go(state);
    };
    $rootScope.logueado = false;
    $rootScope.sesiones = [
        { id_sesion: 1111, nombre_sesion: "Pablo Salinas", correo_sesion: "pablo.salinasc@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
        { id_sesion: 2222, nombre_sesion: "Sebastian Calderon", correo_sesion: "sebastian.calderon@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
       { id_sesion: 3333, nombre_sesion: "Veronica Dominguez", correo_sesion: "veronica.dominguez@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
        { id_sesion: 4444, nombre_sesion: "Daniel Morales", correo_sesion: "sebastian.calderon@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
       { id_sesion: 5555, nombre_sesion: "Rodrigo Mendoza", correo_sesion: "rodrigo.mendoza@usach.cl", password_sesion: "1234", rol_sesion: "usuario" },
        { id_sesion: 6666, nombre_sesion: "Cliente Uno", correo_sesion: "cliente1@usach.cl", password_sesion: "1234", rol_sesion: "cliente" },
        { id_sesion: 7777, nombre_sesion: "Cliente Dos", correo_sesion: "cliente2@usach.cl", password_sesion: "1234", rol_sesion: "cliente" },
        { id_sesion: 8888, nombre_sesion: "Cliente Tres", correo_sesion: "cliente3@usach.cl", password_sesion: "1234", rol_sesion: "cliente" }
    ];
    $rootScope.ferias = [
        {id_feria: 1111, latitud_feria:-33.4906832 ,longitud_feria:-70.7667169 ,nombre_feria:"Feria Modelo 3",comuna_feria:"Maipú",imagen_feria:"img/modelo3.jpg"},
        { id_feria: 2222, latitud_feria: -33.449877, longitud_feria: -70.687286, nombre_feria: "Feria Informática USACH", comuna_feria: "Estación Central", imagen_feria: "img/diinf.jpg" },
        { id_feria: 3333, latitud_feria: -33.4703495, longitud_feria: -70.7481123, nombre_feria: "Feria El descanso", comuna_feria: "Maipú", imagen_feria: "img/eldescanso.jpg" }
    ];
    $rootScope.locales=[
        { id_local: 1234, id_feria_local: 1111, codigo_qr_local: "/img/qrmodelo3-1.jpg", latitud_local: -33.4903173, longitud_local: -70.7660641, descripcion_local: "Se vende Papas.", id_cliente_local: 1234, },
        { id_local: 2345, id_feria_local: 1111, codigo_qr_local: "/img/qrmodelo3-2.jpg", latitud_local: -33.49022, longitud_local: -70.7660104, descripcion_local: "Se vende Frutas.", id_cliente_local: 2345, },
        { id_local: 3456, id_feria_local: 1111, codigo_qr_local: "/img/qrmodelo3-3.jpg", latitud_local: -33.4904012, longitud_local: -70.7662022, descripcion_local: "Se vende frutos secos.", id_cliente_local: 3456, },
        { id_local: 4567, id_feria_local: 1111, codigo_qr_local: "/img/qrmodelo3-4.jpg", latitud_local: -33.4906832, longitud_local: -70.7667169, descripcion_local: "Se vende Mote.", id_cliente_local: 2345, },
        { id_local: 5678, id_feria_local: 2222, codigo_qr_local: "/img/qrferiausach-1.jpg", latitud_local: -33.449877, longitud_local: -70.687286, descripcion_local: "Stand del proyecto FeriApp, grupo del ramo de Proyecto de Ingeniería de Informática.", id_cliente_local: 2345 },
        { id_local: 6789, id_feria_local: 3333, codigo_qr_local: "/img/qrdescanso-1.jpg", latitud_feria: -33.4703495, longitud_feria: -70.7481123, descripcion_local: "Se vende melones y sandias", id_cliente_local: 3456 }
    ];
    $rootScope.productos = [
        { id_producto:1111,nombre_producto:"Acelga",tipo_producto:"Hortaliza"},
        { id_producto:2222,nombre_producto:"Achicoria",tipo_producto:"Hortaliza"},
        { id_producto: 2222, nombre_producto: "Ajo", tipo_producto: "Hortaliza" },
        { id_producto: 2222, nombre_producto: "Ají", tipo_producto: "Hortaliza" },
        { id_producto: 2222, nombre_producto: "Albahaca", tipo_producto: "Hortaliza" },
        { id_producto: 2222, nombre_producto: "Alcachofa", tipo_producto: "Hortaliza" },
        { id_producto: 2222, nombre_producto: "Apio", tipo_producto: "Hortaliza" },
        { id_producto: 2222, nombre_producto: "Arveja Verde", tipo_producto: "Hortaliza" },
        { id_producto: 2222, nombre_producto: "Berenjena", tipo_producto: "Hortaliza" },
        { id_producto: 2222, nombre_producto: "Betarraga", tipo_producto: "Hortaliza" },
        { id_producto: 2222, nombre_producto: "Brócoli", tipo_producto: "Hortaliza" }
    ];
    $rootScope.variedad = [
        { id_producto: 1111, descripcion_producto: ""},
        { id_producto: 1111, descripcion_producto: ""},
        { id_producto: 1111, descripcion_producto: ""},
        { id_producto: 1111, descripcion_producto: ""},
        { id_producto: 1111,descripcion_producto: ""}
    ];

});

FeriApp.controller('MenuController', function ($http, $scope, $state, $rootScope) {
    $scope.desloguear = function () {
        $rootScope.esUsuario = false;
        $rootScope.esCliente = false;
        $rootScope.sesion_logueada = {};
        $state.go('root');
    }
});