//Howard Livingston
//AVF with Jen McCarrick
//13/07
//Android Javascript




document.addEventListener("deviceready", onDeviceReady, false);

//To be run on start up
function onDeviceReady() {
	phoneGapReady.innerHTML = "";
    alert("The device is ready!");
    
    screenOutput();
    
}  

//API Section

//Instagram API--I deliberately made this an onload event
$('#apiPage').on('pageinit', function () {
    console.log("api page loaded!");

    var screenOutput;

    $(function () {
        var tag = "popular";
        var url = "https://api.instagram.com/v1/media/popular?callback=?&amp;client_id=99ec0bb747ce4b099f5c342470f9788c&amp;min_id=10";
        $.getJSON(url, screenOutput);
    });

    
var screenOutput = function (info) {
        alert("Populating Instagram Data now!");
        console.log(info);

        $("#data-msg").html("<h2>Instagram results:</h2>");
        $.each(info.data, function (index, photo) {

            var pic = "<li><img src='" + photo.images.standard_resolution.url + "' alt='" + photo.user.id + "' /><h4>" + photo.user.full_name + ", <em>(" + photo.user.username + ")</em></h4></li>";
            $(pic).appendTo("#data-input");

        });

    };
});

//Weather API 
var getWeather = function () {
    var i;
    var l;
    var getWeather;
    $(".weatherTitle").remove();
    var makeweatherTitle = $('<h2 class="weatherTitle">Weather</h2>');
    makeweatherTitle.appendTo('#weatherTitle');
    console.log("procede to ajax!");
    $.ajax({
        url: 'http://api.worldweatheronline.com/free/v1/weather.ashx?q=Boston&format=json&num_of_days=5&key=ejp7mma79vtqbjsqak34xp4w&callback=getWeather',
        type: 'GET',
        dataType: 'JSONP',
        success: function (weatherData) {
            console.log(weatherData);
            for (i = 0, l = weatherData.data.current_condition.length; i < l; i++) {
                $('<ul class="weatherCity">' + '<li><h3>Boston, Ma</h3></li>' + '</ul>').appendTo('#weatherTitle');
                $(' ' +
                    '<ul class="weatherList">' +
                    '<li> Current Condition: ' + weatherData.data.current_condition[i].weatherDesc[i].value + '</li>' +
                    '<li> Temperature: ' + weatherData.data.current_condition[i].temp_F + 'F' + '</li>' +
                    '<li> Humidity: ' + weatherData.data.current_condition[i].humidity + '%' + '</li>' +
                    '<li> Precipitation: ' + weatherData.data.current_condition[i].precipMM + '"' + '</li>' +
                    '<li> Barometric Pressure: ' + weatherData.data.current_condition[i].pressure + 'mb' + '</li>' +
                    '<li> Cloud Cover: ' + weatherData.data.current_condition[i].cloudcover + '%' + '</li>' +
                    '<li> Visibility: ' + weatherData.data.current_condition[i].visibility + 'miles' + '</li>' +
                    '</ul>'
                ).appendTo('#weatherTitle');
            }
        }

    });

};


//NATIVE FEATURES

//Geolocation
var myLocation = function() {
   		var onSuccess = function(position) {
   		
   			$('ul class="currentLocation">' + '<li><h3>Your location is...</h3></li>' + '</ul>').appendTo('#myLocal');
   				$('' +
   				  '<ul class="coordinates">' +
    			  	'<li>Latitude: ' + position.coords.latitude  +'lat'+'</li>' +
          		  	'<li>Longitude: ' + position.coords.longitude +'long'+'</li>' +
          		  	'<li>Altitude: '  + position.coords.altitude  +'alt'+'</li>' +
          	      	'<li>Timestamp: ' + position.timestamp        +'time'+'</li>' +
          	      '</ul>'
          	  ).appendTo('#myLocal');
          	  
          	 };


    	var onError = function(error) {
        	alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    };


			navigator.geolocation.getCurrentPosition(onSuccess, onError);


};

//Accelerometer 
//The "accel fired" alert on line 176 works so I know I'm inside the function
var getAcceleration= function(){
	var watchAcc = null;
		alert("accel fired");
    	navigator.accelerometer.getCurrentAcceleration(onAccelerationSuccess, onError);
    	


// Get snapshot current acceleration
	var onAccelerationSuccess = function(acceleration) {
    	alert('Acceleration X: ' + acceleration.x + ', Acceleration Y: ' + acceleration.y + ', Acceleration Z: ' + acceleration.z);
    	console.log('Success. Get Snapshot of Current Acceleration');
};

// Error: Fail to get acceleration
	var onError = function() {
    	alert("onError");
    	console.log('Failed to get Acceleration');
};

};


//Check connectivity Fires on load
var checkConnection = function () {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            alert('Connection type: ' + states[networkState]);

}


//Get Device fires when prompted 
 var getDevice = function(){
 	alert("getDevice fired!");
 
 	(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
		if(jQuery.browser.mobile)
{
   			alert('You are using a mobile device!');
}
		else
{
   			alert('You are not using a mobile device!');
}
	
var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
		if (isiPad)
{
  			alert('You are using an iPad!');
}
var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());

		if (isiDevice)
{
  			alert('You are using an Apple Device!');
}
		else
{
   			alert('You are not using an Apple Device device!');
}    

}
 		



//onClick Events

//Instagram page--2 bring in pics
$('#PageRefresh').click(function () {
    location.reload();
});

//Get Geolocaton--2 bring in location manually
$('#GeoPageRefresh').on('click', function () {
	console.log("Geo page loaded!");
    myLocation();

});

//Get Accelerometer
$('#getAccel').on('click', function () {
	console.log("Accelerometer loaded");
    getAcceleration();

});

//Get Device Info
$('#getDevice').on('click', function () {
	console.log("Here's your current device");
    getDevice();

});

$('#connection').on('click', function () {
	console.log("Here's your connection status");
    checkConnection();

});

	
//Page init functions

$('#home').on('pageinit', function(){
		console.log("landing page loaded!");
		
});

$('#startHere').on('pageinit', function(){
		console.log("Home base page loaded!");
});

$('#research').on('pageinit', function(){
		console.log("Research page loaded!");
});


$('#environment').on('pageinit', function(){
		console.log("Environment page loaded!");
		getWeather();
 });

$('#compassPage').on('pageinit', function(){
		console.log("compass page loaded!");
});

$('#accPage').on('pageinit', function(){
		console.log("Accelerometer page loaded!");
			
});

$('#geoPage').on('pageinit', function(){
		console.log("Geo page loaded!");
			
		
});

$('#mydevice').on('pageinit', function(){
		console.log("What device page loaded!");
	
});

