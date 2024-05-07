export class Dino {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = 50;
        this.y = this.canvas.height - 100;
        this.width = 50;
        this.height = 50;
        this.jumping = false;
        this.jumpHeight = 100;
        this.jumpSpeed = 15;
        this.gravity = 0.3;
        this.jumpingPlayerImage = document.getElementById('jumpingPlayerImg');
        this.runningPlayerImage1 = document.getElementById('runningPlayerImg1');
        this.runningPlayerImage2 = document.getElementById('runningPlayerImg2');
    }

    draw(frameCount) {
        let playerImage = this.runningPlayerImage1; // Default: immagine del giocatore che corre
        
        // Se il giocatore sta saltando, utilizza l'immagine del giocatore che salta
        if (this.jumping) {
            playerImage = this.jumpingPlayerImage;
        } else {
            // Alterna tra le due immagini del giocatore che corre per un'animazione più fluida
            if (frameCount % 10 === 0) {
                playerImage = (playerImage === this.runningPlayerImage1) ? this.runningPlayerImage2 : this.runningPlayerImage1;
            }
        }
        
        this.ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }
}
