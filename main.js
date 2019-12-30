import Controller from "./Controller.js";
import Player from "./Player.js";
import Enviroment from "./Enviroment.js";

Player.position.x = 1;
Player.position.y = 225;
Player.velocity.y = 0;


Enviroment.start();

function update(){

    // Player.checkBoundries();


    if(Controller.keyPressed && (Player.collision.bottom || Player.collision.left || Player.collision.right )){
        Player.jump();
    }
    // if(Controller.keyPressed && Player.sliding ){
    //     Player.bouncing = true;
    //     Player.jump();
    // }

    Player.move();

    
    
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