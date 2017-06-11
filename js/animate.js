function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

function makeEaseOut(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}

function bounce(timeFraction) {
}

function jump(){

}

function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
}

sq.onclick = function() {

    var height = field.clientHeight - sq.clientHeight;
    var width = 10;

    animate({
        duration: 2000,
        timing: makeEaseOut(bounce),
        draw: function(progress) {
            sq.style.bottom = height/10 * progress + '%'
        }
    });

    animate({
        duration: 2000,
        timing: makeEaseOut(quad),
        draw: function(progress) {
            sq.style.left = width * progress + "%"
        }
    });
}
