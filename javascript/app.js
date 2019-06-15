

  var firebaseConfig = {
    apiKey: "AIzaSyB3vl5FsOXJKAYOf6RWTE5nfHqqAu8acp8",
    authDomain: "trainscheduler-deac4.firebaseapp.com",
    databaseURL: "https://trainscheduler-deac4.firebaseio.com",
    projectId: "trainscheduler-deac4",
    storageBucket: "trainscheduler-deac4.appspot.com",
    messagingSenderId: "1022981038374",
    appId: "1:1022981038374:web:8af1e142e2f9f794"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  $("#addTrain").click(function(event) {
    event.preventDefault();

    var trainInput = $("#trainName").val().trim();
    var destinationInput = $("#destination").val().trim();
    var timeInput = moment($("#firstTime").val().trim(),'HH:mm').format("hh:mm a");
    var frequencyInput = $("#frequency").val().trim();

    
    var newTrain = {
        train: trainInput,
        dest: destinationInput,
        time: timeInput,
        freq: frequencyInput
    };
    
     
     database.ref().push(newTrain);

     
     console.log(newTrain.train);
     console.log(newTrain.dest);
     console.log(newTrain.time);
     console.log(newTrain.freq);
 
     alert("Train added");
 
     
     $("#trainName").val("");
     $("#destination").val("");
     $("#firstTime").val("");
     $("#frequency").val("");
 });
 
 
 database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainInput = childSnapshot.val().train;
    var destinationInput = childSnapshot.val().dest;
    var timeInput = childSnapshot.val().time;
    var frequencyInput = childSnapshot.val().freq;

    // Employee Info
    console.log(trainInput);
    console.log(destinationInput);
    console.log(timeInput);
    console.log(frequencyInput);


    var firstArrivalConvert = moment(timeInput,'HH:mm').subtract(1, "years");
    console.log(firstArrivalConvert);



    var now = moment();
    console.log("CURRENT TIME: " + moment().format("hh:mm a"));


    var theDifference = moment().diff(moment(firstArrivalConvert), "minutes");
    
    console.log("DIFFERENCE IN TIME: " + theDifference);
    console.log(moment(theDifference).format("hh:mm"));

    
    var timeInterval = theDifference % frequencyInput;
    console.log(timeInterval);

  
    var minutesLeft = frequencyInput - timeInterval;
    console.log("MINUTES TILL TRAIN: " + minutesLeft);

    
    var nextArrival = moment().add(minutesLeft, "minutes");
    var nextArrivalSimplified =  moment(nextArrival).format("hh:mm a");
    console.log("ARRIVAL TIME: " + nextArrivalSimplified);





  
    var newRow = $("<tr>").append(
        $("<td>").text(trainInput),
        $("<td>").text(destinationInput),
        $("<td>").text(frequencyInput),
        $("<td>").text(nextArrivalSimplified),
        $("<td>").text(minutesLeft),
        
    );


    $("#train-table > tbody").append(newRow);
});


