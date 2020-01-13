import Enviroment from "./Enviroment.js";
import Player from "./Player.js";
import  "./assets/jquery.overlap.min.js";

function initializegame(layoutNumber=1){// create layout enemies and set player position on starting point
    Enviroment.createLayout(layoutNumber);
    Player.position.x = $('#start').position().left + 0.5 * $('#start').width() - 0.5 * Player.width;
    Player.position.y = $('#start').position().top + $('#start').height() - Player.height;
    Player.updatePosition();
}

function enemyCrash(){// check player overlap with enemies
    return $(".enemy").overlap({
        element: Player.htmlElement 
    });
};

function hitEndpoint(){// check player overlap with finish point
    return $("#finish").overlap({
        element: Player.htmlElement
    });
};

export {initializegame , enemyCrash , hitEndpoint };