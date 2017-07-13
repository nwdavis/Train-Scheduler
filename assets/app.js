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

var database = firebase.database();

var trains = [];

//create click event on submit to gather values for entry
//check that those are valid entries for the fields
//add those values to an object
//push that object to array trains

$("#submit").on("click", function(event){
	event.preventDefault();
	var newTrain = [];
	newTrain.name = $("#trainName").val().trim();
	newTrain.dest = $("#trainDest").val().trim();
	newTrain.firstTrain = $("#firstTrain").val().trim();
	newTrain.freq = $("#trainFreq").val().trim();
	console.log(newTrain)
	trains.push(newTrain)

	if (isNaN(newTrain.freq) === false) {
		console.log("both params met")
		database.ref().set({
		allTrains: trains,
	});

	} else {
		alert("Please check your entries and try again.")
		return;
	};

});


//firebase watcher that updates HTML



database.ref().on("value", function(snapshot) {
	
	for (i=0; i < snapshot.val().allTrains.length; i++) {

		$("#tableBody").html("<tr>" + "<td>" + snapshot.val().allTrains[i].name + "</td>" + "<tr>")
		
	}

});



});