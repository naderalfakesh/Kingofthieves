import Enviroment from "./Enviroment.js";
import Controller from "./Controller.js";

const Player = {
    // constants
    htmlElement: $("#player"),
    position: {
        x: 200,
        y: 280
    },
    previousPosition: {
        x: 200,
        y: 280
    },
    velocity: {
        x: 1,
        y: -3.5
    },
    speed: {
        x: 1,
        y: -3.5
    },
    moving: true,
    jumping: false,
    sliding: false,
    bouncing: false,

    collision:{
        bottom: false,
        top: false,
        left: false,
        right: false
    },

    // functions

    move: function() {
        this.collisionCheck();

        if (!(this.collision.bottom || this.collision.top)) {
            // emulate gravity buy adding value at y axis
            Player.velocity.y += Enviroment.gravity.y;
            // emulate frictoin in air buy adding value at y axis
            Player.velocity.y *= Enviroment.friction.air.y;
            // Player.velocity.x *= Enviroment.friction.air.x;
            // saving old position
            Player.previousPosition.y = Player.position.y;
            // updating position on y axis
            Player.position.y += Player.velocity.y;
        }
        if (!this.collision.left || !this.collision.right) {
            
            // saving last position
            Player.previousPosition.x = Player.position.x;
            // move along x Axis
            Player.position.x += Player.velocity.x;
        }
    },

    jump: function() {
        
        if (Player.bouncing) {
            Player.velocity.y = Player.speed.y;
        }
        // emulate gravity buy adding value at y axis
        Player.velocity.y += Enviroment.gravity.y;
        // emulate frictoin in air buy adding value at y axis
        Player.velocity.y *= Enviroment.friction.air.y;
        // Player.velocity.x *= Enviroment.friction.air.x;
        // saving old position
        Player.previousPosition.y = Player.position.y;
        // updating position on y axis
        Player.position.y += Player.velocity.y;
    },
    slide: function() {
        if (Player.velocity.y >= 0) {
            Player.position.y +=
                Player.velocity.y * Enviroment.friction.ground.y;
        }
    },

    bounce: function() {
        if (Player.position.x <= 0) {
            Player.velocity.x = Math.abs(Player.speed.x);
        } else {
            Player.velocity.x = -Math.abs(Player.speed.x);
        }
        Player.sliding = false;
        Player.bouncing = false;
    },

    checkBoundries: function() {
        const Bottom =
            Player.position.y >
            Enviroment.$frame.height() - Player.htmlElement.height();
        const Left = Player.position.x <= 0;
        const Right =
            Player.position.x >=
            Enviroment.$frame.width() - Player.htmlElement.width();

        if (Bottom) {
            // Player.position.y =
            //     Enviroment.$frame.height() - Player.htmlElement.height();
            // Reset movement state
            Player.moving = true;
            Player.jumping = false;
            Player.sliding = false;
            Player.bouncing = false;
            // Reset Velocity on axis x
            if (Player.velocity.x >= 0) {
                Player.velocity.x = Math.abs(Player.speed.x);
            }
            if (Player.velocity.x < 0) {
                Player.velocity.x = -Math.abs(Player.speed.x);
            }
        }

        if (Left) {
            Player.position.x = 1;
        }
        if (Right) {
            Player.position.x =
                -1 + Enviroment.$frame.width() - Player.htmlElement.width();
        }
        if ((Left || Right) && Player.jumping && Player.velocity.y > 0) {
            Player.sliding = true;
        }
    },
    collisionCheck: function() {
        const Bottom =
            Player.position.y >=
            Enviroment.$frame.height() - Player.htmlElement.height();
        const Top= false;
        const Left= false;
        const Right= false;
        
        if (Bottom) {
            this.collision.bottom = true;
        } else if (Top) {
            this.collision.top = true;;
        } else if (Left) {
            this.collision.left = true;;
        } else if (Right) {
            this.collision.right = true;;
        }

    },

    updatePosition: function() {
        // assign x and y coordinate to html top and left properities
        Player.htmlElement.css({
            left: Player.position.x + "px",
            top: Player.position.y + "px"
        });
    }
};

export default Player;
