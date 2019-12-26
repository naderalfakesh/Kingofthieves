import Controller from "./Controller.js";

const $player = $('#player')
const $frame = $('#frame')


const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DOWN_LEFT =  3* Math.PI / 4;
const DOWN_RIGHT =  Math.PI / 4;

const player={
    direction: 1,
    angel: 1,
    speed: 1,
    // left: 200,
    // top: 280,
    position: {x:200 , y: 280 },
    velocity:{x:0,y:0},
    jumping: false,
    checkBoundries: function (){
        if(player.position.y > $frame.height() - $player.height() ){
            player.jumping = false;
            player.velocity.y = 0; 
        }
    }
}

const enviroment= {
    gravity: { x: 0 , y: 0.1},
    friction: {
         air: {x:0 ,y: 0.99 },
         ground: {x:0 ,y: 0 }
    }
}

function update(){
    console.log(player.jumping)
    // playerUpdatePosition();
    player.checkBoundries();
    playerUpdateCss();
    if (Controller.keyPressed && !player.jumping){ 
        console.log("jump")
        player.velocity.y = -3 ;
        player.jumping = true;
    }
    if(player.jumping){playerJump();Controller.keyPressed = false;}
    window.requestAnimationFrame(update);
    }

function playerUpdatePosition(){
    if(player.left >= $frame.width() - $player.width() ){
        player.direction = -1
    }
    else if (player.left <= 0){
        player.direction = 1
    }
player.left += Math.cos(player.angel) * player.speed * player.direction

 $player.css({
     left: player.left+"px"
 })
}

function playerUpdateCss(){
    $player.css({
        left: player.position.x + "px",
        top: player.position.y + "px",
    })
}

function playerJump(){
    player.velocity.y += enviroment.gravity.y 
    player.velocity.y *= enviroment.friction.air.y 
    player.position.y += player.velocity.y;
    
}

// setInterval(update, 16)

// function loop(){
//     console.log("here is loop");
// }


window.addEventListener("keypress" ,Controller.keyListner )
window.requestAnimationFrame(update);