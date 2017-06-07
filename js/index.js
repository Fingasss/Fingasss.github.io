var wDelta = 25;
var floatinV=0;
var floatSmth= 1;
var step = 1;
var i = 0;
var tempScroll =0, left = false, num=0;
function moveDodo(inner, outer){
    inner.css({
        "transform": "rotate(-180deg)",
        "transition": "all 2s ease"
    });
    outer.css({
        "transform": "rotate(180deg)",
        "transition": "all 2s ease"
    });
}
function standDodo(inner, outer, pos){
    outer.css({
        "transform": "rotate(0deg)",
        "margin-left":"" + pos + "vw",
        "transition": "all 1s ease"
    });
    inner.css({
        "transform": "rotate(0deg)",
        "transition": "all 1s ease"
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
function windowParalax(selector, st){
    $(selector).css({
        "transform": "translate(" + (st+floatinV*floatSmth*10) + "px,"+ Math.sin(st/100)*10 +"%)"
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
}
$(window).scroll(function(){

    var st = $(this).scrollLeft(),
        dodost = st,
        maxScroll=2500,
        h=$(window).innerHeight(),
        w=$(window).innerWidth();
    if(st>tempScroll)
        left = false;
    else left = true;
    tempScroll = st;
    if((w>765) && (w<1000) && (h>1200)) {
        dodost /= 1.5;
    }
    else
        if(h<700 && w > 1200){
        dodost*=1.6;
        }
        else
        dodost=st;
    if(st<maxScroll) {

        windowParalax(".paralaxed1", st);
        $(".named").css({
           "transform": "translate(" + st + "px,0%)"
        });
        $(".paralaxed2").css({
            "transform": "translate(" + dodost / (window.innerWidth/110) + "vw, 0%)"
        });
        $(".paralaxed3").css({
            "transform": "translate(" + -st / 50 + "vw, 0%)"
        });
        $(".paralaxed4").css({
            "transform": "translate(" + -st / 30 +"vw,"+ (Math.sin(st/100)*10+1) +"%)"
        })
        $(".description").css({
            "transform": "translate("+ st +"px,"+ -st*3 +"%)"
        })
    }

    var inner = $(".dodo"),
        outer = $(".outer_dodo");
    if(!left){
        switch (num){
            case 0:
                standDodo(inner, outer, 10);
                break;
            case 1:
                moveDodo(inner, outer);
                break;
            case 2:
                standDodo(inner, outer, 52);
                break;
            case 3:
                moveDodo(inner, outer);
                break;
        }
    }


});