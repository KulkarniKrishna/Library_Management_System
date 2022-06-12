//filter books
var fm = angular.module('filterModule', []);
 fm.filter('filterunissued', function() {
 	return function(books, viewbookoption) {
 		if (viewbookoption == 'Available') {
 			return books.filter(function(book) {
 				return !book.issued;
 			});
 		} else {
 			return books;
 		}
 	}
 });


//get books data from json file
 var sm = angular.module('serviceModule', []);
 sm.service('BookData', function($http, $rootScope) {
 	return {
 		getData: function() {
 			var url = "libbooks.json";

 			$http.get(url).success(function(response) {
 				$rootScope.books = response;
 			});
 		}
 	}
 });