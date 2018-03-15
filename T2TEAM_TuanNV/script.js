$(document).ready(function () {
	var counter = 0;
	function add() {
		return counter += 1;
	}
	$('#btnDel').on('click', function () {
		var ID = $('#idSiin').val();
		var TOKEN = $('#tokenSiin').val();
		$.get("https://graph.facebook.com/" + ID + "/feed?access_token=" + TOKEN + "&limit=5000&fields=id", function(response) {
			$('#soPost').text(response.data.length);
			for (i = 0; i < response.data.length; i++) {
				$.ajax({
					url: 'https://graph.facebook.com/' + response.data[i].id + '?access_token=' + TOKEN,
					method: 'DELETE',
					success: function(response) {
						$('#delPost').val(add());
					},
					error: function(response) {
						console.log(response);
					}
				});
			}
		});
	});
	$('#btnGet').on('click', function () {
		$('#codeToken').toggleClass('hideSiinDepTry');
		$.get("https://raw.githubusercontent.com/Tuannvd00538/T2TEAM-Community/master/T2TEAM_TuanNV/gettoken.js", function(response) {
			$('#codeSiin').val(response);
		});
	});
});