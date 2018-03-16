$(document).ready(function () {
	$("button").click(function () {
		$.GoogleURLShortener({
			url: $("input").val(),
			success: function (url, response) {
				$(".panel-body").text(url);
			},
			error: function (message, response) {
				$(".panel-body").text(message);
			}
		});
	});
})