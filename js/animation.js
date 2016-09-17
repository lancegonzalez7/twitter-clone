$(document).ready(function() {
    $("#tweet-controls").addClass("hidden");
    $(".tweet-actions").addClass("hidden");
    $(".stats").addClass("hidden");
    $(".reply").addClass("hidden");

    $("#tweet-content .tweet-compose").on("click", function() {
        $("#tweet-content #tweet-controls").removeClass("hidden");
        tweetHeight = $("#tweet-content .tweet-compose").css("height");
        if (tweetHeight === "33px") {
            $("#tweet-content .tweet-compose").css("height", "+=" + tweetHeight);
        }
        return tweetHeight;
    });

    $("#tweet-content .tweet-compose").keyup(function() {
        var len = $(this).val().length;
        if (len <= 140) {
            $("#tweet-controls #tweet-submit").prop("disabled", false);
            if (len > 129) {
                $("#char-count").text(140 - len);
                $("#char-count").css("color", "red");
            } else {
                $("#char-count").text(140 - len);
                $("#char-count").css("color", "#999");
            }
        } else {
            $("#char-count").text(140 - len);
            $("#tweet-controls #tweet-submit").prop("disabled", true);
        }
    });

    var currentUser = {
        pic: 'img/alagoon.jpg',
        fullname: "Lance Gonzalez",
        username: "@newbsauce"
    }

    var timeStamp = function() {
        var d = new Date();
        var ampm = function() {
            if (d.getHours() < 12) {
                return 'AM';
            } else {
                return 'PM';
            }
        }

        var hour = function() {
            if (d.getHours() < 12) {
                return d.getHours();
            } else {
                return d.getHours()-12;
            }
        }

        function addZero(value) {
            if (value < 10) {
                value = "0" + value;
            }
            return value;
        }

        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return (hour() + ":" + addZero(d.getMinutes()) + " " + ampm() + " - " + addZero(d.getDate()) + " " + months[d.getMonth()] + " " + d.getFullYear().toString().substr(2, 2));
    }

    // var tweet = function(content, user) {
    //     var tweetBlock = '<div class="tweet">' +
    //         '<div class="content">' +
    //         '<img class="avatar" src="' + user.pic + '" />' +
    //         '<strong class="fullname">' + user.fullname + " " + '</strong>' +
    //         '<span class="username">' + user.username + '</span>' +
    //         '<p class="tweet-text">' + content + '</p>' +
    //         '<div class="tweet-actions">' +
    //         '<ul>' +
    //         '<li><span class="icon action-reply"></span> Reply</li>' +
    //         '<li><span class="icon action-retweet"></span> Retweet</li>' +
    //         '<li><span class="icon action-favorite"></span> Favorite</li>' +
    //         '<li><span class="icon action-more"></span> More</li>' +
    //         '</ul>' +
    //         '</div>' +
    //         '<div class="stats hidden">' +
    //         '<div class="retweets">' +
    //         '<p class="num-retweets">0</p>' +
    //         '<p>RETWEETS</p>' +
    //         '</div>' +
    //         '<div class="favorites">' +
    //         '<p class="num-favorites">0</p>' +
    //         '<p>FAVORITES</p>' +
    //         '</div>' +
    //         '<div class="users-interact">' +
    //         '<div>' +
    //         '</div>' +
    //         '</div>' +
    //         '<div class="time">' +
    //         timeStamp(); +
    //     '</div>' +
    //     '</div>' +
    //     '<div class="reply hidden">' +
    //     '<img class="avatar" src="' + user.pic + '" />' +
    //         '<textarea class="tweet-compose" placeholder="Reply to ' + user.username + '"/></textarea>' +
    //         '</div>' +
    //         '</div>' +
    //         '</div><!-- .tweet -->';
    //
    //     return tweetBlock;
    // };

    $("#stream").on("mouseenter", '.tweet', function() {
        $(this).find($(".tweet-actions")).removeClass("hidden");
    });
    $("#stream").on("mouseleave", '.tweet', function() {
        $(this).find($(".tweet-actions")).addClass("hidden");
    });

    $("#stream").on("click", '.tweet', function() {
        $(this).find($(".stats")).toggle('fast');
        $(this).find($(".reply")).toggle("fast");
    });



    $("#tweet-submit").on("click", function() {
        var newTweet = $(".tweet").first().clone();
        newTweet.find(".avatar").attr('src', currentUser.pic);
        newTweet.find(".fullname").html(currentUser.fullname);
        newTweet.find(".username").html(currentUser.username);
        newTweet.find(".time").html(timeStamp());
        newTweet.find(".tweet-text").html($('.tweet-compose').val());
        newTweet.find('.num-retweets').html(0);
        newTweet.find('.num-favorites').html(0);
        newTweet.find('.users-interact div img').remove();


        $("#tweet-controls").addClass("hidden");
        // var newTweet = tweet($('.tweet-compose').val(), currentUser);
        $("#stream").prepend(newTweet);
        $('.tweet-compose').val("");
        $("#tweet-content .tweet-compose").css("height", "33px");
        $(".tweet").find($(".tweet-actions")).addClass("hidden");
    });







});
