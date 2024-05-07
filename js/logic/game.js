import { GameCanvas } from '../models/gameCanvas.js';
import { Ground } from '../models/ground.js';
import { Dino } from '../models/dino.js';
import { Obstacle } from '../models/obstacle.js';

class Game {
    constructor() {
        this.canvas = new GameCanvas();
        this.ground = new Ground(this.canvas.canvas, this.canvas.ctx);
        this.dino = new Dino(this.canvas.canvas, this.canvas.ctx);
        this.obstacle = new Obstacle(this.canvas.canvas, this.canvas.ctx);
        this.score = 0;
        this.gameRunning = true;
        this.obstacleSpeed = 3; // Velocità degli ostacoli
        this.initialObstacleInterval = [120, 180]; // Intervallo di tempo iniziale tra la creazione di ostacoli (in frame)
        this.minObstacleInterval = 50; // Intervallo di tempo minimo tra la creazione di ostacoli (in frame)
        this.maxObstacleSpeed = 6; // Velocità massima degli ostacoli
        this.frameCount = 0;
        this.nextObstacleTime = this.getRandomInterval(); // Tempo per il prossimo ostacolo
        this.init();
    }

    init() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowUp' && !this.dino.jumping) {
                this.dino.jumping = true;
            }
            if (event.code === 'ArrowDown') {
                // Imposta il giocatore sul pavimento quando si preme la freccia verso il basso
                this.dino.y = this.canvas.canvas.height - 100;
            }
        });
    
        this.gameLoop();
    }

    gameOver() {
        this.gameRunning = false;
        alert("Game Over! Your score: " + this.score);
    }

    getRandomInterval() {
        return Math.floor(Math.random() * (this.initialObstacleInterval[1] - this.initialObstacleInterval[0] + 1)) + this.initialObstacleInterval[0];
    }

    increaseDifficulty() {
        // Verifica se lo score è maggiore o uguale a 10 prima di aumentare la velocità degli ostacoli
        if (this.score >= 4 && this.obstacleSpeed < this.maxObstacleSpeed) {
            // Aumenta la velocità degli ostacoli solo se non è già stata raggiunta la velocità massima
            this.obstacleSpeed += 0.1; // Modifica il valore di incremento come preferisci
        }
        
        // Riduci gradualmente l'intervallo di generazione degli ostacoli man mano che il gioco avanza
        const minInterval = 20; // Intervallo minimo tra la generazione di ostacoli
        const maxInterval = 100; // Intervallo massimo tra la generazione di ostacoli
        const intervalDecreaseRate = 0.1; // Tasso di diminuzione dell'intervallo
        const newInterval = Math.max(minInterval, this.initialObstacleInterval[0] - intervalDecreaseRate * this.score);
        this.initialObstacleInterval = [newInterval, Math.max(newInterval, maxInterval)]; // Aggiorna l'intervallo
    }
    
    gameLoop() {
        if (this.gameRunning) {
            this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);

            this.ground.draw();
            this.dino.draw(this.frameCount);
            this.obstacle.draw();
            this.drawScore();

            this.increaseDifficulty();
            this.updateDino();
            this.updateObstacles();
            this.checkCollisions();
            this.updateScore();

            this.frameCount++;
            if (this.frameCount >= this.nextObstacleTime) {
                this.obstacle.create(20, 40); // Genera solo un ostacolo ad ogni ciclo di gioco
                this.nextObstacleTime = this.frameCount + this.getRandomInterval(); // Calcola il tempo per il prossimo ostacolo
            }

            requestAnimationFrame(() => this.gameLoop());
        }
    }

    getObstacleCount() {
        // Aumenta il numero di ostacoli generati in base alla velocità attuale del gioco
        return Math.floor(this.obstacleSpeed);
    }

    drawScore() {
        this.canvas.ctx.fillStyle = "#333";
        this.canvas.ctx.font = "20px Arial";
        this.canvas.ctx.fillText("Score: " + this.score, 10, 30);
    }

    updateDino() {
        if (this.dino.jumping) {
            this.dino.y -= this.dino.jumpSpeed;
            this.dino.jumpSpeed -= this.dino.gravity;
            if (this.dino.y >= this.canvas.canvas.height - 100) {
                this.dino.y = this.canvas.canvas.height - 100;
                this.dino.jumpSpeed = 5;
                this.dino.jumping = false;
            }
        }
    }

    updateObstacles() {
        this.obstacle.obstacles.forEach(obstacle => {
            obstacle.x -= obstacle.speed * this.obstacleSpeed; // Aggiorna la posizione degli ostacoli con la velocità corrente
        });

        this.obstacle.obstacles = this.obstacle.obstacles.filter(obstacle => obstacle.x > -obstacle.width); // Rimuove gli ostacoli usciti dallo schermo
    }

    checkCollisions() {
        this.obstacle.obstacles.forEach(obstacle => {
            if (
                this.dino.x < obstacle.x + obstacle.width &&
                this.dino.x + this.dino.width > obstacle.x &&
                this.dino.y < obstacle.y + obstacle.height &&
                this.dino.y + this.dino.height > obstacle.y
            ) {
                this.gameOver();
            }
        });
    }

    updateScore() {
        this.obstacle.obstacles.forEach(obstacle => {
            if (obstacle.x + obstacle.width < this.dino.x && !obstacle.passed) {
                obstacle.passed = true; // flag per indicare che l'ostacolo è stato superato
                this.score++; // si incrementa lo score solo quando l'ostacolo è superato per la prima volta
            }
        });
    }
}

new Game();
