class Car{
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.speed = 0;
        this.maxSpeed = 5;

        this.fariction = 0.05;
        this.acceleration = 0.2;

        this.angle = 0;

        this.controls = new Controls();
    }

    update(){
        this.#move()
    }

    draw(ctx){
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            - this.width/2,
            - this.height/2,
            this.width,
            this.height
        )
        ctx.fill();

        ctx.restore();
    }

    #move(){

        if(this.controls.forward){
            this.speed += this.acceleration;
        }
        if(this.controls.reverse){
            this.speed -= this.acceleration;
        }
        // max forward speed
        if (this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        // max reverse speed
        if (this.speed < -this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }

        //  stop car when speed is less than frction
        if(Math.abs(this.speed) < this.fariction){
            this.speed = 0;
        }

        // decrease speed by frction
        if (this.speed > 0){
            this.speed -= this.fariction;
        }

        if (this.speed < 0){
            this.speed += this.fariction;
        }

        // left and right car control with flip backwords
        if (this.speed != 0){
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left){
                this.angle += 0.03 * flip;
            }
            if (this.controls.right){
                this.angle -= 0.03 * flip;
            }
        }
        
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

}