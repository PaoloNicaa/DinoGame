export class Obstacle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.obstacles = [];
    }

    create(minHeight, maxHeight) {
        const obstacleHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight; // Altezza casuale tra minHeight e maxHeight
        const obstacle = {
            x: this.canvas.width,
            y: this.canvas.height - 50 - obstacleHeight,
            width: 20,
            height: 50 + obstacleHeight,
            speed: 3
        };
        this.obstacles.push(obstacle);
    }

    draw() {
        this.ctx.fillStyle = "#333";
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }
}
