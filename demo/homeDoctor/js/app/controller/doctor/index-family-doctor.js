"use strict";
define(["main-app", "jquery", "tools"
], function (app, $, tools) {
  app.controller("IndexFamilyDoctorCtrl", ["$scope", "$location", "$timeout", "$q", "http", "storage", "scroll",
    function ($scope, $location, $timeout, $q, http, storage, scroll) {

      storage.setLocalStorageObject($rootScope.productId, $rootScope.product);

      $scope.serviceFlow = function () {
        $location.path("doctor.service-process");
      };
      $scope.doctorTeam = function () {
        $location.path("doctor.doctor-team");
      };
      $scope.consultingRecords = function () {
        $location.path("doctor.consulting-records");
      };
      $scope.checkFamilyDoctor = function(event){
        var accountId = 'accountId='+JSON.parse(localStorage.getItem('ticketLocal.AuthService_appState')).id;
        http.post({
          url: "WeChatPlut/getAvaliableCards.do",
          data: accountId,
          needToken:true,
          relatedButton: event.target,
          relatedButtonText:"",
          success: function (data) {
            if (data && data["isSuccess"]) {
              window.location.href = data["redirectUri"];
            } else {
              tools.alert("你没有可使用的家庭医生卡！");
            }
          },error: function(e) {
            console.log(e);
          }
        });
      };





     /* checkFamilyDoctor : function(){
        jyapp.markLayer(1);
        var accountId = 'accountId='+JSON.parse(localStorage.getItem('ticketLocal.AuthService_appState')).id;
        if(checkId == 1){
          checkId ++;
          $.post(jyapp.config.serverUrl+"/WeChatPlut/getAvaliableCards.do",accountId,
            function(data){
              jyapp.markLayer(0);
              checkId = 1;
              if(data.code == 1){
                mui.openWindow({
                  id: 'callDoctor',
                  url: "callDoctor.html"
                });
              }else{
                dialog.alert(data.msg);
              }
            }),function(error){
            jyapp.markLayer(1);
            console.log("checkFamilyDoctor------>:"+e);
          };
        }
      },*/
    }
  ]);
});