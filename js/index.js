var wDelta = 25;
var floatinV=0;
var floatSmth=1;
var step =1;
function opacitiDes(opacity = [0, 0, 0, 0]){
    $(".description1").css("opacity", opacity[0]);
    $(".description2").css("opacity", opacity[1]);
    $(".description3").css("opacity", opacity[2]);
    $(".description4").css("opacity", opacity[3]);
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
function windowParalax(selector, st, addition=1, koef=1){
    $(selector).css({
        "transform": "translate(" + (st+floatinV*floatSmth*20*addition) + "px,"+ Math.sin(st/100)*10 +"%)"
    });
    console.log(floatinV*floatSmth);
    if(floatinV>10) {
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
        windowParalax(".named", st, -1.2, 1);
        console.log(floatSmth);
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

    if(st>200) {
        opacitiDes(["0.4", "0", "0", "0"]);
        if(st>400){
            opacitiDes(["0.8", "0.4", "0", "0"]);
            if(st>600){
                opacitiDes(["1", "0.8", "0.4", "0"]);
                if(st>800){
                    opacitiDes(["0.5", "1", "0.8", "0.4"]);
                    if(st>1000) {
                        opacitiDes(["0", "0.5", "0.6", "1"]);
                        if (st > 1200) {
                            opacitiDes(["0", "0", "0.2", "0.8"]);
                        }
                    }
                }
            }
        }
    }

});