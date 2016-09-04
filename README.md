# GifTastic

> This assignment is designed to familiarize students with AJAX and manipulation of page content.  Users select a topic button on the left, which generates 12 gif images in the main page content area.  Clicking on the gif will animate it, or pause it, based on its state. 

# This repository contains the following folders/files:

### Root files
 * index.html
 * index.php
 * composer.json

### Assets/CSS
 * style.css
 * dashboard.css
 * Note: The program includes Bootstrap's core CSS code, delivered from Bootstrap's CDN
 
### Assets/Javascript
 * gif.js
 * Note: The program includes Bootstrap's core js code, delivered from Bootstrap's CDN

## Program General Information:

 * All program js functionality was placed inside of js objects.

 * Bootstrap was used for this project.

 * The project layout is in a dashboard-style format, with the topic buttons on the left and the gif content on the right.

 * Users may add new topic buttons dynamically by using the top-right input area, "Create A Button" via "Enter" or "click" action. This action also generates gif content.  Users are not allowed to enter a topic that already exists.

 * The program features local (session) storage for topic buttons.  Users may clear this data by selecting the "Clear Data" button.

 * The site is fully responsive.  Images span 4 for large screens, 3 for medium screens and 2 for small screens.

 * A modal is used for all user messages instead of alert boxes.

 * The main page content header changes after each topic selection, updating the heading with the current topic being browsed.