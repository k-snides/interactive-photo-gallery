// Variables
var $overlay    = $('<div id="overlay"></div>');
var $image      = $("<img>");
var $figCaption = $('<figcaption></figcaption>');

/* ----- Begin Overlay ----- */
// Add an image to the overlay
$overlay.append($image);

// Add a caption to the overlay
$overlay.append($figCaption);

// Add overlay to the body element
$('body').append($overlay);

// Display large photo in overlay on click
$('#photo-gallery a').on('click', function(event) {

	// Prevents browsers default action on links
	event.preventDefault();

	// Gets image src on clicked image
	var imageLocation = $(this).attr("href");

	// Attach image src href to $image with imageLocation
	$image.attr("src", imageLocation);

	// Show the overlay
	$overlay.show();

	// Get child's title attribute for caption
	var captionText = $(this).children("img").attr("title");

	// Set title text to $figCaption
	$figCaption.text(captionText);
});

// Close overlay when clicked
$overlay.on('click', function() {
	// Hides the overlay
	$overlay.hide();
});
/* ----- End Overlay ----- */


/* ----- Begin Search ----- */
$('#search').on('keyup click input', function() {

	var search = $(this).val().toLowerCase();
	 
	 $('#photo-gallery img').each(function(){
	 	var text = $(this).attr('title').toLowerCase();
	 
	 	if(text.indexOf(search) !== -1) {
	 		$(this).closest('li').show('slow');
	 	}
	 	else {
	 		$(this).closest('li').hide('slow');
	 	}
	});
});






















































