// Searchbar Handler
$(function(){
	var searchField = $('#query');
	var icon = $('#search-btn');

	//Focus Handler
	$(searchField).on('focus', function(){
		$(this).animate({
			width:'100%'
		}, 400);
		$(icon).animate({
			right: '10px'
		}, 400);
	});

	// Blur Event Handler
	$(searchField).on('blur', function(){
		if(searchField.val() == ''){
			$(searchField).animate({
				width:'45%'
			}, 400, function(){});
			$(icon).animate({
				right: '360px'
			}, 400, function(){});
		}
	});

	//To prevent the form from submitting
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
})

function search(){
	//clear Results
	$('#results').html('');
	$('#buttons').html('');

	// Get Form Input
	q = $('#query').val();

	//Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q,
			type: 'video',
			key:'AIzaSyCAGzHosxLpZTNy4LIudAUi9AAMieS0EEI'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				//Log Data
				console.log(data);

				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);

					//Display Results
					$('#results').append(output);
				});
			}
	);
}