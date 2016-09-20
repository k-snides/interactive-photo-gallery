// Variables
var $overlay    = $('<div id="overlay"></div>');
var $image      = $("<img>");
var $figCaption = $('<figcaption></figcaption>');

// var $close      = $('<button id="close"><i class="fa fa-times" aria-hidden="true"></i></button>');
// var $rightArrow = $('<button id="right"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>');
// var $leftArrow = $('<button id="left"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></button>');
var $prevArrow = $('<button id="btn-prev"> < </button>');
var $nextArrow = $('<button id="btn-next"> > </button>');

// Keeps track of index number for next / prev buttons
var $index = 0;

// Gets the length of photos in the photo gallery
var $galleryLength = $('#photo-gallery li').length;


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
 * @param  {bool} next [set to increase $index by 1]
 * @return {[type]}        [description]
 */
var prevNextImages = function(next) {
	// If function arguement is next, increase $index by 1
	if (next) {
		$index++;
	}
	// Otherwise, decrease $index by 1
	else {
		$index--;
	}

	// If $index gets below 0
	if ($index < 0) {
		// Set $index to last photo
		$index = $galleryLength - 1;
	}

	// If $index goes above last photo
	if ($index > $galleryLength - 1) {
		// Set $index to first photo
		$index = 0;
	}

	// Get the element by index,
	// then get the link and attributes from <a> tag
	var newImageSelected = $('#photo-gallery li').get($index).getElementsByTagName('a');

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

// Add an 'x' to close for user experience
// $overlay.append($close);

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
	$index = $(this).parent().index();

	// Get the imageLocation & imageCaption of selected image
	updateImage(imageLocation, imageCaption);

	// Show the overlay
	$overlay.slideDown(500);
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
// triggers event on type, copy-n-paste or clicking x
$('#search').on('keyup click input', function() {

	// gets the users search input & converts to lower case
	var search = $(this).val().toLowerCase();
	 
	// cycles through each img in #photo-gallery
  $('#photo-gallery img').each(function() {

  	// gets the alt attribute & converts to lower case
	 	var text = $(this).attr('alt').toLowerCase();
	 
	 	// if text doesn't match users search
	 	if (text.indexOf(search) === -1) {
	 		// find the <li> tag and hide images
	 		$(this).closest('li').hide(); // TODO add class for animation
	 	}
	 	// if text does match users search
	 	else {
	 		// find the <li> tag and show images
	 		$(this).closest('li').show(); // TODO add class for animation
	 	}
	});
});
/* ---------- End Search ---------- */







// //Problem: User when clicking on image goes to a dead end, poor UX
// //Solution: Create an overlay with the large image - Lightbox

// var $overlay = $('<div id="overlay"><div></div></div>');
// var $image = $("<img>");
// var $caption = $("<p></p>");


// //Keep track of image index for prev/next, we will use a list index
// //position to determine where we are and what it means to move forward
// //and backwards by 1.
// var $index = 0;

// //this is grabbing the list items from the photo-gallery element and
// //we are assigning the length total
// //this makes it flexible to expand the gallery or take away
// var $galleryLength = $("#photo-gallery li").length;

// //2.1 An image
// $overlay.children("div").append($image);


// //2.2 add caption
// $overlay.children("div").append($caption);

// // Add some nav buttons and assign unique ids to them!
// $overlay.children("div").append("<button id='btnPrev'> < </button>");
// $overlay.children("div").append("<button id='btnNext'> > </button>");

// //2. Add overlay
// $("body").append($overlay);


// // Update image overlay
// // I moved the updating of the overlay to its own function
// // since we use it three times in three differnet area, this makes code
// // writting cleaner
// var updateImage = function(imageLocation, imageCaption){

//   //1.2 update the overlay with the image linked in the link
//   $image.attr("src", imageLocation);

//   //1.3 Get child <img> alt atrbute and set caption
//   $caption.text(imageCaption);


// }

// //1. Click <a> event to an image
// $("#photo-gallery a").click(function(event){
//   event.preventDefault();
//   var imageLocation = $(this).attr("href");
//   var imageCaption =  $(this).children("img").attr("alt");

//   //update index to current selected image
//   $index = $(this).parent().index(); 

//   //this is calling that new Update overlay function above
//   updateImage(imageLocation, imageCaption);

//   //1.1 Show the overlay
//   $overlay.slideDown(imageLocation);


// });


// //Button prev next function
// var prevNext = function(prev ) {
//   //set prev to true to move backwards in the index

//   //if flag set move backwards, if not move forwards
//   if(!prev) { $index++; }
//   else { $index--; }

//   //if out of index reset
//   if ($index < 0) { $index = $galleryLength-1;}
//   if ($index > 10) { $index = 0; }

//   //Grab the element by index and then get the link
//   var newImgSelected = $("#photo-gallery li").get($index).getElementsByTagName("a");

//   //grab link information
//   var imageLocation = $(newImgSelected).attr("href");
//   var imageCaption =  $(newImgSelected).children("img").attr("alt");

//   //Update Overlay
//   updateImage(imageLocation, imageCaption);
// }

// //Button events

// $("#btnPrev").click(function(event){
//   prevNext(true);
// });

// $("#btnNext").click(function(event){
//   prevNext();
// });



//3. When overlay is click
// $overlay.click(function(event){
//   //3.1 Hide the overlay  

//     if(event.target.id == "overlay")
//     $(this).slideUp("fast");

// });


// keyboard nav
// $('#photo-gallery').on('keydown', function(event) {
//   if (event.keyCode === 37) {
//     event.preventDefault();
//     prevNext(true);
//   }
//   else if (event.keyCode === 39) {
//     event.preventDefault();
//     prevNext();
//   }
// });














































