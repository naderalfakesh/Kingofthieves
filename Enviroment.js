const Enviroment = {
    $frame: $('#frame'),
    gravity: { x: 0 , y: 0.09},
    friction: {
         air: {x:0.99 ,y: 0.99 },
         ground: {x:0 ,y: -0.75 }
    }
}

export default Enviroment;