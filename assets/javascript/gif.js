/**
 * Program: gif.js
 * Created: 08/30/2016 by Matt Holland
 * Located: desktop/bootcamp/homework/giftastic/assets/javascript
 * Purpose: Provide gif generation code for 6th assignment - AJAX
 */

 // Main API object
 var gif = {

 	// Main array that holds all topics
 	topicArray: ["Lightning", "Whales", "Waterfalls", "Mudslides", "Tasmanian Devils", "Coral Reefs"],

 	// Function to populate default buttons on page load, from topicArray
 	generateDefaultButtons: function() {
 		// Get the parent element which will house the buttons
 		var parent = $("ul.nav-sidebar");
 		// Loop through the topicArray and generate the default button list
 		gif.topicArray.forEach(function(item, index, arr) {
 			// Create the button inside of the li
 			var li = $('<li><button class="btn side-btn" data-topic="' + item + '"> ' + item + ' &raquo; </button></li>');
 			// Now append the li to the parent
 			parent.append(li);
 		});
 	},

 	// Function to generate a new button when the user clicks on the generate input
 	generateNewButton: function(topic) {
 		// First check to see if topic already exists.  If so, deny addition
 		if(gif.topicArray.indexOf(topic) != -1) {
 			alert("That topic already exists!  You can't add it again.");
 			return false;
 		}

 		// Push new topic onto array
 		gif.topicArray.push(topic);

 		// Get the parent element which button will be prepended to
 		var parent = $("div#button-area");

 		// Create the new button element
 		var li = $('<li><button class="btn side-btn"> ' + topic + ' &raquo; </button></li>');
 		// Prepend the button to the sidebar
 		parent.prepend(li);
 	},

 	// Function to generate gif content when the user clicks on a topic button
 	generateGifs: function(topic) {
 		// Get the parent element which content will be prepended to
 		var parent = $("div#gif-content");
 		// Make sure that the topic string is encoded properly (+ for spaces)
 		var topic = encodeURIComponent(topic).replace(/%20/g,'+');
 		// Establish query URL, metting GIPHY API requirements
 		var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";
 		console.log("queryUrl: " + queryUrl);
 		// AJAX call to get data
 		$.ajax({
 			url: queryUrl, 
 			method: "GET"
 		}).done(function(returnData) {
 			console.log(JSON.stringify(returnData));
 		})
 	}
 }

 $(document).ready(function() {
 	// Generate the default buttons on page load
 	gif.generateDefaultButtons();

 	// When the user clicks on the search icon, generate a new button
 	$('span.search-icon').on('click', function(e) {
 		// Get the input text. Trim out any white space
 		var text = $('input.input-generate').val().trim();
 		console.log("Input text: " + text);

 		// Make sure the user entered something
 		if(text == "") {
 			alert("You must enter a topic before continuing!");
 			return false;
 		}

 		// Generate a new button with the user's input
 		gif.generateNewButton(text);

 	});

 	// When the user clicks on a topic button, generate the gifs
 	$('ul.nav-sidebar button').on('click', function(e) {

 		// Get the data attribute of the button clicked
 		var topic = $(this).data("topic");
 		console.log("data-topic: " + topic);

 		// Run the function to generate GIFs
 		gif.generateGifs(topic);
 	});
 });