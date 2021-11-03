var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

height = c.clientHeight;
width = c.clientWidth;

endGame = false;

stripesArray = [];
sholderStripesArray = [];
obstacle = [];
points = [];
score = 0;

var counter = 0;

var direction = {"ArrowUp": false, "ArrowDown": false, "ArrowLeft": false, "ArrowRight": false};

class Obstacle
{
    constructor(x, y, dy, x_size, y_size)
    {
        this.x = x;
        this.y = y;
        this.x_size = x_size;
        this.y_size = y_size;
        this.dy = dy;
    }

    moveObstacle(color)
    {
        this.draw(color);
        this.y += this.dy;
    }

    draw(color)
    {   
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.x_size, this.y_size);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

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

function addObstacle()
{
    x = Math.floor((Math.random() * 350) + 200);
    
    c = new Obstacle(x, 0, 5, 50, 50);
    obstacle.push(c);
}

function addPoints()
{
    x = Math.floor((Math.random() * 400) + 200);

    for (i = 0; i<obstacle.length;i++)
    {
        if ((x  < obstacle[i].x) || (x > obstacle[i] + 50))
        {
            c = new Obstacle(x, 0, 5, 10, 10);
            points.push(c);
        }
    } 
    
}

setInterval(addObstacle, 1000);
setInterval(addPoints, 1000);

function updateObstacle(color)
{
    for (var i = 0; i<obstacle.length; i++)
    {
        obstacle[i].moveObstacle(color);
    }
}

function updatePoints(color)
{
    calculatePoints(10);
    for (var i = 0; i<points.length; i++)
    {
        points[i].moveObstacle(color);
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

function calculatePoints(point_size)
{
    for (var i = 0; i < points.length; i++)
    {
        x1 = points[i].x;
        x2 = car.x;
        y1 = points[i].y;
        y2 = car.y;

        if ((car.x <= points[i].x + point_size) && (car.x + car.x_size >= points[i].x) && (points[i].y + point_size >= car.y) && (points[i].y <= car.y + car.y_size))
        {
            score +=1;
            points.splice(i, 1);
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
    moveCarWithoutKey()
    {
        this.y += 2;
    }
}

initStripes(380, 0, 20, 20, 5, 80);
initStripes(180, 0, 20, 20, 5, 40);
initStripes(600, 0, 20, 20, 5, 40);



car = new Car(300, 300, 40, 60);
car.drawCar();

function collision(car)
{
    if ((car.x <= 200) || (car.x +car.x_size >=600) || (car.y >= height))
    {
        return true;
    }

    for (var i = 0; i < obstacle.length; i++)
    {
        x1 = obstacle[i].x;
        x2 = car.x;
        y1 = obstacle[i].y;
        y2 = car.y;

        if ((car.x <= obstacle[i].x + 50) && (car.x + car.x_size >= obstacle[i].x) && (obstacle[i].y + 50 >= car.y) && (obstacle[i].y <= car.y + car.y_size))
        {
            return true;
        }

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
    else
    {
        car.moveCarWithoutKey();
    }
}

function drawScore() 
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 8, 20);
}

function animate()
{
    moveCar(car);

    if (collision(car))
    {
        endGame = true;
        alert('Game Over. Aby zacząć od nowa grę, należy odświeżyć stronę');
       
    }
    else
    {
        clear();
        board();
        car.drawCar();
        updateObstacle("yellow");
        updatePoints("pink");
        drawScore();
        
        ctx.restore();
        window.requestAnimationFrame(animate);
    }

    
}

window.onload = (animate);





