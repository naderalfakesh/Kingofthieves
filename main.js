import Controller from "./Controller.js";
import Player from "./Player.js";
import Enviroment from "./Enviroment.js";

Player.position.x = 0;
Player.position.y = 225;
Player.velocity.y = 0;


Enviroment.start();

function update(){

    Player.checkBoundries();

    if(Controller.keyPressed && !Player.jumping && Player.collision.bottom){
        Player.jumping = true;
        Player.velocity.y = Player.speed.y;
    }
    if(Controller.keyPressed && Player.sliding ){
        Player.bouncing = true;
    }

    if(Player.moving){
        Player.move();
    }
    if(Player.jumping){
        Player.jump();
    }
    if(Player.sliding){
        Player.slide();
    }
    if(Player.bouncing){
        Player.bounce();
    }
    
    // if(!(Player.jumping || Player.sliding || Player.bouncing ) ){
    //     Player.velocity.x = Player.velocity.x
    //     Player.velocity.y = Player.speed.y
    // }

    Player.updatePosition();
    Controller.keyPressed = false;
    
    if(Player.bouncing){
        Player.htmlElement.css("background-color","red");
    }
    else if(Player.sliding){
        Player.htmlElement.css("background-color","blue");
    }
    else if(Player.jumping){
        Player.htmlElement.css("background-color","green");
    }
    else if(Player.move){
        Player.htmlElement.css("background-color","purple");
    }

    window.requestAnimationFrame(update); // updating animation after calculation is done
    }


 

// listening for jump key press
window.addEventListener("keypress" ,Controller.keyListner )
// requesting animation frame
window.requestAnimationFrame(update);