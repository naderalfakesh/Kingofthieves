import {initializegame , enemyCrash , hitEndpoint} from "./functions.js"
import Controller from "./Controller.js";
import Player from "./Player.js";
import Enviroment from "./Enviroment.js";
import {verticalMover,HorizontalMover,circularMover} from "./Enemies.js";



$( document ).ready(function() {
    // create enemies
    const Enemy1 = new circularMover("first",20,20,2,1,2);
    const Enemy2 = new verticalMover("second",20,20,2,1,2);
    const Enemy3 = new HorizontalMover("third",20,20,3,2,3);

    // get selected layout
    const selectedlayout = $("select#layout").children("option:selected").val();
    // initilize game with selected layout
    initializegame(selectedlayout);

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
    Enemy1.move();
    Enemy2.move();
    Enemy3.move();
    // if(Enemy3.overlap()[0]){alert("crash")};
    if(enemyCrash()[0]){
        console.log("crash");
        $('#start-overlay').css({display: "block"});
        $('select#layout').prop('disabled', false);
        Player.velocity.x = Player.speed.x;
        $("#start-overlay").css({"background-color": "rgba(255,0,0,0.2)"})
        initializegame($("select#layout").children("option:selected").val());
        return;
    };
    if(hitEndpoint()[0]){
        console.log("win");
        $('#start-overlay').css({display: "block"});
        $('select#layout').prop('disabled', false);
        Player.velocity.x = Player.speed.x;
        $("#start-overlay").css({"background-color": "rgba(0, 78, 0, 0.4)"})
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
window.addEventListener("touchstart" ,Controller.touchListner )
// on start button click start requesting animation frame
$('#start-btn').on('mouseup', function(){
    Controller.keyPressed = false;
    Enviroment.playing = true;
    $('#start-overlay').css({display: "none"});
    $('select#layout').prop('disabled', true);
    window.requestAnimationFrame(update);
})


});