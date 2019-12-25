const $player = $('#player')
const $frame = $('#frame')


const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DOWN_LEFT =  3* Math.PI / 4;
const DOWN_RIGHT =  Math.PI / 4;

const player={
    direction: 1,
    angel: 1,
    speed: 1,
    left: 200,
    top: 280
}

function update(){
    updatePlayer();
    }

function updatePlayer(){
    if(player.left >= $frame.width() - $player.width() ){
        player.direction = -1
    }
    else if (player.left <= 0){
        player.direction = 1
    }
player.left += Math.cos(player.angel) * player.speed * player.direction

 $player.css({
     left: player.left+"px"
 })
}

setInterval(update, 16)