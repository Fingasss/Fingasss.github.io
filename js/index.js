var floatinV=0;
var floatSmth= 1;
var step = 1;
var tempScroll =0, left = false, i=0, arr=[100, 200, 300, 400, 500, 600, 700];

function offEvents(){
    $(".jumpBack").off('click');
    $('#bod').off('click');
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
}

//text fade
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
    if(width>1200)
    $('html,body').animate({'scrollLeft':(curPos-(width*0.35-rec))},500);
    else
        $('html,body').animate({'scrollLeft':(curPos-(width*0.1-rec))},500);
}

function moveDodo(){
        var elem = document.getElementById("dod");
        var posh = 10,
        posv = arr[i];
        var id = setInterval(frame, 10);
        function frame(){
          if(posh===100){
            clearInterval(id);
                onEvents();
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
            posv = arr[i+1];
        var id = setInterval(frame, 10);
        function frame(){
            if(posh===100){
                clearInterval(id);
                onEvents();
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
            scrollBack();
            if (i > 1) {
                offEvents();
                if(i>0){
                    slideText($(".des"+(i+1)),$(".des"+(i)));
                }
                backDodo();
                document.getElementById('arrow').style.display = "none";
                document.getElementById('arrow').style.opacity = 0;
                document.getElementById('left_a').style.display = "none";
                document.getElementById('left_a').style.opacity = 0;
                i--;
            }else{
                centrateDodo();
            }
}

function jumpRight(){
            scrollRight();
            if(i<4) {
                offEvents();
                if(i===0) {
                    document.getElementById('finger').style.display = "none";
                    document.getElementById('headertext').classList.add('named_small');
                    document.getElementById('headertext').classList.remove('named');
                    slideFText($(".des1"));
                }
                else if(i>0){
                    slideText($(".des"+(i)),$(".des"+(i+1)));
                }
                moveDodo();
                i++;
            }
            else if(i===4){
                offEvents();
                moveDodo();
                i=5;
                if(window.innerWidth>800) {
                    document.getElementById('left_a').style.display = "block";
                    document.getElementById('left_a').style.opacity = 1;
                }
                document.getElementById('arrow').style.display = "block";
                document.getElementById('arrow').style.opacity = 1;

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

    //Ставим интервал выполнения
    setInterval(function(){
//находим теги img и ставим атрибуты
        $('img, a').attr({
            "ondrag":"return false",
            "ondragdrop":"return false",
            "ondragstart":"return false"
        })
//выполняем каждые 0,3 сек
    }, 300);

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
$("#bod").click(function(event){
        event.stopPropagation();
        jumpRight();
});
$(".jumpBack").click(function(event){
        event.stopPropagation();
        jumpBack();
});
