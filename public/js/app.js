angular.module('postscat', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/stories', {
                templateUrl: 'partials/story-list.html',
                controller: StoryListCtrl
            })
            .when('/story/:postId', {
                templateUrl: 'partials/story-detail.html',
                controller: StoryDetailCtrl
            })
            .when('/story-add', {
                templateUrl: 'partials/story-add.html',
                controller: StoryAddCtrl
            })
            .when('/good-add', {
                templateUrl: 'partials/good-add.html',
                controller: GoodAddCtrl
            })
            .when('/about', {
                templateUrl: 'partials/about.html',
                controller: AboutCtrl
            })
            .otherwise({redirectTo: '/stories'});
    }]);