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

    collision: {
        bottom: false,
        top: false,
        left: false,
        right: false
    },

    // functions

    move: function() {
        // check collision before updating position
        this.collisionCheck();
        // If there is no collision at bottom or top then move on Y axis
        if ((!(this.collision.bottom || this.collision.top))||this.jumping) {
            // emulate gravity buy adding value at y axis
            this.velocity.y += Enviroment.gravity.y;
            // emulate frictoin in air buy adding value at y axis
            this.velocity.y *= Enviroment.friction.air.y;
            // this.velocity.x *= Enviroment.friction.air.x;
            // saving old position
            this.previousPosition.y = this.position.y;
            // updating position on y axis
            this.position.y += this.velocity.y;
        }
 
        //If there is no collison on right or left then move on Xaxis
        if (!this.collision.left && !this.collision.right ) {
            // saving last position
            this.previousPosition.x = this.position.x;
            // move along x Axis
            this.position.x += this.velocity.x;
        }

        
    },

    jump: function() {
        this.jumping = true;
        this.velocity.y = this.speed.y;
        if(this.sliding){
            this.bouncing = true;
            this.bounce(); 
            this.bouncing = false;
        }
    },
    slide: function() {
        if (Player.velocity.y >= 0) {
            Player.position.y +=
                Player.velocity.y * Enviroment.friction.ground.y;
        }
    },

    bounce: function() {  
        Player.velocity.x = -Player.velocity.x ;
        Player.sliding = false;
        Player.bouncing = false;
    },

    collisionCheck: function() {
        this.collision.bottom =
            this.position.y >=
            Enviroment.$frame.height() - this.htmlElement.height();
        this.collision.top = this.position.y <= 0;
        this.collision.left = this.position.x <= 0;
        this.collision.right = this.position.x >=
        Enviroment.$frame.width() - this.htmlElement.width(); 
 
        if(this.collision.left){
            this.position.x += 1;
        }
        if(this.collision.right){
            this.position.x -= 1;
        }
        console.log(this.collision.bottom)
        if(this.collision.bottom){
            this.position.y  = Enviroment.$frame.height() - this.htmlElement.height();
            //<<<<<<<<<<< this.jumping = false; >>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<
            this.sliding = false;
        }

        if ((this.collision.left || this.collision.right) && this.jumping && this.velocity.y >= 0) {
            this.sliding = true;
        }

    },

    updatePosition: function() {
        // assign x and y coordinate to html top and left properities
        this.htmlElement.css({
            left: this.position.x + "px",
            top: this.position.y + "px"
        });
    }
};

export default Player;
