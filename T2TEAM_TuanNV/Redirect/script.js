$(document).ready(function () {
	$.get("https://raw.githubusercontent.com/Tuannvd00538/T2TEAM-Community/master/T2TEAM_TuanNV/link.txt", function(response) {
		var link = response.split('\n');
		console.log(link.length);
		$('#results').html('<img src="' + link[Math.floor((Math.random() * 100) + 1)] + '"/>')
	});
});