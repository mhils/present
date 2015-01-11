window.is_print = (location.search.indexOf("print") >= 0);

$(function () {

    $("section").addClass("step slide");
    $("#impress > h1").addClass("step text-center").attr("disabled", true).attr("data-y",-600).each(function(){
        var x = $(this).nextAll("section").attr("data-x");
        $(this).attr("data-x", x);
    });

    //Listen for print event
    var mql = window.matchMedia("print");
    mql.addListener(function (mql) {
        if (mql.media === "print" && location.search.indexOf("print") === -1) {
            window.location.search = "print";
        }
    });

    if (is_print) {
        $(".step, .substep").css("opacity", 1); //Chrome Bugfix
    } else {

        // http://www.ironicsans.com/images/progressbar.jpg
        var steps = $(".step");
        var stepsActive = steps.filter(":not([disabled])");
        var progressBar = $(".presentation-progress .progress-bar");

        var adjustProgress = function () {
            var progress = stepsActive.index(stepsActive.filter(".active")) / (stepsActive.length - 1);
            progressBar.css("width", (progress * 100) + "%");
        };

        var api = impress();
        api.init();

        adjustProgress();
        document.addEventListener("impress:stepleave", adjustProgress);
        // stepleave is only triggered if we aren't in an animation.
        document.addEventListener("impress:stepenter", adjustProgress);

        //Click on background opens overview slide
        $("body").click(function (e) {
            if (e.target === document.body) {
                api.goto(steps[steps.length-1]);
            }
        });

    }
});
