// Variables
var $overlay    = $('<div id="overlay"></div>');
var $image      = $("<img>");
var $figCaption = $('<figcaption></figcaption>');

var $prevArrow = $('<button id="btn-prev"> < </button>');
var $nextArrow = $('<button id="btn-next"> > </button>');

// Keeps track of index number for next / prev buttons
var index = 0;

// Gets the length of photos in the photo gallery
var galleryLength = $('#photo-gallery li').length;


/**
 * [updateImage: updates image overlay]
 * @param  {string} imageLocation [gets img href]
 * @param  {string} imageCaption  [gets img alt]
 * @return {[type]}               [description]
*/
var updateImage = function(imageLocation, imageCaption) {

	// Attach image src href to $image with imageLocation
	$image.attr("src", imageLocation);

	// Set alt text to $figCaption
	$figCaption.text(imageCaption);
};


/**
 * [prevNextImages: cycles through overlay images]
 * @param  {bool} next [set to increase index by 1]
 * @return {[type]}        [description]
 */
var prevNextImages = function(next) {

	// If function arguement is next, increase index by 1
	if (next) {
		index++;
	}
	// Otherwise, decrease index by 1
	else {
		index--;
	}

	// If photos get clicked past first photo
	if (index < 0) {
		// Set index to last photo
		index = galleryLength - 1;
	}

	// If photos get clicked past last photo
	if (index > galleryLength - 1) {
		// Set index to first photo
		index = 0;
	}

	// Get the element by index,
	// then get the <a> tag along with its attributes
	var newImageSelected = $('#photo-gallery li').get(index).getElementsByTagName('a');

	// Set imageLocation of newImageSelected
	var imageLocation = $(newImageSelected).attr("href");

	// Set imageCaption of newImageSelected
	var imageCaption = $(newImageSelected).children("img").attr("alt");

	// Show next/prev image in overlay
	updateImage(imageLocation, imageCaption);
};


/* ---------- Begin Overlay ---------- */
// Add an image to the overlay
$overlay.append($image);

// Add a caption to the overlay
$overlay.append($figCaption);

// Add the left and right arrow buttons
$overlay.append($prevArrow);
$overlay.append($nextArrow);

// Add overlay to the body element
$('body').append($overlay);


// Display large photo in overlay on click
$('#photo-gallery a').on('click', function(event) {

	// Prevents browsers default action on links
	event.preventDefault();

	// Gets image src on clicked image
	var imageLocation = $(this).attr("href");

	// Get child's (<img>) alt attribute for caption
	var imageCaption = $(this).children("img").attr("alt");

	// Get the index of the currently selected image
	index = $(this).parent().index();

	// Get the imageLocation & imageCaption of selected image
	updateImage(imageLocation, imageCaption);

	// Show the overlay
	$overlay.slideDown(600);
});


// Close overlay when it is clicked
$overlay.on('click', function() {

	// Hides the overlay if overlay is clicked anywhere
	if (event.target.id === "overlay") {
		$overlay.slideUp();
	}
});

// Cycles left/previous through overlay images
$prevArrow.on('click', function() {
	prevNextImages();
});

// Cycles right/next through overlay images
$nextArrow.on('click', function() {
	prevNextImages(true);
});
/* ---------- End Overlay ---------- */


/* ---------- Begin Search ---------- */
// Triggers event on user typing, copy-n-pasting or clicking x
$('#search').on('keyup click input', function() {

		// gets the users search input & converts to lower case
		var search = $(this).val().toLowerCase();
		 
		// cycles through each <img> in #photo-gallery
	  $('#photo-gallery img').each(function() {

	  	// gets the alt attribute & converts to lower case
		 	var caption = $(this).attr('alt').toLowerCase();
		 
		 	// if caption doesn't match users search
		 	if (caption.indexOf(search) === -1) {
		 		// find the <li> tag and hide images
		 		$(this).closest('li').hide(800);
		 	}
		 	// if caption does match users search
		 	else {
		 		// find the <li> tag and show images
		 		$(this).closest('li').show(800);
		 	}
		});
});
/* ---------- End Search ---------- */



/* ---------- Begin Keyboard Navigation ---------- */
// Cycle through overlay images with < and > keyboard buttons
$('#photo-gallery').on('keydown', function(event) {
	// if right arrow > key is pressed
	if (event.keyCode === 39) {
		// Prevent browser default
		event.preventDefault();

		// Then call prevNextImages(true)
		prevNextImages(true);
	}
	// Or if left arrow < key is pressed
	else if (event.keyCode === 37) {
		// Prevent browser default
		event.preventDefault();

		// Then call prevNextImages()
		prevNextImages();
	}
});
/* ---------- End Keyboard Navigation ---------- */
