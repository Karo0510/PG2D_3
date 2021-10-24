var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

height = c.clientHeight;
width = c.clientWidth;

function drawStraight()
{
    ctx.beginPath();
    ctx.rect(400, 0, 200, height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
}

drawStraight();