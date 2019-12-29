const Enviroment = {
    $frame: $('#frame'),
    gravity: { x: 0 , y: 0.09},
    friction: {
         air: {x:0.99 ,y: 0.99 },
         ground: {x:0 ,y: -0.75 }
    },
    grid: [
        [0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0]
    ],
    start: function(){
        for(let row = 0 ; row <= 3 ; row++){
            for(let column = 0;column <=6 ; column++){
                if(this.grid[row][column]){
                    this.$frame.append($('<div>', {class: `block cell-${row+1}${column+1}`}));
                }
            }
        }
    }
}

export default Enviroment;