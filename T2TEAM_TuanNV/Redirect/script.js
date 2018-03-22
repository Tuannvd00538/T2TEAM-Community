$(document).ready(function () {
	$.get("https://raw.githubusercontent.com/Tuannvd00538/T2TEAM-Community/master/T2TEAM_TuanNV/linkAG.txt", function(response) {
		var link = response.split(';');
		$('#results').html('<img src="' + link[Math.floor((Math.random() * 10000) + 1)] + '" width="400px"/>');
	});
});