import Enviroment from "./Enviroment.js";


const Enemy = {
    htmlElement: $("#enemy"),
    height: 20,
    width: 20,
    position: {
        x: 100,
        y: 50
    },
    velocity: {
        x: 2.2,
        y: -4.5
    },
    angle : 0,
    angular_speed : 0.05,
    radius:5,
    move: function(){

        this.position.x = this.position.x + this.radius * Math.cos(this.angle);
        this.position.y = this.position.y + this.radius * Math.sin(this.angle);
        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += this.angular_speed;
        // this.velocity.y += Enviroment.gravity.y;
        // this.position.y += this.velocity.y;
        // this.position.x += this.velocity.x;
        this.htmlElement.css({
            left: this.position.x + "px",
            top: this.position.y + "px"
        });

    }
}

export default Enemy;