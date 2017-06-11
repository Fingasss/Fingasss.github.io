var block = false;
var floatinV=0;
var floatSmth= 1;
var step = 1;
var tempScroll =0, left = false, i=0, arr=[0, 100, 200, 300, 400];
var _callb = true;
var inner = $(".dodo"),
    outer = $(".outer_dodo"),
    outerR = $(".outer_dodo_r");

//text fade
function slideFText(next){
    next.css({
        "left":"50%",
        "right":"5%",
        "opacity":"1",
        "transition":"all 1s ease"
    });
}

function slideText(prev, next){
    prev.css({
        "opacity":"0",
        "transition":"all 1s ease"
    });
    slideFText(next);
}

//scrolling effects
function scrollDoc(e) {
    if(!block) {
        block=true;
        if (!e) e = event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var __delta = e.wheelDelta || -e.detail;
        __delta < 0 ? jumpRight() : jumpBack();
        e = null;
    }
}

function scrollBack(){
    var curPos1=$(window).scrollLeft();
    var width1=$(window).width()/4;
    var scrollTime1=500;
    if((curPos1-width1)>0)
        $("html,body").animate({"scrollLeft":curPos1-width1},scrollTime1);
    else $("html,body").animate({"scrollLeft":0}, scrollTime1);
}

function scrollRight(){
    var curPos=$(window).scrollLeft();
    var width=$(window).width()/4;
    var scrollTime = 500;
    $('html,body').animate({'scrollLeft':(curPos+width)},scrollTime);
}

function scrollToStart(){
    var scrollTime1=500;
    $("html,body").animate({"scrollLeft":0},scrollTime1);
}

//dodo moving
function moveDodo(){
    var inte = setInterval(function(){
        var elem = document.getElementById("dod");
        var posh = 10,
        posv = arr[i];
        var id = setInterval(frame, 10);
        function frame(){
          if(posh===100){
            clearInterval(id);
          }else{
            posv++;
            posh++;
            elem.style.left = posv/10 +'%';
            elem.style.bottom = (Math.sin(posh/37)*20) + '%';
          }
        }
        clearInterval(inte);
        return false;
    }, 500);
}

function jumpBack(){
    var int2 = setInterval(function() {
        if (_callb) {
            _callb = false;
            scrollBack();
            if (i > 1) {
                if(i>0){
                    slideText($(".des"+(i+1)),$(".des"+(i)));
                }
                document.getElementById('dod').className = 'outer_dodo_r';
                moveDodo(inner, outerR, 1, _callb2);
                i--;
            }
            clearInterval(int2);
            setTimeout(function () {
                _callb=true;
                block=false;
            }, 1200);
        }
    }, 500);
}

function jumpRight(){
    var int1 = setInterval(function(){
        if(_callb){
            _callb=false;
            scrollRight();
            if(i<4) {
                if(i===0) {
                    document.getElementById('headertext').style.fontSize = "200%";
                    document.getElementById('headertext').style.marginLeft = "30%";
                    document.getElementById('headertext').style.marginRight = "30%";
                    slideFText($(".des1"));
                }
                else if(i>0){
                    slideText($(".des"+(i)),$(".des"+(i+1)));
                }
                document.getElementById('dod').className = 'outer_dodo';
                moveDodo(inner, outer, 1);
                i++;
            }
            clearInterval(int1);
            setTimeout(function () {
                _callb=true;
                block=false;
            }, 1200);
        }
    }, 500);
}

//parallax effects
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

    $(document).keyup(function(e) {
        if(e.which === 39 || e.keyCode === 39) {
            jumpRight();
        }
        else
            if(e.which === 37 || e.keyCode === 37){
                jumpBack();
            }
        });
    };

$(window).scroll(function(){
    var st = $(this).scrollLeft(),
        maxScroll=2500;
    left=!(st>tempScroll);
    tempScroll = st;
    if(st<maxScroll) {

        windowWHParalax(".paralaxed1", st);
        windowHParalax(".cloud1", st, 3);
        windowHParalax(".cloud2", st, 10);
        $(".paralaxed3").css({
            "transform": "translate(" + -st / 50 + "%, 0%)"
        });
    }
});
