var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

height = c.clientHeight;
width = c.clientWidth;

endGame = false;


ctx.rect(0,0,width,height);
ctx.fillStyle = "green";
ctx.fill();
ctx.stroke();

var direction = {"ArrowUp": false, "ArrowDown": false, "ArrowLeft": false, "ArrowRight": false};

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
    //ctx.beginPath();
    ctx.setLineDash([20, 20]);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    //ctx.lineWidth = 10;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
} 

function drawStripes(x)
{
    ctx.beginPath();
    ctx.setLineDash([20,20]);
    ctx.moveTo(x+10, 0);
    ctx.lineTo(x+10, 600);
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

function board()
{
    drawStraightRoad();
    drawDashLine();
    //drawStripes(180);
    //drawStripes(600);
}

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
        //ctx.stroke();
    }
}

board();

car = new Car(300, 300, 40, 60);
car.drawCar();


document.addEventListener("keydown", pressKey, false);
document.addEventListener("keyup", releaseKey, false);

function clear()
{
    ctx.rect(0,0,width,height);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
}

function pressKey(e)
{
    if (e.key == "ArrowRight")
    {
        direction["ArrowRight"] = true;
    }
    
    if (e.key == "ArrowLeft")
    {
        direction["ArrowLeft"] = true;
    }
    if (e.key == "ArrowUp")
    {
        direction["ArrowUp"] = true;
    }
    if (e.key == "ArrowDown")
    {
        direction["ArrowDown"] = true;
    }

}

function releaseKey(e)
{
    if (e.key == "ArrowRight")
    {
        direction["ArrowRight"] = false;
    }
    
    if (e.key == "ArrowLeft")
    {
        direction["ArrowLeft"] = false;
    }
    if (e.key == "ArrowUp")
    {
        direction["ArrowUp"] = false;
    }
    if (e.key == "ArrowDown")
    {
        direction["ArrowDown"] = false;
    }
}

function moveCar(car)
{
    if (direction["ArrowRight"])
    {
        car.x += 5;

        if ((car.x + car.x_size  > 600))
        {
            endGame = true;
        }
    }else if (direction["ArrowLeft"])
    {
        car.x -= 5

        if ((car.x + car.x_size  < 200))
        {
            endGame = true;
        }
    }
    else if (direction["ArrowUp"])
    {
        car.y -= 5;
    }
    else if (direction["ArrowDown"])
    {
        car.y +=5;

        if (car.y + car.y_size)
        {
            endGame = true;
        }
    }
}

function animate()
{
    
    clear();
    board();
    moveCar(car);
    car.drawCar();

}

//window.requestAnimationFrame(moveCar);
setInterval(animate, 10);

//poprawic plansze
//dowiedziec sie, jak dziala requestAnimationFrame


