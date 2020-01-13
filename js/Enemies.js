import Enviroment from "./Enviroment.js";

// getting grid blocks width and height 
const blockWidth = Enviroment.$frame.width() / 7;
const blockheight = Enviroment.$frame.height() / 4;

// Enemy parent class
const Enemy = function(
    id = "circular",
    height= 16,
    width= 20,
    column = 1,
    row = 1,
    blockSpan = 1
    ){
    
    this.id = id;
    this.height = height;
    this.width = width;
    this.initialBlockPosition = {
        x: column,
        y: row
    };
    this.blocknum = blockSpan;
    this.position = {
        x: this.initialPositionX,
        y: this.initialPositionY
    };
    this.htmlElement = $(".enemy");
    this.class = "enemy";
    this.angle = 0;
    this.angular_speed = 0.03;

    // setting initial position of enemy at the center of initial block
    this.initialPositionX = (this.initialBlockPosition.x - 1) * blockWidth +
    (0.5 * blockWidth - 0.5 * this.width);

    this.initialPositionY = (this.initialBlockPosition.y - 1) * blockheight +
    (0.5 * blockheight - 0.5 * this.height);

    // function to create enemy html div 
    this.createHtmlEnemy = function() {
        $("<div>", { class: "enemy", id: this.id })
            .css({
                height: this.height,
                width: this.width,
                left: this.initialPositionX,
                top: this.initialPositionY
            })
            .appendTo(Enviroment.$frame);
    };

    // function to reset enemy position to the initial position when win or loose 
    this.reset = function() {
        $("#" + this.id).css({
            left: this.initialPositionX + "px",
            top: this.initialPositionY + "px"
        });
    };

    // function to update enemies when layout is changed
    this.update = function(
        column = 1,
        row = 1,
        blockSpan = 1
        ) {
        this.initialBlockPosition = {
            x: column,
            y: row
        };
        this.blocknum = blockSpan;

        this.initialPositionX =
            (this.initialBlockPosition.x - 1) * blockWidth +
            (0.5 * blockWidth - 0.5 * this.width);
        this.initialPositionY =
            (this.initialBlockPosition.y - 1) * blockheight +
            (0.5 * blockheight - 0.5 * this.height);
        this.position = {
            x: this.initialPositionX,
            y: this.initialPositionY
        };

        this.reset();
    };

    // function to update enemies position on every frame transition
    this.updatePosition = function() {
        // assign x and y coordinate to html top and left properities
        $("#" + this.id).css({
            left: this.position.x + "px",
            top: this.position.y + "px"
        });
    };
};

// Vertical moving enemy child of object Enemy
function verticalMover(id, height, width, column, row, blockSpan) {

    Enemy.call(this, id, height, width, column, row, blockSpan);// inheritance

    this.createHtmlEnemy();// creating the div element when creating inistance
    
    this.move = function() {// Function to make the enemy moves vertically in specified row span

        this.position.x =
            (this.initialBlockPosition.x - 1) * blockWidth +
            (0.5 * blockWidth - 0.5 * this.width);

        this.position.y =
            (this.initialBlockPosition.y - 1) * blockheight + // y offset calculation
            0.5 * this.blocknum * blockheight - 0.5 * this.height + // half column span - half enemy height
           (0.5 * this.blocknum * blockheight - 0.5 * this.height) * Math.sin(this.angle);// [-1,+1] * above quantity

        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += this.angular_speed;

        this.updatePosition();
    };
}

// Horizontal moving enemy child of object Enemy
function HorizontalMover(id, height, width, column, row, blockSpan) {

    Enemy.call(this, id, height, width, column, row, blockSpan);// inheritance

    this.createHtmlEnemy();// creating the div element when creating inistance

    this.move = function() {// Function to make the enemy moves horizontal in specified column span

        this.position.x =
            (this.initialBlockPosition.x - 1) * blockWidth + // x offset calculation
            0.5 * this.blocknum * blockWidth - 0.5 * this.width + // half row span - half enemy width
           (0.5 * this.blocknum * blockWidth - 0.5 * this.width) * Math.cos(this.angle);// [-1,+1] * above quantity

        this.position.y =
            (this.initialBlockPosition.y - 1) * blockheight +
            (0.5 * blockheight - 0.5 * this.height);

        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += this.angular_speed;
        
        this.updatePosition();
    };
}

// circular moving enemy child of object Enemy
function circularMover(id, height, width, column, row, blockSpan) {

    Enemy.call(this, id, height, width, column, row, blockSpan);// inheritance

    this.createHtmlEnemy();// creating the div element when creating inistance

    this.move = function() {// Function to make the enemy moves circular in specified row and column span


        this.position.x =
            (this.initialBlockPosition.x - 1) * blockWidth + // x offset calculation
            0.5 * this.blocknum * blockWidth - 0.5 * this.width + // half row span - half enemy width
            (0.5 * this.blocknum * blockWidth - 0.5 * this.width) * Math.cos(this.angle); // [-1,+1] * above quantity

        this.position.y =
            (this.initialBlockPosition.y - 1) * blockheight + // y offset calculation
            0.5 * this.blocknum * blockheight - 0.5 * this.height + // half column span - half enemy height
           (0.5 * this.blocknum * blockheight - 0.5 * this.height) * Math.sin(this.angle); // [-1,+1] * above quantity

        // Reset the angle after 360 degree turn
        if (this.angle >= Math.PI * 2) this.angle = 0;
        this.angle += 1.3 * this.angular_speed;

        this.updatePosition();
    };
}

export { verticalMover, HorizontalMover, circularMover };
