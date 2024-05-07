export class Ground {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.backgroundImage = document.getElementById('backgroundImg');
    }

    draw() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);
        this.ctx.drawImage(this.backgroundImage, 0, -50, this.canvas.width, this.canvas.height);
    }
}
