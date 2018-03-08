This program allows users to add a train and it's specs (name, destination, frequency) into firebase.  Each train is pushed to the database as an object when the user clicks submit.  

When a train is added to the firebase, a snapshot of the object's elements is taken and saved as variables.  With this information, we can use arithmetic (lines 89-113) to compute each train's next arrival and minutes away which are also saved as variables.  

All of these variables are then appended into a table which contains every train's information.

Anyone with a link to the website can add trains.  

The page automatically refreshes every minute to reflect current arrival times.

