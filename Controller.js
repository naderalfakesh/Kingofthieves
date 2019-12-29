const Controller = {
    keyPressed : false,
    keyListner: function(event){
        if(event.code == "Space" ){
            Controller.keyPressed = true;
        }
    }
}

export default Controller;