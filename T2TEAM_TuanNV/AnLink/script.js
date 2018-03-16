$(document).ready(function () {
	$("button").click(function () {
		$.GoogleURLShortener({
			url: $("input").val(),
			success: function (url, response) {
				$("#result").text('Url đã khóa: ' + url);
			},
			error: function (message, response) {
				$("#result").text(message);
			}
		});
	});
})