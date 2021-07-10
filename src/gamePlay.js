const { TouchBarOtherItemsProxy } = require("electron");

const frogMovePace      = 8;        // frog movement pace 
const refreshRate       = 50;       // refresh rate in miliseconds

let gameFrog;

function gameComponent(initialWidth, initialHeight, initialX, initialY, type, file) {

    this.type = type;
    if (this.type === "img"){
        this.image = new Image();
        this.image.src = file;
    }
    this.width = initialWidth;
    this.height = initialHeight;
    this.x = initialX;
    this.y = initialY;   
    this.speedX = 0;
    this.speedY = 0;      
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "img") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = file;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }

}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = "cvGamePlay";
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;       
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, refreshRate);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    resize: function (h,w){
        this.canvas.height = h;
        this.canvas.width = w;
        //console.log("w: "+ w + " | h: " + h);
    }
}

function initGameComponents() {

    // Init Frog and Game Area
    gameFrog = new gameComponent(40,40, 100, 100, "img", "img/sapo-1.png");
    myGameArea.start();

    // Listen to screen resize
    window.addEventListener("resize", windowResize);
}

function updateGameArea() {
    myGameArea.clear();
    gameFrog.newPos();
    gameFrog.update();
}

function clearMove() {
    gameFrog.speedX = 0; 
    gameFrog.speedY = 0; 
}

function windowResize() {
    myGameArea.resize(document.documentElement.clientHeight,document.documentElement.clientWidth);
}

function keyHandler (evt) {
    //console.log("codigo da tecla: " + evt.keyCode);
    switch (evt.keyCode){
        case 38: // arrowUP
            moveUp();
            break;
        case 40: // arrowDown
            moveDown();
            break; 
        case 37: // arrowLeft
            moveLeft();
            break;
        case 39: // arrowRight
            moveRight();
            break;
    }

}

function moveUp (obj){
    //console.log("mover para cima");
    if (checkCanvasBorders()) {
        gameFrog.speedY = -frogMovePace;
    } else {
        clearMove();
    }
}

function moveDown (obj){
    //console.log("mover para baixo");
    if (checkCanvasBorders()) { 
        gameFrog.speedY = frogMovePace;
    } else {
        clearMove();
    }
}

function moveLeft(obj){
    //console.log("mover para a esquerda");
    if (checkCanvasBorders()) {
        gameFrog.speedX = -frogMovePace;
    } else {
        clearMove();
    }
}

function moveRight (obj) {
    //console.log("mover para a direita");
    if (checkCanvasBorders()) {
        gameFrog.speedX = frogMovePace;
    } else {
        clearMove();
    }
}

function checkCanvasBorders () {
    try {
        //console.log("gfx; " + gameFrog.x);
        //console.log("gfxw; " + gameFrog.x + gameFrog.width + " | cvw: " + myGameArea.canvas.width);
        // Left border
        if (gameFrog.x <= 0) {
            gameFrog.x = 1;
            //console.log("if 1");
            return 0;
        } // Rigth border
        else if ((gameFrog.x + gameFrog.width) >= (myGameArea.canvas.width)) {
            gameFrog.x = (myGameArea.canvas.width - gameFrog.width - 1);
            //console.log("if 2");
            return 0;
        } // Top border 
        else if (gameFrog.y <= 0) {
            gameFrog.y = 1;
            //console.log("if 3");
            return 0;
        } // Bottom border
        else if ((gameFrog.y + gameFrog.height) >= (myGameArea.canvas.height)) {
            gameFrog.y = (myGameArea.canvas.height - gameFrog.height - 1); 
            //console.log("if 4");
            return 0;
        }

        return 1;
    }
    catch (e){
        console.log("Catch Error: " + e);
    }
}