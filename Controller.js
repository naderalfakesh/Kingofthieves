const Controller = {
    keyPressed : false,
    keyListner: function(event){
        if(event.code == "Space" || event.code == "ArrowUp" ){
            Controller.keyPressed = true;
        }
    },
    touchListner: function(event){
            Controller.keyPressed = true;

    },
}

export default Controller;