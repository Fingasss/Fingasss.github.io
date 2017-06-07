var wDelta = 15;
var floatinV=0;
var floatSmth= 1;
var step = 1;
var tempScroll =0, left = false, num=0, i=0, arr=[0, 42, 84, 126, 168];

function scrollBack(){
    var curPos1=$(window).scrollLeft();
    var width1=$(window).width()/10;
    var scrollTime1=500;
    if((curPos1-width1)>0)
        $("html, body").animate({"scrollLeft":curPos1-width1},scrollTime1);
    else $("html, body").animate({"scrollLeft":0}, scrollTime1);
}

function scrollRight(){
    var curPos=$(window).scrollLeft();
    var width=$(window).width()/10;
    var scrollTime=500;
    $("html, body").animate({"scrollLeft":curPos+width},scrollTime);
}

function scrollToStart(){
    var scrollTime1=500;
    $("html, body").animate({"scrollLeft":0},scrollTime1);
}

function moveDodo(inner, outer){
    inner.css({
        "transform": "rotate(-180deg)",
        "transition": "all 1.2s ease"
    });
    outer.css({
        "transform": "rotate(180deg)",
        "transition": "all 1.2s ease"
    });
}
function standDodo(inner, outer, pos){
    outer.css({
        "transform": "rotate(0deg)",
        "margin-left":"" + pos + "vw",
        "transition": "margin-left 0s ease"
    });
    inner.css({
        "transform": "rotate(0deg)",
        "transition": "all 0s ease"
    });
}
function scrollDoc(e) {
    if (!e) e = event;
    if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
    var __delta = e.wheelDelta || -e.detail;
    __delta /= Math.abs(__delta);
    document.documentElement.scrollLeft -= __delta * wDelta; // FF, Opera, IE
    if (this.attachEvent) return false;
    document.body.scrollLeft -= __delta * wDelta; // Chrome
}
function windowWHParalax(selector, st){
    $(selector).css({
        "transform": "translate(" + (st+floatinV*floatSmth*5) + "px,"+ Math.sin(st/100)*10 +"%)"
    });
    if(floatinV>40) {
        floatSmth*=-1;
        floatinV = 0;
        step++;
    }
    floatinV++;
}
function windowHParalax(selector, st, koef){
    $(selector).css({
        "transform": "translate(" + (st+0.1) + "px,"+ Math.sin(st/100*koef)*10 +"%)"
    });
    if(floatinV>20) {
        floatSmth*=-1;
        floatinV = 0;
        step++;
    }
    floatinV++;
}


window.onload = function() {
    var html = document.documentElement;
    if (html.attachEvent) {
        html.attachEvent("onmousewheel", scrollDoc); // IE and Opera
    } else {
        html.addEventListener("DOMMouseScroll", scrollDoc, false); // FF
        html.addEventListener("mousewheel", scrollDoc, false); // Chrome
    }

    scrollToStart();

    $(document).keypress(function(e) {
        if (e.which === 39 || e.keyCode === 39) {
            scrollRight();
        }
        else
        if(e.which === 37 || e.keyCode === 37){
            scrollBack();
        }
    });
};

$(window).scroll(function(){
    var st = $(this).scrollLeft(),
        maxScroll=2500;
    var position = (100*st)/$(window).width();
    left=!(st>tempScroll);
    tempScroll = st;
    if(st<maxScroll) {

        windowWHParalax(".paralaxed1", st);
        windowHParalax(".cloud1", st, 2);
        windowHParalax(".cloud2", st, 3);
        $(".named").css({
           "transform": "translate(" + st + "px,0%)"
        });
        $(".paralaxed3").css({
            "transform": "translate(" + -st / 50 + "vw, 0%)"
        });
    }
    var inner = $(".dodo"),
        outer = $(".outer_dodo");

    if(!left){
        if((position/12)>i&&i<10) {
            if (num) {
                setTimeout(moveDodo(inner, outer), 1500);
                i++;
                num--;
            } else {
                setTimeout(standDodo(inner, outer, arr[i / 2]), 1500);
                i++;
                num++;
            }
        }
    }else{

    }
});