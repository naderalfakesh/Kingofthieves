import Enviroment from "./Enviroment.js";
import Controller from "./Controller.js";

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
        x: 1.5,
        y: -3.5
    },
    speed: {
        x: 1.5,
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
        }
        // check collision after updating position
        this.collisionCheck();
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
        this.position.y += this.velocity.y * Enviroment.friction.ground.y;
    },

    bounce: function() {
        this.velocity.x = -this.velocity.x;
        this.sliding = false;
        this.bouncing = true;
    },

    collisionCheck: function() {
        const blockcoll= this.blocksCollision();
        const bottom =
            this.position.y >=
            Enviroment.$frame.height() - this.htmlElement.height();
        const top = this.position.y <= 0;
        const left = this.position.x <= 1;
        const right =
            this.position.x >=
            -1 + Enviroment.$frame.width() - this.htmlElement.width();

        this.collision.top = blockcoll.top || top
        this.collision.left = blockcoll.left || left
        this.collision.bottom = blockcoll.bottom || bottom
        this.collision.right = blockcoll.right || right
        if (this.collision.left) {
            // this.position.x += 1;
        }
        if (this.collision.right) {
            // this.position.x -= 1;
        }
        // console.log(this.collision.bottom)
        if (this.collision.bottom) {
            // this.position.y =
            //     Enviroment.$frame.height() - this.htmlElement.height();
            this.jumping = false;
            this.sliding = false;
        }

        if (
            (this.collision.left || this.collision.right) &&
            this.jumping &&
            this.velocity.y >= 0
        ) {
            this.sliding = true;
        }

       
    },
    blocksCollision: function(){
        const result = {top:false ,left:false ,bottom:false , right: false }
        Enviroment.blocks.map(
            (item,i) => {
                if( (Math.round(this.position.x) + this.width >= item.left-0.5 &&
                    Math.round(this.position.x) + this.width < item.left+0.5) &&
                    this.velocity.x > 0
                    && Math.round(this.position.y) >= item.top &&
                     Math.round(this.position.y) <= (item.top + item.height) ){
                    // console.log(i,"left collision")
                    result.right = true;
                    this.position.x = item.left -this.width;
                }
                if(this.position.x <= 77 && this.position.x > 75 && this.velocity.x <0){
                    console.log("nader")
                }
                if( (Math.round(this.position.x)  >= item.left+item.width-0.5 &&
                    Math.round(this.position.x)  < item.left+item.width+0.5) &&
                    this.velocity.x < 0
                    && Math.round(this.position.y) >= item.top &&
                     Math.round(this.position.y) <= (item.top + item.height) ){
                    // console.log(i,"right collision")
                    result.left = true; 
                    this.position.x =  item.left + item.width;
                }
                if(Math.round(this.position.y) + this.height >= item.top - 1 &&
                    Math.round(this.position.y) + this.height < item.top + 1 &&
                    this.velocity.y > 0 &&
                    Math.round(this.position.x) <= item.left+item.width-0.5 &&
                    Math.round(this.position.x) >= item.left+0.5  ){
                    result.bottom = true; 
                    this.position.y = item.top -  this.height;
                    // console.log(i,"bottom collision" ,this.position.y ,item.top ,this.position.x ,item.left+item.width)

                }
                if(Math.round(this.position.y)  >= item.top+item.height - 1 &&
                    Math.round(this.position.y)  < item.top+item.height - 1 &&
                    this.velocity.y < 0 &&
                    Math.round(this.position.x) > item.left+item.width &&
                    Math.round(this.position.x) < item.left){
                    result.top = true; 
                    this.position.y = item.top+item.height;

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
