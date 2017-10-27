/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_speler_es6__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_obstacle_es6__ = __webpack_require__(2);
// canvas terugkoppeling naar HTML
const canvas = document.getElementById("veld");
const field = canvas.getContext("2d");

//classes importeren



let over = false;

//creeeren van speler en objecten
let speler = new __WEBPACK_IMPORTED_MODULE_0__classes_speler_es6__["a" /* default */](field);
let obstacle = new __WEBPACK_IMPORTED_MODULE_1__classes_obstacle_es6__["a" /* default */](field, 10, field.canvas.clientWidth -50);
let obstacle1 = new __WEBPACK_IMPORTED_MODULE_1__classes_obstacle_es6__["a" /* default */](field, 6,field.canvas.clientWidth +500); 

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
    
    console.log('Score: ' + obstacle.score + obstacle1.score);

   
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Speler{
    constructor(field){
        this.width = 40;
        this.height = 40;
        this.x = field.canvas.clientWidth/2-this.width/2; //breedte van het veld
        this.y = field.canvas.clientHeight-this.height; //hoogte van het veld
        this.color = "blue";
        this.field = field; 
        this.isJumping = false;
        this.isDucking = false;
        this.jumpHeight = 60;
        this.waitTime = 800;
    }

    draw(){

        this.field.fillStyle= this.color;
        this.field.fillRect(this.x, this.y, this.width, this.height);

    } 
    
    jump(){
        this.isJumping = true;
        this.y -= this.jumpHeight;
        let that = this
        setTimeout(function(){
            that.isJumping = false;
            that.y += that.jumpHeight;  
        }, this.waitTime )
    }

    duck(){
        this.isDucking = true;
        this.y += 20;
        let that = this;
        setTimeout(function(){
            that.isDucking = false;
            that.y -= 20;
        }, this.waitTime)

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Speler;


 

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Obstacle{
    constructor(field, speed, x){
        this.width = 40;
        this.height = 40;
        this.x = x;
        this.y = field.canvas.clientHeight-this.height;
        this.color = '#' +Math.random().toString(16).substr(2,6);
        this.field = field;
        this.speed = speed;
        this.score = 0;
    }

    draw(){

       
        this.field.fillStyle = this.color 
        this.field.fillRect(this.x, this.y , this.width, this.height);

    };

    move(){
        
    
            if( this.x + this.width < 0){
                this.color = '#' +Math.random().toString(16).substr(2,6);
                this.width = Math.floor(Math.random() *100);
                this.width = Math.floor(Math.random() *100);
                this.x = this.field.canvas.clientWidth + 1;
                this.score++;
                this.speed += 1;
               
             
            
            }
            this.x -= this.speed;    
    };

    // randomColor(){
    //     return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    // };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Obstacle;


/***/ })
/******/ ]);