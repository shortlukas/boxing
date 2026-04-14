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
        this.armsimg            = new Image();
        this.armsimg.src        = "./images/redarmsidle.png";

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
        this.ctx.rotate(this.dir);
        this.ctx.drawImage(this.armsimg, -120, -120, 240, 240);
        this.ctx.rotate(this.body.d);

        this.ctx.drawImage(this.bodyimg, -35, -35, 70, 70);
        this.ctx.rotate(-this.body.d);
        this.ctx.drawImage(this.headimg, -22 + this.head.y, -22 + this.head.x, 44, 44);

        this.ctx.strokeStyle = "green";
        this.ctx.lineWidth = 2;

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
                        this.head.y += 1.5;}
        if (this.down) {this.x -= Math.cos(this.dir) * this.speed;
                            this.y -= Math.sin(this.dir) * this.speed;
                        this.head.y -= 1.5;}

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
        this.dir = Math.atan2(this.y - 0, this.x - 0);
        this.head.x *= 0.8;
        this.head.y *= 0.8;
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
}

export { Fighter }