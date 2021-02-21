var balloon

function preload(){
backgroundimg = loadImage("Hot Air Ballon-01.png") 
balloonimg = loadImage("Hot Air Ballon-02.png")
secondballoonimg = loadImage("Hot Air Ballon-03.png")

}

function setup(){
    database = firebase.database()
    createCanvas(800,500);
    balloon = createSprite(150,300,10,10);
    var balloonposition = database.ref("balloon/position")
    balloonposition.on("value",readPosition,showError)
}

function draw(){
    background(backgroundimg);
    balloon.addImage(balloonimg)

    textSize(15.5)
    fill ("red")
    text("Move the hot air balloon with the right and left arrow keys.\nTo make the hot air balloon smaller, press the down arrow.\nTo make the hot air balloon larger, press the up arrow.\nPress the space key to bring it back to it's original size.\nTo change the hot air balloon colour, press the 'n' key.",5,20)

    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
        balloon.scale = 1.5
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
        balloon.scale = 0.5
    }
    else if(keyDown("space")){
    balloon.scale = 1.0  
    }
    else if(keyDown("n")){
    balloon.addImage(secondballoonimg)
    }
    drawSprites();
}

function changePosition(x,y){
database.ref("balloon/position").set({
"x":position.x+x,
"y":position.y+y 
})
}

function readPosition(data){
position = data.val()
balloon.x = position.x
balloon.y = position.y
}

function showError(){
console.log("There is an error")
}
