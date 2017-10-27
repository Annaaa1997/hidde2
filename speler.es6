export default class Speler{
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

    //speler tekenen
    draw(){
        this.field.fillStyle= this.color;
        this.field.fillRect(this.x, this.y, this.width, this.height);
    } 
    
    //het omhoog bewegen van de speler en na bepaalde tijd terug naar beneden zetten
    jump(){
        this.isJumping = true;
        this.y -= this.jumpHeight;
        let that = this
        setTimeout(function(){
            that.isJumping = false;
            that.y += that.jumpHeight;  
        }, this.waitTime )
    }

    //het laten bukken van de speler en na bepaalde tijd terug naar omhoog zetten
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

 