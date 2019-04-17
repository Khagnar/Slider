$(function () {

    var slider = $("#slider");
    var list = slider.find("ul");
    var slides = list.find("li");
    var next = $("#slider_next");
    var prev = $("#slider_prev");
    var nav = $(".slider-nav");

    var current = 0;

    var autoDir = "next";
    var autoPlayTimer;
    var delayTimer;

    var navHtml = "";
    for (var i=0; i<slides.length; i++) {
        navHtml += "<span data-number='" + i + "'></span>";
    }

    nav.html(navHtml);

    nav.find("span").click(function () {
        current = $(this).data("number");
        changeSlide();
        stopAutoplay();
        restartAutoplay();
    });

    var changeNavClass = function () {
        nav.find(".active").removeClass("active");
        nav.find("[data-number='" + current +"']").addClass("active")
    };

    changeNavClass();

    var changeButtonsVisibility = function () {
        if (current == 0) {
            prev.hide();
        } else {
            prev.show();
        }

        if (current == slides.length - 1) {
            next.hide();
        } else {
            next.show();
        }
    };

    changeButtonsVisibility();

    var changeSlide = function (dir) {
        if (dir == "next") {
            if (current < slides.length - 1) {
                current++;
            }
        } else if(dir == "prev") {
            if (current > 0) {
                current--;
            }
        }

        changeButtonsVisibility();
        changeNavClass();

        var left = -current * slider.width() + "px";
        list.css("margin-left", left);
    };

    var startAutoplay = function () {
        autoPlayTimer = setInterval(function () {
            if (current == 0) {
                autoDir = "next";
            }

            if (current == slides.length - 1) {
                autoDir = "prev";
            }

            changeSlide(autoDir);
        }, 2500);
    };

    startAutoplay();

    var stopAutoplay = function () {
        clearInterval(autoPlayTimer);
    };

    var restartAutoplay = function () {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(startAutoplay, 10000);
    };

    next.click(function () {
        changeSlide("next");
        stopAutoplay();
        restartAutoplay();
    });

    prev.click(function () {
        changeSlide("prev");
        stopAutoplay();
        restartAutoplay();
    });

    $("body").keydown(function (e) {
        if (e.keyCode == 37) {
            changeSlide("prev");
            stopAutoplay();
            restartAutoplay();
        }

        if (e.keyCode == 39) {
            changeSlide("next");
            stopAutoplay();
            restartAutoplay();
        }
    });
});