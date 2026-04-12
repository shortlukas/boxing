const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ringImg = new Image();
ringImg.src = "./images/ring2.png";

let fps = 60;
let delta = 1000/fps;
let maxacc = 200;

let lastt = 0;
let acc = 0;

function step(t) {
    let elaps = t - lastt;
    lastt = t;

    acc += Math.min(elaps, maxacc);
    console.log(acc);
    while (acc >= delta) {
        update(delta/1000);
        acc -= delta;
        
    }

    const alpha = acc / delta;
    draw(alpha);

    window.requestAnimationFrame(step);
}

function update(dt) {
    return;
}

function draw(dt) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.save();
    ctx.drawImage(ringImg, 50, 50, 500, 500);
}

window.requestAnimationFrame(step);