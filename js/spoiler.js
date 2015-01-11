$(function () {
    var spoilers = $("[data-spoiler]");
    spoilers.each(function () {
        var spoiler = $(this);
        var target = $(spoiler.data("spoiler"));
        target.hide();
        spoiler.click(function () {
            spoiler.hide();
            target.show();
        });
    });
    if (is_print) {
        spoilers.click();
    } else {
        spoilers.filter("[disabled]").click();
    }
});