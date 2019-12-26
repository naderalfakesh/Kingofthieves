import Controller from "./Controller.js";
import Player from "./Player.js";


const $player = $('#player')    
const $frame = $('#frame')





const enviroment= {
    gravity: { x: 0 , y: 0.1},
    friction: {
         air: {x:0 ,y: 0.99 },
         ground: {x:0 ,y: 0 }
    }
}

function update(){
    console.log(Player.jumping)
    Player.checkBoundries();
    Player.updatePosition();
    if (Controller.keyPressed && !Player.jumping){ 
        console.log("jump")
        Player.velocity.y = -3 ;
        Player.jumping = true;
    }
    if(Player.jumping){Player.jump();Controller.keyPressed = false;}
    window.requestAnimationFrame(update);
    }


 


window.addEventListener("keypress" ,Controller.keyListner )
window.requestAnimationFrame(update);