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

        this.demage=false;

        this.sensor = new Sensor(this);

        this.controls = new Controls();
    }

    update(roadBorders){
        if(!this.demage){
            this.#move();
            this.polygon = this.#createPolygon();
            this.demage = this.#assessDemage(roadBorders);
        }
        this.sensor.update(roadBorders);
    }

    draw(ctx){
        // draw polygon

        if(this.demage){
            ctx.fillStyle = "gray";
        }else{
            ctx.fillStyle = "black";
        }

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i=1; i<this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        // draw sensor
        this.sensor.draw(ctx);
    }

    #assessDemage(roadBorders){
        for(let i=0; i<roadBorders.length; i++){
            if(polygonsIntersect(this.polygon, roadBorders[i])){
                return true;
            }
        }
        return false;
    }


    #createPolygon(){
        const points = [];
        const radius = Math.hypot(this.width, this.height)/2;
        const alpha = Math.atan2(this.width, this.height);

        points.push({
            x:this.x - Math.sin(this.angle - alpha) * radius,
            y:this.y - Math.cos(this.angle - alpha) * radius
        });


        points.push({
            x:this.x - Math.sin(this.angle - alpha) * radius,
            y:this.y - Math.cos(this.angle - alpha) * radius
        });


        points.push({
            x:this.x - Math.sin(this.angle + alpha) * radius,
            y:this.y - Math.cos(this.angle + alpha) * radius
        });

        points.push({
            x:this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
            y:this.y - Math.cos(Math.PI + this.angle - alpha) * radius
        });

        points.push({
            x:this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
            y:this.y - Math.cos(Math.PI + this.angle + alpha) * radius
        });

        return points;
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