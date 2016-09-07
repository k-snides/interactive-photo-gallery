// var photos = [
// 	{
// 		name: 'Hay Bales',
// 		caption: 'I love hay bales. Tohapok this snap on a drive through the countryside past some straw fields.'
// 	},
// 	{
// 		name: 'Lake',
// 		caption: 'The lake was so calm today. We had a great view of the snow on the mountains from here.'
// 	}
// ]

// Variables
var $overlay    = $('<div id="overlay"></div>');
var $image      = $("<img>");
var $figCaption = $('<figcaption></figcaption>');


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























