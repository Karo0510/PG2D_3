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

    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
}

function drawStripes()
{
   
} 

drawStraightRoad();
//drawStripes();