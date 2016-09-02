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

 	// Image state global, for changing <img> src attribute. Initialize to still. Prevents you from having to pass parameter to changeImgUrl
 	imgState: "still",

 	// Function to populate default buttons on page load, from topicArray
 	generateDefaultButtons: function(items) {
 		console.log("var items inside of generateDefaultButtons(): " + items);
 		// Get the parent element which will house the buttons
 		var parent = $("ul.nav-sidebar");
 		// Loop through the array of topics and generate the default button list
 		//gif.topicArray.forEach(function(item, index, arr) {
 		items.forEach(function(item, index, arr) {
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

 		// Save to session storage so that buttons generated by user may be saved
 		sessionStorage.setItem("topicArray", gif.topicArray);

 		// Get the parent element which button will be prepended to
 		var parent = $("div#button-area");

 		// Create the new button element
 		var li = $('<li><button class="btn side-btn" data-topic="' + topic + '"> ' + topic + ' &raquo; </button></li>');
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
 		var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=12";
 		console.log("queryUrl: " + queryUrl);

 		// AJAX call to get data
 		$.ajax({
 			url: queryUrl, 
 			method: "GET"
 		}).done(function(returnData) {
 			console.log(returnData);
 			var stuff = "";

 			// Loop through returnData.  Note:  is an object.  Must reference 'data' to access the array
 			returnData.data.forEach(function(item,index,arr) {
 				// Make sure that there is text for rating.  If not, will throw off layout rows. Make all ratings upper-case for good presentation
 				var rating = (arr[index].rating == "") ? "N/A" : arr[index].rating.toUpperCase();

 				// Add all html into var stuff
 				stuff += '<div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 placeholder">' +
                        	'<img src="' + arr[index].images.fixed_height_still.url + '" data-still="' + arr[index].images.fixed_height_still.url + '" data-animate="' + arr[index].images.fixed_height.url + '" width="auto" height="200" class="img-responsive" alt="Generic placeholder thumbnail">' +
                        	'<h4>Rating</h4>' + 
                        	'<span class="rating">' + rating + '</span>' +
                    	  '</div>';
 				//console.log("img animated string: " + arr[index].images.fixed_height.url + "\n img still string: " + arr[index].images.fixed_height_still.url + "\n + rating: " + arr[index].rating);
 			});

 			// Throw stuff into main img container
 			$('div#gif-content').html(stuff);
 		})
 	}, 

 	// Function to change the img "src" attribute, to animated or still
 	changeImgUrl: function(img) {
 		// Get the url string, and then change the src attribute
 		var url = (gif.imgState == "still") ? img.data("animate") : img.data("still");
 		img.attr("src", url);
 		
 		// Change the state to the alternative option, so that next time the src will switch
 		gif.imgState = (gif.imgState == "still") ? "animate" : "still";
 	}
 }

// Main program executable code
 $(document).ready(function() {

 	// Generate the default buttons on page load. Check session storage first, and generate from there if != null
 	var items = localStorage.getItem("topicArray");
 	if(items != null) {
 		console.log("localStorage topicArray != null!");
 		items = JSON.parse(items);
 		gif.generateDefaultButtons(items);
 	} else {
 		console.log("localStorage topicArray == null!");
 		var items = gif.topicArray;
 		gif.generateDefaultButtons(items);
 	}

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

 		// Generate a new button with the user's input.  Will put it into the side area
 		gif.generateNewButton(text);

 		// Add to the topicArray
 		gif.topicArray.push(text);

 		// Save entire topicArray to local storage
 		localStorage.setItem("topicArray", JSON.stringify(gif.topicArray));
 		console.log("localStorage topicArray: " + JSON.stringify(localStorage.getItem("topicArray")));
 	});

 	// When the user clicks on a topic button, generate the gifs
 	$('ul.nav-sidebar').on('click', 'button', function(e) {
 		console.log("Button was clicked!");

 		// Get the data attribute of the button clicked
 		var topic = $(this).data("topic");
 		console.log("data-topic: " + topic);

 		// Run the function to generate GIFs
 		gif.generateGifs(topic);
 	});

 	// When the user clicks on an img, make it animate, or still
 	//$(document.body).on('click', 'div#gif-content img', function(e) {
 	$('div.main').on('click','img', function(e) {
 		console.log("You clicked an img!");
 		var img = $(e.target);
 		gif.changeImgUrl(img);
 		console.log("this: " + JSON.stringify(img));
 	});
});