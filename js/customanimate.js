var arr = [0, 100, 200, 300];
function jump(){
  var elem = document.getElementById("sq");
  var posh = 0,
  posv = arr[0];
  var id = setInterval(frame, 10);
  function frame(){
    if(posh===100){
      clearInterval(id);
    }else{
      posv++;
      posh++;
      elem.style.left = posv/2 +'%';
      elem.style.bottom = (Math.sin(posh/31.4)*20) + '%';
    }
  }
}
