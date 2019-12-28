import Enviroment from "./Enviroment.js";

// const UP_LEFT = -3 * Math.PI / 4;
// const UP_RIGHT = - Math.PI / 4;
// const DOWN_LEFT =  3* Math.PI / 4;
// const DOWN_RIGHT =  Math.PI / 4;


const Player = {
    // constants
    htmlElement : $('#player'),
    position: {
        x: 200 , 
        y: 280 
    },
    velocity:{
        x: -1 ,
        y: 0
    },
    jumping: false,
    sliding: false,

    // functions 
    checkBoundries: function (){
        const onGround = Player.position.y > Enviroment.$frame.height() - Player.htmlElement.height(); 
        const onLeftWall = Player.position.x <= 0;
        const onRightWall =Player.position.x >= Enviroment.$frame.width() - Player.htmlElement.width();
       
        
        if( onGround ){
            Player.jumping = false;
            Player.sliding = false;
            Player.velocity.y = 0; 
        }
       
        if ( onLeftWall || onRightWall ){
            Player.velocity.x = 0;
        }

        if (onLeftWall && Player.jumping ){
            Player.sliding = true; 
            
        }

    
    },

    updatePosition: function (){
        Player.htmlElement.css({
            left: Player.position.x + "px",
            top: Player.position.y + "px",
        })
    },

    jump: function (){
        Player.velocity.y += Enviroment.gravity.y 
        Player.velocity.y *= Enviroment.friction.air.y 
        Player.position.y += Player.velocity.y;
        
    },

    walk: function (){
        Player.position.x += Player.velocity.x;
    },

    slide: function (){
        if(Player.velocity.y > 0){
            Player.position.y += Player.velocity.y * Enviroment.friction.ground.y;
        }
        // console.log(Player.velocity.y)
    }





}


export default Player;