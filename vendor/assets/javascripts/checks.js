var Checks = function () {
    return {
        init:function () {
            if (test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle)")) {
                test.uniform();
            }
        }

    }
}();