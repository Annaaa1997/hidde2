// canvas terugkoppeling naar HTML
const canvas = document.getElementById("veld");
const field = canvas.getContext("2d");

//classes importeren
import Speler from "./classes/speler.es6";
import Obstacle from "./classes/obstacle.es6";

let over = false;

//creeeren van speler en objecten
let speler = new Speler(field);
let obstacle = new Obstacle(field, 10, field.canvas.clientWidth -50);
let obstacle1 = new Obstacle(field, 6,field.canvas.clientWidth +500); 

function gameover () {
    //wanneer de speler op dezelfde plek wordt getekent als het object, dan komt er een
    //melding met game over en de score die je behaalt hebt
    if ( speler.x < obstacle.x + obstacle.width  && speler.x + speler.width  > obstacle.x &&
        speler.y < obstacle.y + obstacle.height && speler.y + speler.height > obstacle.y  ||
        speler.x < obstacle1.x + obstacle1.width  && speler.x + speler.width  > obstacle1.x &&
        speler.y < obstacle1.y + obstacle1.height && speler.y + speler.height > obstacle1.y 
    ){
        let score = obstacle.score + obstacle1.score;
        over = true;
        window.alert('game over \nscore = ' + score);
    }
}

// game loop, tekenen van spelers en objecten in het canvas nadat deze worden verwijdert om de 40 ms
setInterval(function (){

    field.clearRect(0 , 0, field.canvas.clientWidth, field.canvas.clientHeight); 
    speler.draw(); 
    obstacle.draw();
    obstacle.move();
    obstacle1.draw();
    obstacle1.move();

    gameover();
}, 40);

//toets aanslagen meten en deze een functie laten starten 
document.onkeydown = function (e){
    if(e.keyCode == 40) {
       if (speler.isDucking == false){
            speler.duck();
       }
    }
    
    if (e.keyCode == 38) {
        if (speler.isJumping == false){
            speler.jump();
        }    
    }
};