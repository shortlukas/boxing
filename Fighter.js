class Fighter {
    constructor(_ctx, _x, _y, _k) {
        this.ctx                = _ctx;
        this.x                  = _x;
        this.y                  = _y;
        this.dir                = 0;
        this.id                 = Math.random().toFixed(3) * 1000;

        this.bodyimg            = new Image();
        this.bodyimg.src        = "./images/redbody.png";
        this.headimg            = new Image();
        this.headimg.src        = "./images/redhead.png";
        this.armsimgs           = {
            idle: new Image(),
            jableft: new Image()
        }
        this.armsimgs.idle.src          = "./images/idle.png";
        this.armsimgs.jableft.src       = "./images/jableft.png";

        this.keyup              = _k[0];
        this.keyleft            = _k[1];
        this.keydown            = _k[2];
        this.keyright           = _k[3];
        this.keyhit             = _k[4];
        this.keyblock           = _k[5];

        this.up                 = false;
        this.down               = false;
        this.left               = false;
        this.right              = false;

        this.anims              = {
            "idle" :  {n: "idle", f: 3},
            "jableft" :  {n: "jableft", f: 5}
        }

        this.animdata           = {a: this.anims.jableft, x: 0, y: 0}
        this.animcd             = 0;
        

        
        this.head               = {x: 0, y: 0}; //offset from center

        this.speed              = 1;

        this.dom                = 1;
        this.body               = {d: this.dom * 0.7}

        this.hitbox             = [{x:0, y: 0, w: 48, h: 48},{x:30, y: 50, w: 30, h: 30},{x:50, y: 0, w: 30, h: 30},{x:30, y: -50, w: 30, h: 30},];

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    draw(f) {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);

        let dx = f.x - this.x;
        let dy = f.y - this.y;
        this.dir = Math.atan2(dy, dx);
        this.ctx.rotate(this.dir + Math.PI/2);
        console.log(this.armsimgs, this.armsimgs[this.animdata.a.n], this.animdata.a)
        this.ctx.drawImage(this.armsimgs[this.animdata.a.n], this.animdata.x*600, this.animdata.y*600, 600, 600, -120, -120, 240, 240);
        console.log(this.armsimg, this.animdata.x, this.animdata.y);
        this.ctx.drawImage(this.headimg, -22 + this.head.x, -22 + this.head.y, 44, 44);

        this.ctx.strokeStyle = "green";
        this.ctx.lineWidth = 2;

        this.ctx.rotate(-Math.PI/2);
        for(let hb of this.hitbox) {
            this.ctx.strokeRect(hb.x - hb.w/2, hb.y - hb.h/2, hb.w, hb.h);
        }
        
        this.ctx.restore();
    }

    update(f) {
        if (this.right) {this.dir -= 0.01; this.head.x += 1;}
        if (this.left)  {this.dir += 0.01; this.head.x -= 1;}

        if (this.up)   {this.x += Math.cos(this.dir) * this.speed;
                            this.y += Math.sin(this.dir) * this.speed;
                        this.head.y -= 1.5;}
        if (this.down) {this.x -= Math.cos(this.dir) * this.speed;
                            this.y -= Math.sin(this.dir) * this.speed;
                        this.head.y += 1.5;}

        if (this.left || this.right) {
            let dx = this.x - f.x;
            let dy = this.y - f.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            let angle = Math.atan2(dy, dx);
            let deltaAngle = this.speed / dist;  // fixed pixel arc length
            if (this.right) angle -= deltaAngle;
            if (this.left)  angle += deltaAngle;
            this.x = f.x + Math.cos(angle) * dist;
            this.y = f.y + Math.sin(angle) * dist;
        }
        this.dir = Math.atan2(this.y - f.y, this.x - f.x);
        this.head.x *= 0.8;
        this.head.y *= 0.8;

        //Animation
        this.animcd += 1;
        if(this.animcd % 3 == 0) {this.animdata.x += 1;}
        if(this.animdata.x > 9) {
            this.animdata.x = 0; 
            this.animdata.y += 1;
        }
        if(((this.animdata.y * 10) + (this.animdata.x) > this.animdata.a.f - 1)) {
            this.runAnim("idle");
            console.log("begin idle")
        }
        console.log(this.animdata.x)
    }

    keyDownHandler(e) {
        switch(e.key.toLowerCase()) {
            case this.keyup:
                this.up = true;
                break;
            case this.keydown:
                this.down = true;
                break;
            case this.keyleft:
                this.left = true;
                break;
            case this.keyright:
                this.right = true;
                break;
            case this.keyhit:
                this.runAnim("jableft");
                break;
        }
    }
    keyUpHandler(e) {
        switch(e.key.toLowerCase()) {
            case this.keyup:
                this.up = false;
                break;
            case this.keydown:
                this.down = false;
                break;
            case this.keyleft:
                this.left = false;
                break;
            case this.keyright:
                this.right = false;
                break;
        }
    }

    runAnim(a) {
        this.animdata.a = this.anims[a];
        this.animdata.x = 0;
        this.animdata.y = 0;
    }
}

export { Fighter }