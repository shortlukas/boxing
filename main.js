import { Fighter } from "./Fighter.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const f1 = new Fighter(ctx, 50, 50, 'wasdxc');
const f2 = new Fighter(ctx, -50, -50, 'ijklnm');

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
    while (acc >= delta) {
        update(delta/1000);
        acc -= delta;
        
    }

    const alpha = acc / delta;
    draw(alpha);

    window.requestAnimationFrame(step);
}

function update(dt) {
    f1.update({x: 0,y: 0});
    //f2.update(f1);
    return;
}

function draw(dt) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.save();
    ctx.drawImage(ringImg, 50, 50, 500, 500);
    ctx.translate(300, 300);
    f1.draw({x:0,y:0});
    //f2.draw(f1);
    ctx.restore();
}

window.requestAnimationFrame(step);