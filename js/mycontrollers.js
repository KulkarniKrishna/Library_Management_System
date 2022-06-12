var libraryModule = angular.module('libraryModule', []);

libraryModule.controller('LoginCtrl', function($scope, $http, $rootScope, $location) {
	var url = "users.json";
	$http.get(url).success(function(response) {
		$scope.data = response;
	});

	$scope.validate = function() {
		$rootScope.username = "";
		angular.forEach($scope.data, function(user) {
			if (user.username == $scope.name && user.password == $scope.pass) {
				$rootScope.username = $scope.name;
				$scope.role = user.role;
			}
		});
		if ($rootScope.username != "") {
			alert("Welcome " + $rootScope.username + "!");
			if ($scope.role == "student") {
				$location.path('/home/student');
			} else {
				$location.path('/home/librarian');
			}
		} else {
			alert("Invalid Credentials!");
			$scope.name = "";
			$scope.pass = "";
			$location.path('/main');
		}
	}
});


libraryModule.controller('BookListCtrl_Student', function($scope, BookData) {
	BookData.getData();

	$scope.changeView = function() {
		BookData.getData();
	}
});


libraryModule.controller('BookListCtrl_Librarian', function($scope, $location, $rootScope, BookData) {
	if (!$rootScope.books) {
		BookData.getData();
	}

	$scope.issue = function(bookId) {
		$location.path('/issue/' + bookId);
	}

	$scope.return = function(bookId) {
		$location.path('/return/' + bookId);
	}

	$scope.add = function() {
		$location.path('/AddBook');
	}
});



libraryModule.controller('IssueBookCtrl', function($scope, $routeParams, $rootScope, $location) {
	$scope.bookId = $routeParams.bookId;
	$scope.book = $rootScope.books.find(function(b) {
		return b.bookId == $scope.bookId;
	});

	$scope.issue = function(bookId) {
		$scope.book.issued = true;
		alert("Book issued successfully!");
		$location.path('/home/librarian');
	}
});


libraryModule.controller('ReturnBookCtrl', function($scope, $routeParams, $rootScope, $location) {
	$scope.bookId = $routeParams.bookId;

	$scope.book = $rootScope.books.find(function(b) {
		return b.bookId == $scope.bookId;
	});

	$scope.return = function(bookId) {
		$scope.book.issued = false;
		alert("Book returned successfully!");
		$location.path('/home/librarian');
	}
});

libraryModule.controller('AddBookCtrl', function($scope, $rootScope, $location, BookData) {

	$scope.addBook = function(id, title, topic, author, cost) {
		if (!$rootScope.books) {
			BookData.getData();
		}
		$rootScope.books.push({
			"bookId": id,
			"bookTitle": title,
			"topic": topic,
			"author": author,
			"cost": cost,
			"imgUrl": "imgs/DefaultBookImage.jpg",
			"issued": false
		});
		$location.path('/home/librarian');
	}
});