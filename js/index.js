var floatinV=0;
var floatSmth= 1;
var step = 1, position = 0;
var  i=0, arr=[100, 200, 300, 400, 500, 600, 700];

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

function btnOff(btn){
    document.getElementById(btn).classList.remove('btn-animate');
}

//events
function offEvents(){
    $(".jumpBack").off('click');
    $('#bod').off('click');
    $(document).off('keyup');
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

function moveDodo(){
        mounains(position+=500);
        walk();
        var counter =0, why = setInterval(function(){
            counter++;
            if(counter ===300){
                idle();
                onEvents();
                clearInterval(why);
            }
        }, 10);
}

//"jumps"
function jumpBack(){
            offEvents();
            if (i > 1) {
                if(i>0){
                    slideText($(".des"+(i+1)),$(".des"+(i)));
                }
                backDodo();
                btnOff('btn');
                i--;
            }else{
                centrateDodo();
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
                centrateDodo();
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
    onEvents();
    clouding();
    };