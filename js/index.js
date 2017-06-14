var floatinV=0;
var floatSmth= 1;
var step = 1;
var scrollMount = true;
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

//scrolls
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
function centrateDodo(){
    var curPos=$(window).scrollLeft();
    var dodo=document.getElementById('dod');
    var rec =dodo.getBoundingClientRect().left,
    width = window.innerWidth;
    scrollMount=false;
    if(width>1200)
    $('html,body').animate({'scrollLeft':(curPos-(width*0.35-rec))},500);
    else
        $('html,body').animate({'scrollLeft':(curPos-(width*0.1-rec))},500);
    onEvents();
    setTimeout(function(){scrollMount=true;},1000);
}

function moveDodo(){
        var elem = document.getElementById("dod");
        var posh = 10,
        posv = arr[i];
        var id = setInterval(frame, 10);
        function frame(){
          if(posh===100){
            clearInterval(id);
              setTimeout(function () {
                  centrateDodo();
              }, 600);
          }else{
            posv++;
            posh++;
            elem.style.left = posv/10 +'%';
            elem.style.bottom = (Math.sin(posh/37)*30) + '%';
          }
        }
}

function backDodo(){
        var elem = document.getElementById("dod");
        var posh = 10,
            posv = arr[i];
        var id = setInterval(frame, 10);
        function frame(){
            if(posh===100){
                clearInterval(id);
                setTimeout(function () {
                    centrateDodo();
                }, 600);
            }else{
                posv--;
                posh++;
                elem.style.left = posv/10 +'%';
                elem.style.bottom = (Math.sin(posh/37)*20) + '%';
            }
        }
}

function jumpBack(){
            offEvents();
            if (i > 1) {
                scrollBack();
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
                scrollRight();
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
                scrollRight();
                moveDodo();
                i=5;
                btnOn('btn');

            }else{
                centrateDodo();
            }
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

    undraged();
    scrollToStart();
    onEvents();

    $(window).scroll(function(){
        var st = $(this).scrollLeft();
        windowWHParalax($(".paralaxed1"), st);
        windowHParalax($(".cloud1"), st, 3);
        windowHParalax($(".cloud2"), st, 10);
        if(scrollMount)
            $(".paralaxed3").css({
                "transform": "translate(" + -st / 50 + "%, 0%)"
            });
    });
    };