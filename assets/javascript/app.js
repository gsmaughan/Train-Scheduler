window.onload = function loaded(){

	//initializing firebase
	
    var config = {
    apiKey: "AIzaSyARsPe6rrqFhLRUhfjZhwR4WBIXHzIHdUE",
    authDomain: "train-scheduler-4594a.firebaseapp.com",
    databaseURL: "https://train-scheduler-4594a.firebaseio.com",
    projectId: "train-scheduler-4594a",
    storageBucket: "train-scheduler-4594a.appspot.com",
    messagingSenderId: "783339977877"
  };
  firebase.initializeApp(config);

  //create variable dataRef to refer to database
  var dataRef = firebase.database();

  //initial values
  var trainName = "";
  var destination = "";
  var firstTime = "";
  var frequency;

  var firstTimeConverted;
  var currentTime;
  var diffTime;
  var tRemainder;
  var tMinutesTillTrain;
  var nextTrain;
  var nextTrainTime;

  var array = [];


  // var next;
  // var minAway;

  //capture submit button click
  $("#add-train").on("click", function(event) {
      event.preventDefault();

      //logic for storing add train input
      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTime = $("#first-time-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      console.log(trainName, destination, firstTime, frequency);

      // create JSON object for newTrain
      var newTrain = {
      	trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      }

      //code for the push to firebase
      dataRef.ref().push(newTrain);

      //log new train to console
      console.log(newTrain.trainName);
        
      console.log(newTrain.destination);
      console.log(newTrain.firstTime);
      console.log(newTrain.frequency);
      console.log("-------------------");

      //clears input text boxes
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#first-time-input").val("");
      $("#frequency-input").val("");
   }); //end #add-train

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  // This is a function that iterates through the objects in the firebase
    dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val() + " childSnapshot.val()");

      //store everything into a variable
      	var trainName = childSnapshot.val().trainName;
  		var destination = childSnapshot.val().destination;
  		var firstTime = childSnapshot.val().firstTime;
  		var frequency = childSnapshot.val().frequency;

  	//logging train info
  		console.log("++++++++++++++++++++++++");
  		console.log(trainName);
  		console.log(destination);
  		console.log(firstTime);
  		console.log(frequency);
  		console.log("++++++++++++++++++++++++");


  	firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted + " first time converted");

    // Current Time
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrainTime = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      
  	
     
    

    	//put the train in the table, then restart the function with the next train object
      $("table > tbody").append("<tr><td id='tName'>" + childSnapshot.val().trainName + "</td><td>" +childSnapshot.val().destination + "</td><td>" +
  		childSnapshot.val().frequency + "</td><td>" + nextTrainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");


    });//end child added

    


    

}//window.onload