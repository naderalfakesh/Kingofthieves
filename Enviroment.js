const Enviroment = {
    $frame: $('#frame'),
    gravity: { x: 0 , y: 0.1},
    friction: {
         air: {x:0 ,y: 0.99 },
         ground: {x:0 ,y: -0.75 }
    }
}

export default Enviroment;