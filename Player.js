import Enviroment from "./Enviroment.js";
import Controller from "./Controller.js";
import "./js/jquery.overlap.min.js";

const Player = {
    // constants
    htmlElement: $("#player"),
    height: 20,
    width: 20,
    position: {
        x: 200,
        y: 280
    },
    previousPosition: {
        x: 200,
        y: 280
    },
    velocity: {
        x: 2.2,
        y: -4.5
    },
    speed: {
        x: 2.2,
        y: -4.5
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
        // If there is no collision at bottom or top then move on Y axis
        if (!(this.collision.bottom || this.collision.top) || this.jumping) {
            // emulate gravity buy adding value at y axis
            this.velocity.y += Enviroment.gravity.y;
            // if sliding slow down with ground friction
            if (this.sliding) {
                this.slide();
            } else {
                // emulate frictoin in air buy adding value at y axis
                this.velocity.y *= Enviroment.friction.air.y;
            }
            // this.velocity.x *= Enviroment.friction.air.x;

            // saving old position
            this.previousPosition.y = this.position.y;
            // updating position on y axis
            this.position.y += this.velocity.y;
        }

        //If there is no collison on right or left then move on Xaxis
        if (
            (!this.collision.left && !this.collision.right) ||
            (!this.collision.left && this.bouncing) ||
            (!this.collision.right && this.bouncing)
        ) {
            if (this.bouncing) {
                this.bouncing = false;
            }
            // savin-g last position
            this.previousPosition.x = this.position.x;
            // move along x Axis
            this.position.x += this.velocity.x;
            if(this.jumping){
                this.position.x += 0.1*this.velocity.x;
            }
        }
        // check collision after updating position
        // this.collisionCheck();
    },

    jump: function() {
        if (!this.jumping || this.sliding) {
            this.jumping = true;
            this.velocity.y = this.speed.y;
            if (this.sliding) {
                this.bounce();
            }
        }
    },
    slide: function() {
            this.velocity.y = -this.speed.y;
        this.position.y += this.velocity.y * Enviroment.friction.ground.y;
        
    },

    bounce: function() {
        this.velocity.x = -this.velocity.x;
        this.sliding = false;
        this.bouncing = true;
    },

    collisionCheck: function() {

        const blockcoll = this.blocksCollision();
        
        const bottom =
            this.position.y >
            Math.round(Enviroment.$frame.height() - this.htmlElement.height());

        const top = this.position.y <= 0;

        const left = this.position.x <= 0;

        const right =
            this.position.x >=
            -1 + Enviroment.$frame.width() - this.htmlElement.width();

        this.collision.top = blockcoll.top || top;
        this.collision.left = blockcoll.left || left;
        this.collision.bottom = blockcoll.bottom || bottom;
        this.collision.right = blockcoll.right || right;
        if (this.collision.left) {
            // this.position.x += 1;
        }
        if (this.collision.right) {
            // this.position.x -= 1;
        }
        // console.log(this.collision.bottom)
        if (bottom) {
            this.position.y =
                Math.round(
                    Enviroment.$frame.height() - this.htmlElement.height()
                ) + 0.5;
        }
        if (this.collision.top) {
            this.velocity.y = - 0.3*this.speed.y;
        }
        if (this.collision.bottom) {
            this.jumping = false;
            this.sliding = false;
        }
        if (
            (this.collision.left || this.collision.right) &&
            (this.jumping || !this.collision.bottom) &&
            this.velocity.y >= 0
        ) {
            this.sliding = true;
        }
        if(!(this.collision.left || this.collision.right) && this.sliding){
            this.sliding = false;
            this.velocity.y =  -0.2*this.speed.y;
        }
    },
    blocksCollision: function() {
        let result = { top: false, left: false, bottom: false, right: false };
        const xEdge = 2;
        const yEdge = 5;
        const playerBottom = this.position.y + this.height;
        const playerRight = this.position.x + this.width;
        const playerTop = this.position.y;
        const playerLeft = this.position.x;

        Enviroment.blocks.forEach((item, i) => {
            const itemBottom = item.top + item.height;
            const itemRight = item.left + item.width;

            // checking collision between player right and block
            if (
                playerRight >= item.left &&
                this.previousPosition.x + this.width < item.left &&
                this.velocity.x > 0 &&
                playerBottom-yEdge >= item.top &&
                playerTop+yEdge <= itemBottom
            ) {
                result.right = true;
                this.position.x = item.left - this.width
            }

            // checking collision between player left and block
            if (
                playerLeft <= itemRight &&
                this.previousPosition.x > itemRight &&
                this.velocity.x < 0 &&
                playerBottom-yEdge >= item.top &&
                playerTop+yEdge <= itemBottom
            ) {
                result.left = true;
                this.position.x = itemRight;

            }

            // checking collision between player bottom and block
            if (
                playerBottom >= item.top &&
                this.previousPosition.y + this.height < item.top &&
                this.velocity.y > 0 &&
                playerLeft+xEdge <= item.left + item.width &&
                playerRight-xEdge >= item.left
            ) {
                result.bottom = true;
                this.position.y = item.top - this.height;

            }
            
            if (
                playerTop <= itemBottom &&
                this.previousPosition.y > itemBottom &&
                this.velocity.y < 0 &&
                playerLeft+xEdge <= item.left + item.width &&
                playerRight-xEdge >= item.left
            ) {
                result.top = true;
                this.position.y = itemBottom;
            }
        });
        return {
            top: result.top,
            left: result.left,
            bottom: result.bottom,
            right: result.right
        };
    },

    blockCollisionRight: function(item) {
        const playerRight = this.position.x + this.width;
        const playerYCenter = this.position.y + 0.5 * this.height;
        const itemBottom = item.top + item.height;
        if (
            playerRight >= item.left &&
            this.previousPosition.x + this.width < item.left &&
            this.velocity.x > 0 &&
            playerYCenter >= item.top &&
            playerYCenter <= itemBottom
        ) {
            return true;
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
