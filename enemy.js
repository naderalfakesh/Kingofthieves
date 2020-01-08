import Enviroment from "./Enviroment.js";


const Enemy = {
    htmlElement: $(".enemy"),
    height: 20,
    width: 20,
    position: {
        x: 100,
        y: 75
    },
    initialBlockPosition:{
        x:7,
        y:1
    },
    velocity: {
        x: 2.2,
        y: -4.5
    },
    angle : 0,
    angular_speed : 0.03,
    radius:75,
    blocknum: 3,
    move: function(){

        this.position.x = this.position.x + this.radius/2 * Math.cos(this.angle);
        this.position.y = this.position.y + this.radius/2 * Math.sin(this.angle);
        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += this.angular_speed;
        this.updatePosition();
    },
    moveY: function(){

        this.position.x = (this.initialBlockPosition.x-1) * Enviroment.$frame.width()/7 + (Enviroment.$frame.width()/7/2-this.width/2);
        this.position.y = this.initialBlockPosition.y + 0.5*this.blocknum * this.radius + 0.5*this.blocknum * this.radius *Math.sin(this.angle);
        // this.position.y *= 2;
        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += this.angular_speed;
        this.updatePosition();
    },
    
    updatePosition: function() {
        // assign x and y coordinate to html top and left properities
        this.htmlElement.css({
            left: this.position.x + "px",
            top: this.position.y + "px"
        });
    }

}

export default Enemy;