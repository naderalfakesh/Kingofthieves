import {initializegame , enemyCrash , hitEndpoint} from "./functions.js"
import Controller from "./Controller.js";
import Player from "./Player.js";
import Enviroment from "./Enviroment.js";
import Enemy from "./Enemies.js";

const Enemy1 = new Enemy("first");
const Enemy2 = new Enemy("second",20,20,200,150,2,1,2);
const Enemy3 = new Enemy("third",20,20,50,50,3,2,3);

$( document ).ready(function() {
    initializegame($("select#layout").children("option:selected").val());
    $("select#layout").change(function(){
        var selectedlayout = $(this).children("option:selected").val();
        initializegame(selectedlayout);
    });

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
    Enemy1.moveY();
    Enemy2.moveY();
    Enemy3.moveX();
    // if(Enemy3.overlap()[0]){alert("crash")};
    if(enemyCrash()[0]){
        console.log("crash");
        $('#start-overlay').css({display: "block"});
        $('select#layout').prop('disabled', false);
        Player.velocity.x = Player.speed.x;
        initializegame($("select#layout").children("option:selected").val());
        return;
    };
    if(hitEndpoint()[0]){
        console.log("win");
        $('#start-overlay').css({display: "block"});
        $('select#layout').prop('disabled', false);
        Player.velocity.x = Player.speed.x;
        initializegame($("select#layout").children("option:selected").val());
        return;
    };
 
    
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

    $("#Vx").text(parseInt(Player.velocity.x));
    $("#Vy").text(parseInt(Player.velocity.y));
    $("#X").text(parseInt(Player.position.x));
    $("#Y").text(parseInt(Player.position.y));
    window.requestAnimationFrame(update); // updating animation after calculation is done
    }


 

// listening for jump key press
window.addEventListener("keydown" ,Controller.keyListner )
window.addEventListener("touchend" ,Controller.touchListner )
// on start button click start requesting animation frame
$('#start-btn').on('mouseup', function(){
    Controller.keyPressed = false;
    Enviroment.playing = true;
    $('#start-overlay').css({display: "none"});
    $('select#layout').prop('disabled', true);
    window.requestAnimationFrame(update);
})


});