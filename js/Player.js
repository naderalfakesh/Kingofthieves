import Enviroment from "./Enviroment.js";

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

        // Check movement direction and redirect player 
        if(this.velocity.x < 0){
            this.htmlElement.addClass("flipped");
        }
        else{
            this.htmlElement.removeClass("flipped");    
        }
    },

    jump: function() { // when jump triggered add velocity on Y axis
        if (!this.jumping || this.sliding) {
            this.jumping = true;
            this.velocity.y = this.speed.y;
            if (this.sliding) {
                this.bounce();
            }
        }
    },

    slide: function() { // If player is sliding on walls set velocity to downward and reduce speed by friction
            this.velocity.y = -this.speed.y;
        this.position.y += this.velocity.y * Enviroment.friction.ground.y;
        
    },

    bounce: function() {// bouncing from walls to opposit direction
        this.velocity.x = -this.velocity.x;
        this.sliding = false;
        this.bouncing = true;
    },

    collisionCheck: function() {// general collision detection

        const blockcoll = this.blocksCollision(); // detect collision with blocks
        
        // detect collision with frame walls 
        const bottom =
            this.position.y >=
             Enviroment.$frame.height() - this.htmlElement.height() ;

        const top = this.position.y <= 0;

        const left = this.position.x <= 0;

        const right =
            this.position.x >=
         Enviroment.$frame.width() - this.htmlElement.width();

         // set collision global variable
        this.collision.top = blockcoll.top || top;
        this.collision.left = blockcoll.left || left;
        this.collision.bottom = blockcoll.bottom || bottom;
        this.collision.right = blockcoll.right || right;
        
        if (left) {// reset position on collision 
            this.position.x = 0;
        }
        if (right) {// reset position on collision 
            this.position.x = Enviroment.$frame.width() - this.htmlElement.width();
        }
        if (bottom) {// reset position on collision 
            this.position.y = Enviroment.$frame.height() - this.htmlElement.height() ;
        }
        if (this.collision.top) { // bounce from top downward
            this.velocity.y = - 0.3*this.speed.y;
        }
        if (this.collision.bottom) { // detect jump and slide finish point
            this.jumping = false;
            this.sliding = false;
        }
        if (// detect sliding moment 
            (this.collision.left || this.collision.right) &&
            (this.jumping || !this.collision.bottom) &&
            this.velocity.y >= 0
        ) {
            this.sliding = true;
        }

        // detect sliding finish point of block when the edge is on the air 
        if(!(this.collision.left || this.collision.right) && this.sliding){
            this.sliding = false;
            this.velocity.y =  -0.2*this.speed.y;
        }
    },

    blocksCollision: function() {// detect collisoin with blocks
        let result = { top: false, left: false, bottom: false, right: false };
        const xEdge = 2; // tolerance for collision on X axis
        const yEdge = 5; // tolerance for collision on Y axis

        // player edges for code readiblity purpose
        const playerBottom = this.position.y + this.height;
        const playerRight = this.position.x + this.width;
        const playerTop = this.position.y;
        const playerLeft = this.position.x;

        // checking every block if it is collidates with player
        Enviroment.blocks.forEach((block, i) => {
            const blockBottom = block.top + block.height;
            const blockRight = block.left + block.width;

            //player right edge collision with block
            if (
                playerRight >= block.left &&
                this.previousPosition.x + this.width < block.left &&
                this.velocity.x > 0 &&
                playerBottom-yEdge >= block.top &&
                playerTop+yEdge <= blockBottom
            ) {
                result.right = true;
                this.position.x = block.left - this.width
            }

            //player left edge collision with block
            if (
                playerLeft <= blockRight &&
                this.previousPosition.x > blockRight &&
                this.velocity.x < 0 &&
                playerBottom-yEdge >= block.top &&
                playerTop+yEdge <= blockBottom
            ) {
                result.left = true;
                this.position.x = blockRight;

            }

            //player bottom edge collision with block
            if (
                playerBottom >= block.top &&
                this.previousPosition.y + this.height < block.top &&
                this.velocity.y > 0 &&
                playerLeft+xEdge <= block.left + block.width &&
                playerRight-xEdge >= block.left
            ) {
                result.bottom = true;
                this.position.y = block.top - this.height;

            }
            
            //player top edge collision with block
            if (
                playerTop <= blockBottom &&
                this.previousPosition.y > blockBottom &&
                this.velocity.y < 0 &&
                playerLeft+xEdge <= block.left + block.width &&
                playerRight-xEdge >= block.left
            ) {
                result.top = true;
                this.position.y = blockBottom;
            }
        });
        return result;
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
