// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var FeriApp = angular.module('FeriApp', ['ionic', 'IonicitudeModule']);

FeriApp.run(function ($ionicPlatform, Ionicitude) {
    $ionicPlatform.ready(function() {
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        Ionicitude.init()
        .then(function () {
          console.log('Here you go. Ionicitude is fully initialized !');
          // Now that Ionicitude is initialized, we can safely add the Actions that could be called from within an AR View.
          // Note that these actions will be executed by the Ionic WebView and in its context.
          // To call this captureScreen action, there should be, in one of your AR World JS code and assuming that you're using Ionicitude's CHM, something like :
          //  document.location = architectsdk://captureScreen
          Ionicitude
            .addAction(captureScreen)
            .addAction(markerselected);
        })
        .catch(function (error) {
            console.log("Hu-ho..! Something has failed !", error);
        });
    })
});

FeriApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app_usuario', {
            url: "/app_usuario",
            abstract: true,
            templateUrl: "vistas/app_usuario.html",
            controller: "MenuController"
        })
        .state('app_cliente', {
            url: "/app_cliente",
            abstract: true,
            templateUrl: "vistas/app_cliente.html",
            controller: "MenuController"
        })
        .state('root', {
            url: "",
            templateUrl: "vistas/multi_login.html",
            controller: "SignUpController"
        })
        .state('root2', {
            url: "/",
            templateUrl: "vistas/multi_login.html",
            controller: "SignUpController"
        })
        .state('login', {
            url: "/login",
            templateUrl: "vistas/login_local.html",
            controller: "UserController"
        })
        .state('eleccion_registro', {
            url: "/eleccion_registro",
            templateUrl: 'vistas/eleccion_registro.html',
            controller: "UserController"
        })
        .state('registro_usuario', {
            url: "/registro_usuario",
            templateUrl: 'vistas/registro_usuario.html',
            controller: "UserController"
        })
        .state('registro_cliente', {
            url: "/registro_cliente",
            templateUrl: 'vistas/registro_cliente.html',
            controller: "UserController"
        })
        .state('sesiones', {
            url: "/sesiones",
            templateUrl: "vistas/sesiones.html",
            controller: "UserController"
        })
        .state('app_usuario.home_usuario', {
            url: "/home_usuario",
            views: {
                'menuContent' :{
                    templateUrl: "vistas/home_usuario.html",
                    controller: "UserController"
                }
            }
        })
        .state('app_cliente.home_cliente', {
            url: "/home_cliente",
            views: {
                'menuContent': {
                    templateUrl: "vistas/home_cliente.html",
                    controller: "UserController"
                }
            }
        });
    $urlRouterProvider.otherwise('/');
});

