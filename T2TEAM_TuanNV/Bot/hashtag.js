const fs = require("fs");
const request = require('request');
const tokenFacebook = "EAACW5Fg5N2IBAOdy5HdVEQ1lLn6Ie4trJZATh5oH7rUhZBkmYr7JpZATTZC1ZChXSYhiZA6mTnVWui6kWP94nNoWfa4Y8WHXhRfOcZBsGqKVImC01E4USL3rSsklhmqsVZA5rnirBezWVyAUeSyW6w5ZBzuOsze3UAtIxjsGI9w4u0PVT5whxMZCybQ7lMsKsCzw0ZD";
const idGroup = "614878965530147";
var hashtag = ["#bfg_"];
var regexp = new RegExp(hashtag.join('|'), 'g');
var remindedID = {};
var message, idPost, idUser;

function post_comment(contentComment, idPost) {
    if (contentComment.trim() != "")
        request("https://graph.facebook.com/" + idPost + "/comments/?method=post&message=" + encodeURI(contentComment) + "&access_token=" + tokenFacebook, (err, res, body) => {
            json = JSON.parse(body);
            if (!(json["error"] == undefined || json["error"] == null)) {
                console.log("Thất bại");
            }

        });

}
setInterval(() => {
    request('https://graph.facebook.com/v2.9/' + idGroup + '/feed?fields=id,message,created_time,from&limit=5&access_token=' + tokenFacebook, (error, response, body) => {
        if (error) console.log(error);
        json = JSON.parse(body);

        if (!json.error) {

            for (var i = 0; i < json.data.length; i++) {
                message = json.data[i].message;
                idPost = json.data[i].id;
                idUser = json.data[i].from.id;
                if (message != undefined && message !=null && !regexp.test(message.toLowerCase()) && !remindedID.hasOwnProperty(idPost)) {

                    var comment = "Bạn @[" + idUser + ":0] ơi, thiếu hashtag kìa :P | https://goo.gl/K8CFKt";
                        post_comment(comment, idPost);
                    remindedID[idPost] = true;
                    console.log("Nhắc nhở bài viết: https://www.facebook.com/" + idPost);
                }
            }


        }
    });
}, 5000);