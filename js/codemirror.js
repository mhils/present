//Init Code Editor
$(function(){
    $(".code-editor").each(function () {
        var textarea = $(this).find("textarea");
        var output = $(this).find(".output");
        var editor = CodeMirror.fromTextArea(textarea[0], {
            mode: "javascript",
            lineNumbers: true
        });
        editor.setSize(textarea.width(), textarea.height());
        editor.getInputField().addEventListener("keyup", function (e) {
            e.stopPropagation();
            if (e.keyCode == 32) {
                //No idea why this is neccessary.
                editor.replaceSelection(" ");
            }
        });
        var execute = function () {
            var code = editor.getValue();
            var stdout = "";
            var stdout_count = 1;
            with ({
                print: function () {
                    stdout += Array.prototype.slice.call(arguments).join(" ");
                },
                println: function () {
                    stdout += "[" + ("  " + stdout_count++).slice(-3) + "] " + Array.prototype.slice.call(arguments).join(" ") + "\r\n";
                }
            }) {
                try {
                    eval(code);
                    output.text(stdout).toggleClass("alert-danger", false);

                } catch (e) {
                    output.text(e).toggleClass("alert-danger", true);
                }
            }
        };
        editor.on("changes", execute);
        execute();
        //window.editor = editor;
    });
});