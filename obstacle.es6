export default class Obstacle{
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

    //tekenen van het obstacle
    draw(){
        this.field.fillStyle = this.color 
        this.field.fillRect(this.x, this.y , this.width, this.height);

    };

    //`bewegen van het obstacle, score optellen en het random gegevens meegeven aan het obstacle
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
}