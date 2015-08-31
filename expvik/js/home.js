 var nameApp = angular.module('nameApp', ['angular-spinkit']);
 

 
      nameApp.controller('NameCtrl', function ($scope){
        $scope.a = 'skjbsjbds';
	var lati = 0;
	var lngi = 0;
	var loc = [{"city":"Bangalore","LATITUDE":12.98,"LONGITUDE":77.6},
	{"city":"Chennai","LATITUDE":13.09,"LONGITUDE":80.28},
	{"city":"Delhi","LATITUDE":28.67,"LONGITUDE":77.22},
	{"city":"Hyderabad","LATITUDE":17.38,"LONGITUDE":78.47},
	{"city":"Ahemedabad","LATITUDE":23.03,"LONGITUDE":72.62},
	{"city":"Kolkata","LATITUDE":22.57,"LONGITUDE":88.37},
	{"city":"Mumbai","LATITUDE":19.01,"LONGITUDE":72.85},
	{"city":"Pune","LATITUDE":18.52,"LONGITUDE":73.86}];
console.log(loc);
	for(var j=0; j<loc.length; j++) {
		lati = lati + parseFloat(loc[j].LATITUDE);
		lngi = lngi + parseFloat(loc[j].LONGITUDE);
		
		}
		var myAvgLat = lati / loc.length;
		
        var myAvgLng = lngi / loc.length;
 
 	console.log(myAvgLat);
	console.log(myAvgLng);
	  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      
      center: new google.maps.LatLng(myAvgLat, myAvgLng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < loc.length; i++) {  
    	console.log(loc[i].LATITUDE);
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(loc[i].LATITUDE, loc[i].LONGITUDE),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
		 var url = 'details.html?city='+loc[i].city;
        return function() {
          infowindow.setContent('<a href="'+ url +'">' + loc[i].city + '</a>');
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
      });
	  
	  
	  nameApp.controller('detailsController', function ($scope,$location,$http){
		  $scope.content = false; 
		  $scope.date = new Date();
var absUrl = $location.absUrl();

var cityName = absUrl.split('=');

$scope.spin = true;
$http.get('http://api.openweathermap.org/data/2.5/weather?q='+cityName[1]).then(function(data){
  $scope.report = data.data;
  console.log($scope.report);
  $scope.spin = false;
  $scope.content = true;
  
}, function(err){
  console.log(err);
})
		  
	  });
