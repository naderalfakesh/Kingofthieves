import Enviroment from "./Enviroment.js";
import Player from "./Player.js";
import  "./assets/jquery.overlap.min.js";

function initializegame(layoutNumber=1){
    Enviroment.createLayout(layoutNumber);
    Player.position.x = $('#start').position().left + 0.5 * $('#start').width() - 0.5 * Player.width;
    Player.position.y = $('#start').position().top + $('#start').height() - Player.height;
    Player.updatePosition();
}

function enemyCrash(){
    return $(".enemy").overlap({
        element: Player.htmlElement 
    });
};

function hitEndpoint(){
    return $("#finish").overlap({
        element: Player.htmlElement
    });
};

export {initializegame , enemyCrash , hitEndpoint };