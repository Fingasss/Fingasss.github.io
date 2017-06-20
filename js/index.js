var floatinV=0;
var floatSmth= 1;
var step = 1, position = 0, off = true, right=true;
var  i=0;
var audio = document.getElementById('sound'), paused=true;

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
    $('.left_btn').off('click');
    $('.right_btn').off('click');
    $(document).off('keyup');
    off=true;
}

function onEvents(){
    $(".left_btn").click(function(event){
        event.stopPropagation();
        jumpBack();
    });
    $('.right_btn').click(function(event){
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

/*function volumeBtn(){
    if(paused){
        audio.play();
        document.getElementById('vol').classList.add('fa-volume-down');
        document.getElementById('vol').classList.remove('fa-volume-off');
    }
    else {
        audio.pause();
        document.getElementById('vol').classList.add('fa-volume-off');
        document.getElementById('vol').classList.remove('fa-volume-down');
    }
    paused = (!paused);
}*/

//moving
function walk(){
    console.log(right);
    if(right){
        document.getElementById('inner_dod').classList.add('walking');
        if(window.innerWidth>1200)
        document.getElementById('dod').style.transform = "translate(0,0)";
        document.getElementById('inner_dod').classList.remove('idle');
        document.getElementById('inner_dod').classList.remove('idle-left');
        document.getElementById('inner_dod').classList.remove('walking-left');
    }else{
        document.getElementById('inner_dod').classList.add('walking-left');
        if(window.innerWidth>1200)
        document.getElementById('dod').style.transform = "translate(200%,0)";
        document.getElementById('inner_dod').classList.remove('idle-left');
    }
}
function idle() {
    console.log(right);
    if(right){
        document.getElementById('inner_dod').classList.add('idle');
        if(window.innerWidth>1200)
        document.getElementById('dod').style.transform = "translate(0,0)";
        document.getElementById('inner_dod').classList.remove('walking');
        document.getElementById('inner_dod').classList.remove('idle-left');
        document.getElementById('inner_dod').classList.remove('walking-left');
    }else{
        document.getElementById('inner_dod').classList.add('idle-left');
        if(window.innerWidth>1200)
        document.getElementById('dod').style.transform = "translate(200%,0)";
        document.getElementById('inner_dod').classList.remove('walking-left');
    }
}

function backDodo(){
    mounains(position-=500);
    walk();
    var time = setTimeout(function(){
        idle();
        onEvents();
    }, 2500);
}

function moveDodo(){
        mounains(position+=500);
        walk();
        var time = setTimeout(function(){
            idle();
            onEvents();
        }, 2500);
}

//"jumps"
function jumpBack(){
            right=false;
            offEvents();
            if (i > 1) {
                if(i>0){
     //               slideText($(".des"+(i)),$(".des"+(i-1)));
                }
                backDodo();
                i--;
            }
            else{
                onEvents();
            }
}

function jumpRight(){
            right=true;
            offEvents();
            if(i<4) {
                if(i===0) {
                //    firstIteration();
                }
                else if(i>0){
         //           slideText($(".des"+(i)),$(".des"+(i+1)));
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
    $('#sound').attr('src', 'src/sound/bgm01.mp3');
  //  volumeBtn();
    $('#vol').click(function(event){
       event.stopPropagation();
 //      volumeBtn();
    });
    };