import {initializegame , enemyCrash , hitEndpoint} from "./generalFunctions.js"
import Controller from "./Controller.js";
import Player from "./Player.js";
import Enviroment from "./Enviroment.js";
import {verticalMover,HorizontalMover,circularMover} from "./Enemies.js";

$( document ).ready(function() {
 /*    
The main function when user starts the game  
all calculations on verey animation frame is done in this function 
*/
function update(){

    Player.updatePosition(); // update player position on every frame 

    Player.collisionCheck(); // check collision on every frame to decide whether the player is gonna move or stall 

    if(Player.jumping && !Player.sliding){
        // do not allow a new jump if the player is jumping already
        Controller.keyPressed = false;
    }

    if(Controller.keyPressed && (Player.collision.bottom || Player.collision.left || Player.collision.right ) ){
        // handle jump on keypress
        Player.jump();
        Controller.keyPressed = false;
    }

    // The calculation for movement on the next frame (player and enemies)
    Player.move();
    Enemy1.move();
    Enemy2.move();
    Enemy3.move();


    // Detection of win or loose situation and resetting the game enviroment
    if(enemyCrash()[0] || hitEndpoint()[0]){
        if(enemyCrash()[0]){// handling the player crash into enemies (Loose situation)
            $("#message").css({"background-color": "rgba(255,0,0,0.5)"})
            $("#message h1").text("!! Sorry you lost !!");
        }
        else if(hitEndpoint()[0]){// handling the player hiting the endpoint  (win situation)
            $("#message").css({"background-color": "rgba(0, 255, 0, 0.4)"})
            $("#message h1").text("! Congrats you won !");
        }
        $('#start-overlay').css({display: "block"});
        $('select#layout').prop('disabled', false);
        Player.velocity.x = Player.speed.x;
        initializegame($("select#layout").children("option:selected").val());
        Enemy1.reset();
        Enemy2.reset();
        Enemy3.reset();
        return;
    };

    window.requestAnimationFrame(update); // updating animation after calculation is done
}

// on start button click start requesting animation frame
$('#start-btn').on('mouseup', function(){
    Controller.keyPressed = false;
    Enviroment.playing = true;
    Player.velocity.y = 0;
    $('#start-overlay').css({display: "none"});
    $('select#layout').prop('disabled', true);
    window.requestAnimationFrame(update);
})

// get selected layout
const selectedlayout = $("select#layout").children("option:selected").val();
// initilize game with selected layout
initializegame(selectedlayout);

// create enemies for the first time 
const E1=Enviroment.enemies[0];
const E2=Enviroment.enemies[1];
const E3=Enviroment.enemies[2];

const Enemy1 = new circularMover(E1.id,E1.height,E1.width,E1.column,E1.row,E1.blockSpan);
const Enemy2 = new verticalMover(E2.id,E2.height,E2.width,E2.column,E2.row,E2.blockSpan);
const Enemy3 = new HorizontalMover(E3.id,E3.height,E3.width,E3.column,E3.row,E3.blockSpan);

// re-initialize layout and update enemies on new layout selection
$("select#layout").change(function(){
    var selectedlayout = $(this).children("option:selected").val();
    initializegame(selectedlayout);
    const E1=Enviroment.enemies[0];
    const E2=Enviroment.enemies[1];
    const E3=Enviroment.enemies[2];
    Enemy1.update(E1.column,E1.row,E1.blockSpan);
    Enemy2.update(E2.column,E2.row,E2.blockSpan);
    Enemy3.update(E3.column,E3.row,E3.blockSpan);
});

// listening for jump key press
window.addEventListener("keydown" ,Controller.keyListner )
window.addEventListener("touchstart" ,Controller.touchListner )

});