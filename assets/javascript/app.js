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

  var next;
  var minAway;

  //capture submit button click
  $("#add-train").on("click", function(event) {
      event.preventDefault();

      //logic for storing add train input
      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTime = $("#first-time-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      console.log(trainName, destination, firstTime, frequency);

      var newTrain = {
      	trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      }

      //code for the push
      dataRef.ref().push(newTrain);

      //log new train to console
      console.log(newTrain.trainName);
      console.log(newTrain.destination);
      console.log(newTrain.firstTime);
      console.log(newTrain.frequency);

      //clears input text boxes
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#first-time-input").val("");
      $("#frequency-input").val("");
   }); //end #add-train

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTime);
      console.log(childSnapshot.val().frequency);



      
      
    	//put all trains in the table
      $("table > tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +childSnapshot.val().destination + "</td><td>" +
  childSnapshot.val().frequency + "</td><td>" + nextTrainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");

    //   $("#full-member-list").append("<div class='well'><span class='member-name' style='color:blue'> " + childSnapshot.val().name + ", " +
    //     " </span><span class='member-email'> " + childSnapshot.val().email + ", " +
    //     " </span><span class='member-age'> " + childSnapshot.val().age + ", " +
    //     " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");

    // // Handle the errors
    // }, function(errorObject) {
    //   console.log("Errors handled: " + errorObject.code);
    

    });//end child added
    

}//window.onload