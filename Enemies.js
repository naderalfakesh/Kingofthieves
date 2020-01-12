import Enviroment from "./Enviroment.js";
import "./js/jquery.overlap.min.js";

const blockWidth = Enviroment.$frame.width() / 7;
const blockheight = Enviroment.$frame.height() / 4;

const Enemy = function(
    id = "circular",
    height = 20,
    width = 20,
    column = 1,
    row = 1,
    blockSpan = 1
) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.initialBlockPosition = {
        x: column,
        y: row
    };
    this.blocknum = blockSpan;
    
    this.velocity = {
        x: 2.2,
        y: -4.5
    };
    
    const xPosition = (this.initialBlockPosition.x - 1) * blockWidth +
    (0.5 * blockWidth - 0.5 * this.width);
    const yPosition = (this.initialBlockPosition.y - 1) * blockheight +
    (0.5 * blockheight - 0.5 * this.height);
    this.position = {
        x: xPosition,
        y: yPosition
    };
    this.createHtmlEnemy = function() {
        $("<div>", { class: "enemy", id: this.id })
            .css({
                height: this.height,
                width: this.width,
                left: this.position.x,
                top: this.position.y
            })
            .appendTo(Enviroment.$frame);
    };
    this.updateHtmlEnemy = function() {
        $("#" + this.id).css({
            left: xPosition + "px",
            top: yPosition + "px"
        });
    };

    this.htmlElement = $(".enemy");
    this.class = "enemy";
    this.angle = 0;
    this.angular_speed = 0.03;
    this.radius = 75;

    this.updatePosition = function() {
        // assign x and y coordinate to html top and left properities
        $("#" + this.id).css({
            left: this.position.x + "px",
            top: this.position.y + "px"
        });
    };
};

function verticalMover(id, height, width, column, row, blockSpan) {
    Enemy.call(this, id, height, width, column, row, blockSpan);
    this.createHtmlEnemy();
    this.move = function() {
        this.position.x =
            (this.initialBlockPosition.x - 1) * blockWidth +
            (0.5 * blockWidth - 0.5 * this.width);
        this.position.y =
            (this.initialBlockPosition.y - 1) * blockheight +
            0.5 * this.blocknum * this.radius +
            0.5 * this.blocknum * this.radius * Math.sin(this.angle);
        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += this.angular_speed;
        this.updatePosition();
    };
}
function HorizontalMover(id, height, width, column, row, blockSpan) {
    Enemy.call(this, id, height, width, column, row, blockSpan);
    this.createHtmlEnemy();
    this.move = function() {
        this.position.x =
            (this.initialBlockPosition.x - 1) * blockWidth +
            0.5 * this.blocknum * this.radius +
            0.5 * this.blocknum * this.radius * Math.cos(this.angle);
        this.position.y =
            (this.initialBlockPosition.y - 1) * blockheight +
            (0.5 * blockheight - 0.5 * this.height);
        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += this.angular_speed;
        this.updatePosition();
    };
}
function circularMover(id, height, width, column, row, blockSpan) {
    Enemy.call(this, id, height, width, column, row, blockSpan);
    this.createHtmlEnemy();
    this.move = function() {
        // this.position.x = this.position.x + this.radius/2 * Math.cos(this.angle);
        this.position.x =
            (this.initialBlockPosition.x - 1) * blockWidth +
            0.5 * this.blocknum * this.radius +
            0.5 * this.blocknum * this.radius * Math.cos(this.angle);
        // this.position.y = this.position.y + this.radius/2 * Math.sin(this.angle);
        this.position.y =
            (this.initialBlockPosition.y - 1) * blockheight +
            0.5 * this.blocknum * this.radius +
            0.5 * this.blocknum * this.radius * Math.sin(this.angle);

        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += 1.5 * this.angular_speed;
        this.updatePosition();
    };
}
export { verticalMover, HorizontalMover, circularMover };
