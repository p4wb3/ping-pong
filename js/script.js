const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;
const cw = canvas.width;
const ch = canvas.height;

const lineW = 6;
const lineH = 16;

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;
let ballSpeedX = 1;
let ballSpeedY =1;


const paddleW = 20;
const paddleH = 100;
const playerX = 70;
let playerY = 200;

let bootX = 910;
let bootSpeed = 1;
let bootY = 200;
const bootW = 20;
const bootH = 100;


canvas.addEventListener("mousemove", playerPosition) 


function startGame(){
   play= setInterval(game, 1)
    ballX = cw / 2 - ballSize / 2;
    ballY = ch / 2 - ballSize / 2;
    
}

function player() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX, playerY, paddleW, paddleH);
}

function ball() {
    
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 0 || ballX - ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
    }
}

function ballMove(){   
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
}

function ballHit(){
    //player hit
    if( ballX<= playerX+ballSize/2&&ballY>=playerY&&ballY<playerY+paddleH) 
    {
        
        ballSpeedX = -ballSpeedX;
    } 
   // boot hit

    if(ballX>=bootX-ballSize&&ballY>=bootY&&ballY<=bootY+ bootH)
    {
        ballSpeedX = -ballSpeedX;
    }
}

function boot() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bootX, bootY, bootW, bootH);
  
}

 function bootMove()  {
    if (ballX>= cw / 2)
    {
        bootY=ballY- bootH/2
    } 
    if(bootY>=ch- bootH)
    {
        bootY=ch- bootH
    } 
    if (bootY<=0)
    {
       bootY=0;
    }

}

function table() {
    //draw table
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);
    //draw middel line
    for (let linePosition = 20; linePosition < ch; linePosition += 30) 
    {
        ctx.fillStyle = 'gray';
        ctx.fillRect(cw / 2 - lineW / 2, linePosition, lineW, lineH)
    }

}
topCanvas=canvas.offsetTop;

window.addEventListener("click",function()
{
    console.log("click");
})


function playerPosition(e) {
    
    playerY= e.clientY - topCanvas - paddleH / 2;

    if( playerY>=ch-paddleH)
    {
        playerY=ch- paddleH;
    }
    if (playerY<=0){
        playerY=0;
    }
   
}
 



function score(){
    var playerscore= document.getElementById("playerScore");
    var bootscore= document.getElementById("bootScore");
    var x = document.createElement("div");
    if (ballX<playerX)
    {
        
       var addbpoints=playerscore.innerHTML++;
         clearInterval(play);
         if (addbpoints==3){
            
            playerscore.innerHTML= 0;
            bootscore.innerHTML=0;
             console.log("zeroooooo")
         }
        
        }
    else if(ballX>bootX){
        var addbpoints= bootscore.innerHTML++;
        clearInterval(play);
        if (addbpoints==3){
             
            playerscore.innerHTML= 0;
            bootscore.innerHTML=0;
            
            x.style.color="red";
            x.className="text";
            x.innerHTML="you loose";
            var body= document.querySelector("body");
            var newChild= body.appendChild(x);

        }
      }
    } 

function game() {
    table();
    ball();
    //bootMove()
    ballHit();
    score()
    boot();
    ballMove();
    player();    
} 
