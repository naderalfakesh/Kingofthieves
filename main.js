import Controller from "./Controller.js";
import Player from "./Player.js";
import Enviroment from "./Enviroment.js";
import Enemy from "./enemy.js";
// import  "./js/jquery.overlap.min.js";


Player.position.x = 1;
Player.position.y = 190;
Player.velocity.y = 0;


Enviroment.start();
Enviroment.fillBlocks();

function update(){

    Player.updatePosition();

    Player.collisionCheck();

    if(Player.jumping && !Player.sliding){
        Controller.keyPressed = false;
    }
    if(Controller.keyPressed && (Player.collision.bottom || Player.collision.left || Player.collision.right ) ){
        
            Player.jump();
        
        Controller.keyPressed = false;
    }

    Player.move();
    // Enemy.move();
    Enemy.moveY(0);
    
 
    
    if(Player.bouncing){
        // Player.htmlElement.css("background-color","red");
    }
    else if(Player.sliding){
        // Player.htmlElement.css("background-color","blue");
    }
    else if(Player.jumping){
        // Player.htmlElement.css("background-color","green");
    }
    else if(Player.move){
        // Player.htmlElement.css("background-color","purple");
    }
    
    if(Player.velocity.x < 0){
        Player.htmlElement.addClass("flipped");
    }
    else{
        Player.htmlElement.removeClass("flipped");    
    }

    $("#top").text(Player.collision.top);
    $("#bottom").text(Player.collision.bottom);
    $("#left").text(Player.collision.left);
    $("#right").text(Player.collision.right);
    $("#jump").text(Player.jumping);
    $("#move").text(Player.moving);
    $("#bounce").text(Player.bouncing);
    $("#slide").text(Player.sliding);
    $("#Vx").text(parseInt(Player.velocity.x));
    $("#Vy").text(parseInt(Player.velocity.y));
    $("#X").text(parseInt(Player.position.x));
    $("#Y").text(parseInt(Player.position.y));
    window.requestAnimationFrame(update); // updating animation after calculation is done
    }


 

// listening for jump key press
window.addEventListener("keydown" ,Controller.keyListner )
// requesting animation frame
window.requestAnimationFrame(update);