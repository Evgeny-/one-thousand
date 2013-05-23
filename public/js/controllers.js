function StoryListCtrl($scope, $http) {

   var loadLength = 10;

   $scope.posts = [];
   $scope.loadMoreShow = false;
   $scope.step = 0;

   $scope.loadMore = function() {
      $http.get('/stories/' + $scope.step).success(function(res) {
         $scope.posts = $scope.posts.concat(res);
         if(res.length != loadLength) {
            $scope.loadMoreShow = false;
         }
         else {
            $scope.step += loadLength;
            $scope.loadMoreShow = true;
         }
      });
   }
   $scope.loadMore();
}


function StoryDetailCtrl($scope, $http, $routeParams) {

   $scope.postId = $routeParams.postId;

   $http.get('/story/'+$scope.postId).success(function(res) {
      $scope.post = res;
      $scope.post.date = new Date($scope.post.timeStamp);
   });
}

StoryDetailCtrl.$inject = ['$scope', '$http', '$routeParams'];



function StoryAddCtrl($scope, $http) {

   $scope.step = 1;
   $scope.voucher = "";
   $scope.message = {class: 'hide', text: ''};

   var _message = function(type) {
      var types = [
         ['error', 'Please enter 5-digit voucher!'],
         ['info', 'Sending info...'],
         ['error', 'Not valid voucher']];

      if(type === false) {
         $scope.message = {class: 'hide', text: ''};
      }
      else {
         $scope.message.class = 'alert-' + types[type][0];
         $scope.message.text = types[type][1];
      }
   }

   $scope.voucherSend = function() {
      if($scope.voucher.length !== 5 || ! $scope.voucher.match(/^\d+$/)) {
         _message(0);
      }
      else {
         _message(1);
         $http
            .get('/voucher/' + $scope.voucher)
            .success(function(res) {
               if( ! res.result) return _message(2);
               _message(false);
               $scope.step = 2;
         });
      }
   }

   $scope.selectImage = function() {
      var files = document.getElementById('image-uploader'),
         img = document.getElementById('preview-img');

      files.click();
      files.addEventListener('change', function(ev) {
         var reader = new FileReader;
         reader.onload = function(event) {
            img.src = event.target.result;
         };
         reader.readAsDataURL(ev.target.files[0]);
      });
   }
}


function GoodAddCtrl($scope, $http) {

   $scope.step = 1;
   $scope.name = "";
   $scope.message = {class: 'hide', text: ''};

   var _message = function(type) {
      var types = [
         ['error', 'Please enter Your last name!'],
         ['info', 'Sending info...'],
         ['error', 'User not found']];

      if(type === false) {
         $scope.message = {class: 'hide', text: ''};
      }
      else {
         $scope.message.class = 'alert-' + types[type][0];
         $scope.message.text = types[type][1];
      }
   };

   $scope.nameSend = function() {
      if($scope.name.length === 0 || ! $scope.name.match(/^[a-zA-Z0-9 ]+$/)) {
         _message(0);
      }
      else {
         _message(1);
         $http
            .get('/last-name/' + $scope.name)
            .success(function(res) {
               if( ! res.result) return _message(2);
               _message(false);
               $scope.step = 2;
            });
      }
   }
}


function AboutCtrl ($scope) {}