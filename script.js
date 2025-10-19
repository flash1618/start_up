// Cosmic Explorer - Space Adventure Game
class CosmicExplorer {
    constructor() {
        this.gameState = {
            isRunning: false,
            isPaused: false,
            score: 0,
            level: 1,
            wave: 1,
            energy: 100,
            health: 100,
            enemiesDestroyed: 0,
            combo: 0,
            maxCombo: 0
        };
        
        this.player = {
            x: 400,
            y: 500,
            width: 60,
            height: 80,
            speed: 5,
            lastShot: 0,
            shootCooldown: 200
        };
        
        this.enemies = [];
        this.projectiles = [];
        this.powerups = [];
        this.explosions = [];
        
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false
        };
        
        this.achievements = {
            firstKill: false,
            combo5: false,
            combo10: false,
            wave5: false,
            wave10: false
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createSpaceBackground();
        this.gameLoop();
    }
    
    setupEventListeners() {
        // Start screen
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('instructions-btn').addEventListener('click', () => this.showInstructions());
        document.getElementById('back-btn').addEventListener('click', () => this.showStartScreen());
        
        // Game controls
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('restart-btn-pause').addEventListener('click', () => this.restartGame());
        document.getElementById('resume-btn').addEventListener('click', () => this.resumeGame());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Mouse controls
        document.addEventListener('click', (e) => this.handleClick(e));
        
        // Pause on space when not shooting
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && this.gameState.isRunning) {
                this.togglePause();
            }
        });
    }
    
    createSpaceBackground() {
        const spaceBackground = document.getElementById('space-background');
        
        // Create stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            spaceBackground.appendChild(star);
        }
        
        // Create planets
        for (let i = 0; i < 5; i++) {
            const planet = document.createElement('div');
            planet.className = 'planet';
            planet.style.left = Math.random() * 100 + '%';
            planet.style.top = Math.random() * 100 + '%';
            planet.style.animationDelay = Math.random() * 5 + 's';
            spaceBackground.appendChild(planet);
        }
    }
    
    startGame() {
        this.gameState.isRunning = true;
        this.gameState.isPaused = false;
        this.gameState.score = 0;
        this.gameState.level = 1;
        this.gameState.wave = 1;
        this.gameState.energy = 100;
        this.gameState.health = 100;
        this.gameState.enemiesDestroyed = 0;
        this.gameState.combo = 0;
        this.gameState.maxCombo = 0;
        
        this.enemies = [];
        this.projectiles = [];
        this.powerups = [];
        this.explosions = [];
        
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        
        this.updateUI();
        this.spawnWave();
    }
    
    showInstructions() {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('instructions-screen').classList.remove('hidden');
    }
    
    showStartScreen() {
        document.getElementById('instructions-screen').classList.add('hidden');
        document.getElementById('start-screen').classList.remove('hidden');
    }
    
    restartGame() {
        this.gameState.isRunning = false;
        this.gameState.isPaused = false;
        document.getElementById('game-over-screen').classList.add('hidden');
        document.getElementById('pause-screen').classList.add('hidden');
        this.startGame();
    }
    
    togglePause() {
        if (this.gameState.isRunning) {
            this.gameState.isPaused = !this.gameState.isPaused;
            if (this.gameState.isPaused) {
                document.getElementById('pause-screen').classList.remove('hidden');
            } else {
                document.getElementById('pause-screen').classList.add('hidden');
            }
        }
    }
    
    resumeGame() {
        this.gameState.isPaused = false;
        document.getElementById('pause-screen').classList.add('hidden');
    }
    
    handleKeyDown(e) {
        if (!this.gameState.isRunning || this.gameState.isPaused) return;
        
        switch(e.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.keys.w = true;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this.keys.a = true;
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.keys.s = true;
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.keys.d = true;
                break;
            case 'Space':
                this.keys.space = true;
                e.preventDefault();
                break;
        }
    }
    
    handleKeyUp(e) {
        switch(e.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.keys.w = false;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this.keys.a = false;
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.keys.s = false;
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.keys.d = false;
                break;
            case 'Space':
                this.keys.space = false;
                break;
        }
    }
    
    handleClick(e) {
        if (!this.gameState.isRunning || this.gameState.isPaused) return;
        this.shoot();
    }
    
    updatePlayer() {
        if (this.keys.w && this.player.y > 0) {
            this.player.y -= this.player.speed;
        }
        if (this.keys.s && this.player.y < 600 - this.player.height) {
            this.player.y += this.player.speed;
        }
        if (this.keys.a && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
        if (this.keys.d && this.player.x < 800 - this.player.width) {
            this.player.x += this.player.speed;
        }
        
        if (this.keys.space) {
            this.shoot();
        }
        
        // Update player position
        const playerShip = document.getElementById('player-ship');
        playerShip.style.transform = `translate(${this.player.x}px, ${this.player.y}px)`;
    }
    
    shoot() {
        const now = Date.now();
        if (now - this.player.lastShot < this.player.shootCooldown) return;
        
        this.player.lastShot = now;
        
        const projectile = {
            x: this.player.x + this.player.width / 2 - 2,
            y: this.player.y,
            width: 4,
            height: 10,
            speed: 8,
            type: 'player'
        };
        
        this.projectiles.push(projectile);
        this.createProjectile(projectile);
    }
    
    createProjectile(projectile) {
        const projectileElement = document.createElement('div');
        projectileElement.className = 'projectile player-projectile';
        projectileElement.style.position = 'absolute';
        projectileElement.style.transform = `translate(${projectile.x}px, ${projectile.y}px)`;
        projectileElement.style.willChange = 'transform';
        document.getElementById('projectiles-container').appendChild(projectileElement);
    }
    
    updateProjectiles() {
        const projectilesContainer = document.getElementById('projectiles-container');
        const projectileElements = projectilesContainer.children;
        
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            
            if (projectile.type === 'player') {
                projectile.y -= projectile.speed;
            } else {
                projectile.y += projectile.speed;
            }
            
            // Remove projectiles that are off screen
            if (projectile.y < -10 || projectile.y > 610) {
                this.projectiles.splice(i, 1);
                if (projectileElements[i]) {
                    projectileElements[i].remove();
                }
                continue;
            }
            
            // Update projectile position
            if (projectileElements[i]) {
                projectileElements[i].style.transform = `translate(${projectile.x}px, ${projectile.y}px)`;
            }
        }
    }
    
    spawnWave() {
        const enemyCount = Math.min(5 + this.gameState.wave * 2, 15); // Cap at 15 enemies max
        
        for (let i = 0; i < enemyCount; i++) {
            setTimeout(() => {
                this.spawnEnemy();
            }, i * 300); // Faster spawning
        }
    }
    
    spawnEnemy() {
        const enemy = {
            x: Math.random() * (800 - 40),
            y: -40,
            width: 40,
            height: 40,
            speed: 1 + this.gameState.wave * 0.15, // Slightly slower
            health: 1 + Math.floor(this.gameState.wave / 3),
            type: Math.random() < 0.2 ? 'fast' : 'normal' // Fewer fast enemies
        };
        
        this.enemies.push(enemy);
        this.createEnemy(enemy);
    }
    
    createEnemy(enemy) {
        const enemyElement = document.createElement('div');
        enemyElement.className = `enemy ${enemy.type}`;
        enemyElement.style.position = 'absolute';
        enemyElement.style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
        enemyElement.style.willChange = 'transform';
        document.getElementById('enemies-container').appendChild(enemyElement);
    }
    
    updateEnemies() {
        const enemiesContainer = document.getElementById('enemies-container');
        const enemyElements = enemiesContainer.children;
        
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.y += enemy.speed;
            
            // Remove enemies that are off screen
            if (enemy.y > 650) {
                this.enemies.splice(i, 1);
                if (enemyElements[i]) {
                    enemyElements[i].remove();
                }
                continue;
            }
            
            // Update enemy position
            if (enemyElements[i]) {
                enemyElements[i].style.transform = `translate(${enemy.x}px, ${enemy.y}px)`;
            }
        }
    }
    
    checkCollisions() {
        // Projectile vs Enemy collisions
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            if (projectile.type !== 'player') continue;
            
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                const enemy = this.enemies[j];
                
                if (this.isColliding(projectile, enemy)) {
                    // Hit!
                    this.projectiles.splice(i, 1);
                    this.enemies.splice(j, 1);
                    
                    // Remove elements
                    const projectileElements = document.querySelectorAll('.projectile');
                    const enemyElements = document.querySelectorAll('.enemy');
                    if (projectileElements[i]) projectileElements[i].remove();
                    if (enemyElements[j]) enemyElements[j].remove();
                    
                    // Create explosion
                    this.createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                    
                    // Update score
                    this.gameState.score += 100;
                    this.gameState.enemiesDestroyed++;
                    this.gameState.combo++;
                    
                    // Check achievements
                    this.checkAchievements();
                    
                    // Spawn power-up occasionally
                    if (Math.random() < 0.3) {
                        this.spawnPowerup(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                    }
                    
                    break;
                }
            }
        }
        
        // Enemy vs Player collisions
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            
            if (this.isColliding(this.player, enemy)) {
                // Hit player!
                this.enemies.splice(i, 1);
                const enemyElements = document.querySelectorAll('.enemy');
                if (enemyElements[i]) enemyElements[i].remove();
                
                this.gameState.health -= 20;
                this.gameState.combo = 0;
                
                if (this.gameState.health <= 0) {
                    this.gameOver();
                }
            }
        }
        
        // Power-up vs Player collisions
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            const powerup = this.powerups[i];
            
            if (this.isColliding(this.player, powerup)) {
                this.powerups.splice(i, 1);
                const powerupElements = document.querySelectorAll('.powerup');
                if (powerupElements[i]) powerupElements[i].remove();
                
                this.collectPowerup(powerup);
            }
        }
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    createExplosion(x, y) {
        const explosion = {
            x: x - 20,
            y: y - 20,
            width: 40,
            height: 40,
            frame: 0,
            maxFrames: 8
        };
        
        this.explosions.push(explosion);
        this.createExplosionElement(explosion);
    }
    
    createExplosionElement(explosion) {
        const explosionElement = document.createElement('div');
        explosionElement.className = 'explosion';
        explosionElement.style.position = 'absolute';
        explosionElement.style.transform = `translate(${explosion.x}px, ${explosion.y}px)`;
        explosionElement.style.willChange = 'transform';
        document.getElementById('explosions-container').appendChild(explosionElement);
    }
    
    updateExplosions() {
        const explosionsContainer = document.getElementById('explosions-container');
        const explosionElements = explosionsContainer.children;
        
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const explosion = this.explosions[i];
            explosion.frame++;
            
            if (explosion.frame >= explosion.maxFrames) {
                this.explosions.splice(i, 1);
                if (explosionElements[i]) {
                    explosionElements[i].remove();
                }
            }
        }
    }
    
    spawnPowerup(x, y) {
        const powerup = {
            x: x - 15,
            y: y - 15,
            width: 30,
            height: 30,
            type: Math.random() < 0.5 ? 'health' : 'energy',
            speed: 2
        };
        
        this.powerups.push(powerup);
        this.createPowerupElement(powerup);
    }
    
    createPowerupElement(powerup) {
        const powerupElement = document.createElement('div');
        powerupElement.className = `powerup ${powerup.type}`;
        powerupElement.style.position = 'absolute';
        powerupElement.style.transform = `translate(${powerup.x}px, ${powerup.y}px)`;
        powerupElement.style.willChange = 'transform';
        document.getElementById('powerups-container').appendChild(powerupElement);
    }
    
    updatePowerups() {
        const powerupsContainer = document.getElementById('powerups-container');
        const powerupElements = powerupsContainer.children;
        
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            const powerup = this.powerups[i];
            powerup.y += powerup.speed;
            
            if (powerup.y > 650) {
                this.powerups.splice(i, 1);
                if (powerupElements[i]) {
                    powerupElements[i].remove();
                }
            } else {
                if (powerupElements[i]) {
                    powerupElements[i].style.transform = `translate(${powerup.x}px, ${powerup.y}px)`;
                }
            }
        }
    }
    
    collectPowerup(powerup) {
        if (powerup.type === 'health') {
            this.gameState.health = Math.min(100, this.gameState.health + 25);
        } else if (powerup.type === 'energy') {
            this.gameState.energy = Math.min(100, this.gameState.energy + 25);
        }
    }
    
    checkAchievements() {
        if (!this.achievements.firstKill && this.gameState.enemiesDestroyed >= 1) {
            this.achievements.firstKill = true;
            this.showAchievement('First Kill!', 'You destroyed your first enemy!');
        }
        
        if (!this.achievements.combo5 && this.gameState.combo >= 5) {
            this.achievements.combo5 = true;
            this.showAchievement('Combo Master!', '5x Combo achieved!');
        }
        
        if (!this.achievements.combo10 && this.gameState.combo >= 10) {
            this.achievements.combo10 = true;
            this.showAchievement('Combo Legend!', '10x Combo achieved!');
        }
        
        if (!this.achievements.wave5 && this.gameState.wave >= 5) {
            this.achievements.wave5 = true;
            this.showAchievement('Wave Warrior!', 'Survived 5 waves!');
        }
        
        if (!this.achievements.wave10 && this.gameState.wave >= 10) {
            this.achievements.wave10 = true;
            this.showAchievement('Wave Master!', 'Survived 10 waves!');
        }
    }
    
    showAchievement(title, text) {
        document.getElementById('achievement-text').textContent = text;
        document.getElementById('achievement-popup').classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('achievement-popup').classList.add('hidden');
        }, 3000);
    }
    
    updateUI() {
        document.getElementById('score-count').textContent = this.gameState.score;
        document.getElementById('level-count').textContent = this.gameState.level;
        document.getElementById('energy-count').textContent = this.gameState.energy;
        document.getElementById('health-text').textContent = this.gameState.health;
        document.getElementById('health-fill').style.width = this.gameState.health + '%';
        document.getElementById('wave-number').textContent = this.gameState.wave;
        document.getElementById('combo-text').textContent = `Combo: ${this.gameState.combo}x`;
        
        // Update health bar color
        const healthFill = document.getElementById('health-fill');
        if (this.gameState.health > 60) {
            healthFill.style.background = '#4CAF50';
        } else if (this.gameState.health > 30) {
            healthFill.style.background = '#FF9800';
        } else {
            healthFill.style.background = '#F44336';
        }
    }
    
    checkWaveComplete() {
        if (this.enemies.length === 0) {
            this.gameState.wave++;
            this.gameState.level = Math.floor(this.gameState.wave / 3) + 1;
            this.gameState.combo = 0;
            
            // Increase difficulty
            this.player.shootCooldown = Math.max(100, this.player.shootCooldown - 10);
            
            setTimeout(() => {
                this.spawnWave();
            }, 2000);
        }
    }
    
    gameOver() {
        this.gameState.isRunning = false;
        
        document.getElementById('final-score').textContent = this.gameState.score;
        document.getElementById('final-wave').textContent = this.gameState.wave;
        document.getElementById('final-enemies').textContent = this.gameState.enemiesDestroyed;
        
        document.getElementById('game-over-screen').classList.remove('hidden');
    }
    
    gameLoop() {
        if (this.gameState.isRunning && !this.gameState.isPaused) {
            this.updatePlayer();
            this.updateProjectiles();
            this.updateEnemies();
            this.updateExplosions();
            this.updatePowerups();
            this.checkCollisions();
            this.checkWaveComplete();
            this.updateUI();
        }
        
        // Use setTimeout for better performance control
        setTimeout(() => this.gameLoop(), 16); // ~60 FPS
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CosmicExplorer();
});