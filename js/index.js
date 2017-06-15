var floatinV=0;
var floatSmth= 1;
var step = 1, position = 0, off = true;
var  i=0;

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function undraged(){
    setInterval(function(){
        $('img, a').attr({
            "ondrag":"return false",
            "ondragdrop":"return false",
            "ondragstart":"return false"
        })
    }, 300);
}

//scrolls
function catchScroll(){
    var elem = document.getElementById('bod');

    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            elem.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel);
        }
    } else { // IE8-
        elem.attachEvent("onmousewheel", onWheel);
    }
}

function onWheel(e){
    e = e || window.event;

    // deltaY, detail содержат пиксели
    // wheelDelta не дает возможность узнать количество пикселей
    // onwheel || MozMousePixelScroll || onmousewheel
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if(!off){
        if(delta>0)
        jumpRight();
        else
            jumpBack();
    }

    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

//clouds
function clouding(){
    var count = 0, left=false;
    setInterval(function() {
        windowWHParalax($(".paralaxed1"), count);
        windowHParalax($(".cloud1"), count, 3);
        windowHParalax($(".cloud2"), count, 10);
        if(left)
            count--;
        else
            count++;
        if(count===300||count===-300){
            left = (!left);
        }
    }, 600);
}

//arrows
function btnOn(btn){
    document.getElementById(btn).classList.add('btn-animate');
}

//events
function offEvents(){
    $(".jumpBack").off('click');
    $('#bod').off('click');
    $(document).off('keyup');
    off=true;
}

function onEvents(){
    $(".jumpBack").click(function(event){
        event.stopPropagation();
        jumpBack();
    });
    $('#bod').click(function(event){
        event.stopPropagation();
        jumpRight();
    });
    $(document).keyup(function(e) {
        if(e.which === 39 || e.keyCode === 39) {
            jumpRight();
        }
        else
        if(e.which === 37 || e.keyCode === 37){
            jumpBack();
        }
    });
    off=false;
}

//text fade
function firstIteration(){
    document.getElementById('finger').style.display = "none";
    document.getElementById('headertext').classList.add('named_small');
    document.getElementById('headertext').classList.remove('named');
    slideFText($(".des1"));
}

function slideFText(next){
    next.css({
        "display":"block",
        "left":"50%",
        "right":"5%",
        "opacity":"1",
        "transition":"all 1s ease"
    });
}

function slideText(prev, next){
    prev.css({
        "opacity":"0",
        "transition":"all 1s ease",
        "display":"none"
    });
    slideFText(next);
}


//moving
function walk(){
    document.getElementById('inner_dod').classList.add('walking');
    document.getElementById('inner_dod').classList.remove('idle');
}
function idle() {
    document.getElementById('inner_dod').classList.add('idle');
    document.getElementById('inner_dod').classList.remove('walking');
}

function moveDodo(float=1){
        mounains(position+=500*float);
        walk();
        var time = setTimeout(function(){
            idle();
            onEvents();
        }, 3000);
}

//"jumps"
function jumpBack(){
            offEvents();
            if (i > 1) {
                if(i>0){
                    slideText($(".des"+(i+1)),$(".des"+(i)));
                }
                moveDodo(-1);
                i--;
            }
            else{
                onEvents();
            }
}

function jumpRight(){
            offEvents();
            if(i<4) {
                if(i===0) {
                    firstIteration();
                }
                else if(i>0){
                    slideText($(".des"+(i)),$(".des"+(i+1)));
                }
                moveDodo();
                i++;
            }
            else if(i===4){
                moveDodo();
                i=5;
                btnOn('btn');
            }else{
                onEvents();
            }
}

//parallax effects

function mounains(st){
    $(".paralaxed3").css({
        "transform": "translate(" + -st / 50 + "%, 0%)"
    });
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
    undraged();
    catchScroll();
    onEvents();
    clouding();
    idle();
    document.getElementById('inner_dod').classList.remove('preload');
    document.getElementById('sound').innerHTML ='<source src="src/sound/bgm01.mp3" hidden="true" />';
    };