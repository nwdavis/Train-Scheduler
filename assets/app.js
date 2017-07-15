$(document).ready(function(){

var config = {
	apiKey: "AIzaSyALBCC9G099FgUtPopNgecipp3zXQaPMp0",
	authDomain: "clicking-things-e3110.firebaseapp.com",
	databaseURL: "https://clicking-things-e3110.firebaseio.com",
	projectId: "clicking-things-e3110",
	storageBucket: "clicking-things-e3110.appspot.com",
	messagingSenderId: "1029039386927"
  };

firebase.initializeApp(config);

var db = firebase.database();

//create click event on submit button to gather values for entry
//add those values to an object newTrain
//push newTrain to 

$("#submit").on("click", function(event){
	event.preventDefault();
	var newTrain = {};
	newTrain.name = $("#trainName").val().trim();
	newTrain.dest = $("#trainDest").val().trim();
	newTrain.firstTrain = $("#firstTrain").val().trim();
	newTrain.freq = $("#trainFreq").val().trim();
	console.log(newTrain)
	

	if (isNaN(newTrain.freq) === false) {
		
		db.ref().push(newTrain);

	} else {
		alert("Please check your entries and try again.")
		return;
	};

});


//firebase watcher that updates HTML
db.ref().on("child_added", function(snap){

	//calcNextTrain will take the value of the first train, the current time, and the interval, and return the time of the next train
	
	function calcNextTrain() {
		var a = snap.val().firstTrain;
		var b = "HH:mm";
		var c = moment(a, b);
	

		//current time
		var d = moment()  	

		var e = moment(moment(c).diff(d)).format('HH:mm')

		return e;

	};

	//calcaway will take the first train, find the minutes between current time and the first train, and get the modulus of frequency into the difference
	function calcAway(){
		var a = snap.val().firstTrain;
		var b = "HH:mm";
		var c = moment(a, b);
		
		
	};

	var row = $("<tr>")

	var name = $("<td>" + snap.val().name + "</td>")
	var dest = $("<td>" + snap.val().dest + "</td>")
	var freq = $("<td>" + snap.val().freq + "</td>")
	var nextTrain = $("<td>" + calcNextTrain() + "</td>")
	var minAway = $("<td>" + calcAway() + "</td>")

	row.append(name).append(dest).append(freq).append(nextTrain).append(minAway)

	$("#tableBody").append(row)
});



});