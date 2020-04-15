$(".name").on("click", function(event) {
    var $parent = $(this).parent();
    console.log($parent);
    open($parent);
});

function open(el) {
    if (el.hasClass("collapsed")) {
        el.removeClass("collapsed");
        var childs = el.children("ul");
        childs.slideDown(50);
        if(childs.children().length == 1) {
            open(childs.children().find("div").first());
        }
    } else {
        el.addClass("collapsed");
        el.children("ul").slideUp(50);
    }
}

function extractTime($el) {
    var text = $el.children(".name")
        .children(".time").text().replace(/[^0-9]/, "");
    return parseInt(text);
}

var $overlay = $("#overlay");

$(".name").on("mouseenter", function(event) {
    var $this = $(this);
    var thisTime = null;
    $overlay.empty();
    $this.parents(".node").each(function(i, parent) {
        var $parent = $(parent);
        var time = extractTime($parent);
        if (thisTime == null) {
            thisTime = time;
        } else {
            var $el = $(document.createElement("span"));
            var pos = $parent.position();
            var width = $el.outerWidth();
            $el.text(((thisTime / time) * 100).toFixed(2) + "%");
            $el.css({
                top: pos.top + "px"
            });
            $overlay.append($el);
        }
    });
});

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