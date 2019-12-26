import Controller from "./Controller.js";
import Player from "./Player.js";

function update(){

    Player.checkBoundries();

    Player.walk();

    Player.updatePosition();

    if (Controller.keyPressed && !Player.jumping){ 
        console.log("jump")
        Player.velocity.y = -3.5 ;
        Player.jumping = true;
    }

    if(Player.jumping){
        Player.jump();
        Controller.keyPressed = false;
    }
    if(Player.sliding){
        Player.slide();
    }
    

    
    window.requestAnimationFrame(update); // updating animation after calculation is done
    }


 

// listening for jump key press
window.addEventListener("keypress" ,Controller.keyListner )
// requesting animation frame
window.requestAnimationFrame(update);