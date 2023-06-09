const canvas = document.getElementById("myCanvas");
canvas.width = 300;


const ctx = canvas.getContext("2d");
// road
const road = new Road(canvas.width/2, canvas.width * 0.95);
// car
const car = new Car(road.getLaneCenter(1) ,canvas.width/2, 30, 50);


animate();


function animate() {
    car.update(road.borders);
    canvas.height = window.innerHeight;
    
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.75);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}