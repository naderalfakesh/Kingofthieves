import Controller from "./Controller.js";
import Player from "./Player.js";
import Enviroment from "./Enviroment.js";
import Enemy from "./Enemies.js";
// import  "./js/jquery.overlap.min.js";

const Enemy1 = new Enemy("first");
const Enemy2 = new Enemy("second",20,20,200,150,2,1,2);
const Enemy3 = new Enemy("third",20,20,50,50,3,2,3);



Player.velocity.y = 0;

function initializegame(layoutNumber=1){
    Enviroment.createLayout(layoutNumber);
    Player.position.x = $('#start').position().left + 0.5 * $('#start').width() - 0.5 * Player.width;
    Player.position.y = $('#start').position().top + $('#start').height() - Player.height;
    Player.updatePosition();

}

$( document ).ready(function() {
    initializegame();
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
// on start button click start requesting animation frame
$('#start-btn').on('click', function(){
    $('#start-overlay').css({display: "none"});
    window.requestAnimationFrame(update);
})


});