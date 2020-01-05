const Controller = {
    keyPressed : false,
    keyListner: function(event){
        console.log(event.code)
        if(event.code == "Space" || event.code == "ArrowUp" ){
            Controller.keyPressed = true;
        }
    }
}

export default Controller;