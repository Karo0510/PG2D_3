var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

height = c.clientHeight;
width = c.clientWidth;

endGame = false;

stripesArray = [];
sholderStripesArray = [];

var counter = 0;

var direction = {"ArrowUp": false, "ArrowDown": false, "ArrowLeft": false, "ArrowRight": false};

class Stripes
{
    constructor(x, y, x_size, y_size, dy)
    {
        this.x = x;
        this.y = y;
        this.x_size = x_size;
        this.y_size = y_size;
        this.dy = dy;
    }

    draw(color)
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.x_size, this.y_size);
        ctx.fillStyle = color;
        ctx.fill();
    }

    moveStripes()
    {
        this.y += this.dy;

        if (this.y >= height)
        {
            this.y = 0;
        }
    }
}

function drawStraightRoad(x, y, x_size, y_size, color)
{
    ctx.beginPath();
    ctx.rect(x, y, x_size, y_size);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function initStripes(x, y, x_size, y_size, dy, dist_between_stripes)
{
    for (var i = 0; i<800; i = i+dist_between_stripes+y_size)
    {
        str =  new Stripes(x, y+i, x_size, y_size, dy);
        stripesArray.push(str);
    }
}

function updateStripes()
{
    for (var i = 0; i<stripesArray.length; i++)
    {
        stripesArray[i].moveStripes();

        if (stripesArray[i].x == 380)
        {
            color = "grey";
            stripesArray[i].draw(color);
        }
        else
        {
            color = "white";
            stripesArray[i].draw(color);
        }
        
    }
}



function board()
{
    drawStraightRoad(200, 0, 400, height, "grey");
    drawStraightRoad(380, 0, 20, height, "white");
    drawStraightRoad(180, 0, 20, height, "red");
    drawStraightRoad(600, 0, 20, height, "red");
    updateStripes();
    //ctx.transform(1, 0, 0.01, 1, 0, 0);   
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
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x,this.y+10,5,0,Math.PI*2,true);
	    ctx.fillStyle = "blue";
		ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x,this.y+this.y_size-10,5,0,Math.PI*2,true);
	    ctx.fillStyle = "blue";
		ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc( this.x + this.x_size , this.y+10 ,5,0,Math.PI*2,true);
	    ctx.fillStyle = "blue";
		ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc( this.x + this.x_size ,this.y+this.y_size-10 ,5,0,Math.PI*2,true);
	    ctx.fillStyle = "blue";
		ctx.fill();
        ctx.closePath();

        
        //ctx.stroke();
    }
}

initStripes(380, 0, 20, 20, 5, 80);
initStripes(180, 0, 20, 20, 5, 40);
initStripes(600, 0, 20, 20, 5, 40);



car = new Car(300, 300, 40, 60);
car.drawCar();

function collision(car)
{
    if ((car.x <= 200) || (car.x +car.x_size >=600))
    {
        return true;
    }

    return false;
}


document.addEventListener("keydown", pressKey, false);
document.addEventListener("keyup", releaseKey, false);

function clear()
{
    ctx.rect(0,0,width,height);
    ctx.fillStyle = "green";
    ctx.fill();
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
    moveCar(car);

    if (collision(car))
    {
        endGame = true;
        alert('Game Over');
       
    }
    else
    {
        clear();
        board();
        car.drawCar();
        
        ctx.restore();
        window.requestAnimationFrame(animate);
    }

    
}

window.onload = (animate);





