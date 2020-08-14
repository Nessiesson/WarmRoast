$(".name").on("click", function () {
    const $parent = $(this).parent();
    console.log($parent);
    open($parent);
});

function open(el) {
    if (el.hasClass("collapsed")) {
        el.removeClass("collapsed");
        const childs = el.children("ul");
        childs.slideDown(50);
        if (childs.children().length === 1) {
            open(childs.children().find("div").first());
        }
    } else {
        el.addClass("collapsed");
        el.children("ul").slideUp(50);
    }
}

function extractTime($el) {
    const text = $el.children(".name")
        .children(".time").text().replace(/[^0-9]/, "");
    return parseInt(text);
}

const $overlay = $("#overlay");

$(".name").on("mouseenter", function () {
    const $this = $(this);
    let thisTime = null;
    $overlay.empty();
    $this.parents(".node").each(function (i, parent) {
        const $parent = $(parent);
        const time = extractTime($parent);
        if (thisTime == null) {
            thisTime = time;
        } else {
            const $el = $(document.createElement("span"));
            const pos = $parent.position();
            $el.text(((thisTime / time) * 100).toFixed(2) + "%");
            $el.css({
                top: pos.top + "px"
            });
            $overlay.append($el);
        }
    });
});

var myVar = setInterval(myTimer, 5000);

function myTimer() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("stack").innerHTML = this.responseText.parsedHTML.getElementById("stack");
            console.log(this.responseText);
            console.log(this.responseText.parseHTML.getElementById("stack"));
        }
    };
    xhttp.open("GET", "/stack", true);
    xhttp.send();
}

$(".loading").hide();
$(".stack").show();

var refreshTimer = setInterval(reloadStack, 5000);

function reloadStack() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("stack").innerHTML = this.responseText;;
        $(".name").on("click", function(event) {
            var $parent = $(this).parent();
            console.log($parent);
            open($parent);
        });
    }
    };
    xhttp.open("GET", "/ajax", true);
    xhttp.send();
}