var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

height = c.clientHeight;
width = c.clientWidth;


ctx.rect(0,0,width,height);
ctx.fillStyle = "green";
ctx.fill();
ctx.stroke();

function drawStraightRoad()
{
    ctx.beginPath();
    ctx.rect(200, 0, 400, height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

  
}

function drawDashLine()
{
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
} 

function drawStripes(x)
{
    ctx.beginPath();
    ctx.setLineDash([20,20]);
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 600);
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

function board()
{
    drawStraightRoad();
    drawDashLine();
    drawStripes(200);
    drawStripes(600);
}


board();

class Car
{
    constructor(x, y, x_size, y_size)
    {
        this.x = x;
        this.y = y;
        this.x_size = x_size;
        this.y_size = y_size;
    }
    drawCar()
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.x_size, this.y_size);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
    }
}

car = new Car(400, 400, 40, 20);
car.drawCar();


