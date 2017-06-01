var wDelta = 25;
function scrollDoc(e) {
    if (!e) e = event;
    if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
    var __delta = e.wheelDelta || -e.detail;
    __delta /= Math.abs(__delta);
    document.documentElement.scrollLeft -= __delta * wDelta; // FF, Opera, IE
    if (this.attachEvent) return false;
    document.body.scrollLeft -= __delta * wDelta; // Chrome
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
    if(((w>765)) && (w<1000) && (h>1200)) {
        dodost /= 1.5;
    }
    else
        if(h<700 && w > 1200){
        dodost*=1.6;
        }
        else
        dodost=st;
    if(st<maxScroll) {

        $(".paralaxed1").css({
            "transform": "translate(" + -st / 100 + "%,"+ Math.sin(st/100)*10 +"%)"
        });
        $(".paralaxed2").css({
            "transform": "translate(" + dodost / 3 + "%, 0%)"
        });
        $(".paralaxed3").css({
            "transform": "translate(" + -st / 50 + "%, 0%)"
        });
        $(".paralaxed4").css({
            "transform": "translate(" + -st / 30 +"%,"+ (Math.sin(st/100)*10+1) +"%)"
        })
    }


});