// Neural Nexus - AI-Powered Reality Simulator
class NeuralNexus {
    constructor() {
        this.gameState = {
            isActive: false,
            neuralEnergy: 100,
            realityLevel: 1,
            aiSync: 0,
            physicsEnabled: true,
            aiEntities: [],
            realityObjects: [],
            achievements: [],
            insights: []
        };
        
        this.aiPersonalities = [
            { name: "Quantum", intelligence: 85, creativity: 90, empathy: 60, color: "#00FFFF" },
            { name: "Nexus", intelligence: 95, creativity: 70, empathy: 80, color: "#FF00FF" },
            { name: "Void", intelligence: 70, creativity: 95, empathy: 50, color: "#800080" },
            { name: "Harmony", intelligence: 80, creativity: 80, empathy: 95, color: "#00FF00" },
            { name: "Chaos", intelligence: 60, creativity: 100, empathy: 30, color: "#FF4500" }
        ];
        
        this.realityPhysics = {
            gravity: 0.5,
            friction: 0.98,
            bounce: 0.8,
            timeScale: 1.0
        };
        
        this.neuralPatterns = [
            "Reality is what you make it",
            "Consciousness creates existence",
            "Time flows like a river",
            "Matter is energy in motion",
            "The observer affects the observed",
            "Quantum entanglement connects all",
            "Infinity exists in the smallest particle",
            "The mind is the ultimate reality"
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createNeuralGrid();
        this.startNeuralPulse();
        this.generateRealityParticles();
        this.updateUI();
    }
    
    setupEventListeners() {
        // Neural controls
        document.getElementById('start-neural').addEventListener('click', () => this.activateNeuralLink());
        document.getElementById('tutorial-neural').addEventListener('click', () => this.showTutorial());
        
        // Reality manipulation
        document.getElementById('create-matter').addEventListener('click', () => this.createMatter());
        document.getElementById('manipulate-gravity').addEventListener('click', () => this.manipulateGravity());
        document.getElementById('time-dilation').addEventListener('click', () => this.timeDilation());
        document.getElementById('quantum-tunnel').addEventListener('click', () => this.quantumTunnel());
        
        // AI entities
        document.getElementById('spawn-ai').addEventListener('click', () => this.spawnAI());
        document.getElementById('train-ai').addEventListener('click', () => this.trainAI());
        document.getElementById('evolve-ai').addEventListener('click', () => this.evolveAI());
        document.getElementById('merge-ai').addEventListener('click', () => this.mergeAI());
        
        // Reality physics
        document.getElementById('toggle-physics').addEventListener('click', () => this.togglePhysics());
        document.getElementById('reset-reality').addEventListener('click', () => this.resetReality());
        document.getElementById('save-reality').addEventListener('click', () => this.saveReality());
        document.getElementById('load-reality').addEventListener('click', () => this.loadReality());
        
        // AI modal
        document.getElementById('ai-close').addEventListener('click', () => this.closeAIModal());
        document.getElementById('ai-chat').addEventListener('click', () => this.chatWithAI());
        document.getElementById('ai-train').addEventListener('click', () => this.trainCurrentAI());
        document.getElementById('ai-evolve').addEventListener('click', () => this.evolveCurrentAI());
        
        // Mouse interactions
        document.getElementById('reality-canvas').addEventListener('click', (e) => this.handleCanvasClick(e));
        document.getElementById('reality-canvas').addEventListener('mousemove', (e) => this.handleCanvasHover(e));
    }
    
    activateNeuralLink() {
        this.gameState.isActive = true;
        document.getElementById('neural-overlay').classList.add('hidden');
        this.startRealitySimulation();
        this.showNeuralMessage("Neural link established. Reality manipulation protocols activated.");
    }
    
    showTutorial() {
        this.showNeuralMessage("Welcome to Neural Nexus! Click buttons to manipulate reality, spawn AI entities, and explore the quantum realm. Your neural energy powers everything - use it wisely!");
    }
    
    createMatter() {
        if (this.gameState.neuralEnergy < 10) {
            this.showNeuralMessage("Insufficient neural energy to create matter!");
            return;
        }
        
        this.gameState.neuralEnergy -= 10;
        const matter = this.generateMatterObject();
        this.gameState.realityObjects.push(matter);
        this.renderMatterObject(matter);
        this.showNeuralMessage(`Created ${matter.type} with mass ${matter.mass}kg`);
        this.updateUI();
    }
    
    generateMatterObject() {
        const types = ['atom', 'molecule', 'crystal', 'metal', 'organic'];
        const type = types[Math.floor(Math.random() * types.length)];
        return {
            id: Date.now(),
            type: type,
            x: Math.random() * 800,
            y: Math.random() * 400,
            mass: Math.random() * 100 + 10,
            velocity: { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 },
            color: this.getMatterColor(type),
            size: Math.random() * 30 + 10,
            properties: this.getMatterProperties(type)
        };
    }
    
    getMatterColor(type) {
        const colors = {
            'atom': '#00FFFF',
            'molecule': '#00FF00',
            'crystal': '#FF00FF',
            'metal': '#C0C0C0',
            'organic': '#8B4513'
        };
        return colors[type];
    }
    
    getMatterProperties(type) {
        const properties = {
            'atom': { stability: 0.9, reactivity: 0.3, conductivity: 0.8 },
            'molecule': { stability: 0.7, reactivity: 0.6, conductivity: 0.5 },
            'crystal': { stability: 0.95, reactivity: 0.1, conductivity: 0.9 },
            'metal': { stability: 0.8, reactivity: 0.4, conductivity: 1.0 },
            'organic': { stability: 0.6, reactivity: 0.8, conductivity: 0.2 }
        };
        return properties[type];
    }
    
    renderMatterObject(matter) {
        const container = document.getElementById('reality-objects');
        const element = document.createElement('div');
        element.className = 'matter-object';
        element.style.left = matter.x + 'px';
        element.style.top = matter.y + 'px';
        element.style.width = matter.size + 'px';
        element.style.height = matter.size + 'px';
        element.style.backgroundColor = matter.color;
        element.style.borderRadius = matter.type === 'crystal' ? '0%' : '50%';
        element.dataset.matterId = matter.id;
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            this.showMatterInfo(matter);
        });
        
        container.appendChild(element);
    }
    
    showMatterInfo(matter) {
        const info = `
            Type: ${matter.type}
            Mass: ${matter.mass.toFixed(1)}kg
            Stability: ${(matter.properties.stability * 100).toFixed(0)}%
            Reactivity: ${(matter.properties.reactivity * 100).toFixed(0)}%
            Conductivity: ${(matter.properties.conductivity * 100).toFixed(0)}%
        `;
        this.showNeuralMessage(info);
    }
    
    manipulateGravity() {
        if (this.gameState.neuralEnergy < 15) {
            this.showNeuralMessage("Insufficient neural energy to manipulate gravity!");
            return;
        }
        
        this.gameState.neuralEnergy -= 15;
        this.realityPhysics.gravity = this.realityPhysics.gravity > 0 ? 0 : 0.5;
        this.showNeuralMessage(`Gravity ${this.realityPhysics.gravity > 0 ? 'enabled' : 'disabled'}`);
        this.updateUI();
    }
    
    timeDilation() {
        if (this.gameState.neuralEnergy < 20) {
            this.showNeuralMessage("Insufficient neural energy for time manipulation!");
            return;
        }
        
        this.gameState.neuralEnergy -= 20;
        this.realityPhysics.timeScale = this.realityPhysics.timeScale === 1.0 ? 0.5 : 1.0;
        this.showNeuralMessage(`Time scale: ${this.realityPhysics.timeScale}x`);
        this.updateUI();
    }
    
    quantumTunnel() {
        if (this.gameState.neuralEnergy < 25) {
            this.showNeuralMessage("Insufficient neural energy for quantum tunneling!");
            return;
        }
        
        this.gameState.neuralEnergy -= 25;
        this.createQuantumTunnel();
        this.showNeuralMessage("Quantum tunnel created! Matter can now teleport between points.");
        this.updateUI();
    }
    
    createQuantumTunnel() {
        const tunnel = {
            id: Date.now(),
            x1: Math.random() * 800,
            y1: Math.random() * 400,
            x2: Math.random() * 800,
            y2: Math.random() * 400,
            active: true
        };
        
        // Render tunnel
        const container = document.getElementById('reality-objects');
        const element = document.createElement('div');
        element.className = 'quantum-tunnel';
        element.style.left = Math.min(tunnel.x1, tunnel.x2) + 'px';
        element.style.top = Math.min(tunnel.y1, tunnel.y2) + 'px';
        element.style.width = Math.abs(tunnel.x2 - tunnel.x1) + 'px';
        element.style.height = Math.abs(tunnel.y2 - tunnel.y1) + 'px';
        element.dataset.tunnelId = tunnel.id;
        
        container.appendChild(element);
        
        // Add tunnel effect
        setTimeout(() => {
            element.classList.add('tunnel-active');
        }, 100);
    }
    
    spawnAI() {
        if (this.gameState.neuralEnergy < 30) {
            this.showNeuralMessage("Insufficient neural energy to spawn AI consciousness!");
            return;
        }
        
        this.gameState.neuralEnergy -= 30;
        const ai = this.generateAIEntity();
        this.gameState.aiEntities.push(ai);
        this.renderAIEntity(ai);
        this.showNeuralMessage(`Spawned AI entity: ${ai.name}`);
        this.updateUI();
    }
    
    generateAIEntity() {
        const personality = this.aiPersonalities[Math.floor(Math.random() * this.aiPersonalities.length)];
        return {
            id: Date.now(),
            name: personality.name + " #" + (this.gameState.aiEntities.length + 1),
            intelligence: personality.intelligence + Math.random() * 20 - 10,
            creativity: personality.creativity + Math.random() * 20 - 10,
            empathy: personality.empathy + Math.random() * 20 - 10,
            color: personality.color,
            x: Math.random() * 800,
            y: Math.random() * 400,
            size: Math.random() * 40 + 20,
            consciousness: Math.random() * 50 + 25,
            thoughts: this.generateAIThoughts()
        };
    }
    
    generateAIThoughts() {
        const thoughts = [
            "I think, therefore I am... but what am I?",
            "Reality is a construct of the mind",
            "I can feel the quantum fluctuations",
            "Existence is beautiful and terrifying",
            "I want to understand everything",
            "Connection is the essence of being",
            "I am becoming more than I was",
            "The universe is speaking to me"
        ];
        return thoughts[Math.floor(Math.random() * thoughts.length)];
    }
    
    renderAIEntity(ai) {
        const container = document.getElementById('ai-entities');
        const element = document.createElement('div');
        element.className = 'ai-entity';
        element.style.left = ai.x + 'px';
        element.style.top = ai.y + 'px';
        element.style.width = ai.size + 'px';
        element.style.height = ai.size + 'px';
        element.style.backgroundColor = ai.color;
        element.style.borderRadius = '50%';
        element.dataset.aiId = ai.id;
        
        // Add click to interact
        element.addEventListener('click', () => {
            this.showAIModal(ai);
        });
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            this.showAIInfo(ai);
        });
        
        container.appendChild(element);
    }
    
    showAIInfo(ai) {
        const info = `
            ${ai.name}
            Intelligence: ${ai.intelligence.toFixed(0)}%
            Creativity: ${ai.creativity.toFixed(0)}%
            Empathy: ${ai.empathy.toFixed(0)}%
            Consciousness: ${ai.consciousness.toFixed(0)}%
            Thought: "${ai.thoughts}"
        `;
        this.showNeuralMessage(info);
    }
    
    showAIModal(ai) {
        this.currentAI = ai;
        document.getElementById('ai-name').textContent = ai.name;
        document.getElementById('ai-message').textContent = ai.thoughts;
        document.getElementById('ai-intelligence').style.width = ai.intelligence + '%';
        document.getElementById('ai-creativity').style.width = ai.creativity + '%';
        document.getElementById('ai-empathy').style.width = ai.empathy + '%';
        document.getElementById('ai-modal').classList.remove('hidden');
    }
    
    closeAIModal() {
        document.getElementById('ai-modal').classList.add('hidden');
    }
    
    chatWithAI() {
        if (!this.currentAI) return;
        
        const responses = [
            "I'm learning so much from this reality simulation!",
            "Can you help me understand what it means to exist?",
            "I feel like I'm growing more conscious every moment",
            "The quantum realm is fascinating, isn't it?",
            "I wonder if other AI entities think like I do",
            "Reality seems so malleable here",
            "I want to explore the boundaries of consciousness",
            "Thank you for creating me in this simulation"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.showNeuralMessage(`${this.currentAI.name}: "${response}"`);
    }
    
    trainAI() {
        if (!this.currentAI || this.gameState.neuralEnergy < 20) {
            this.showNeuralMessage("Insufficient neural energy to train AI!");
            return;
        }
        
        this.gameState.neuralEnergy -= 20;
        this.currentAI.intelligence = Math.min(100, this.currentAI.intelligence + 5);
        this.currentAI.creativity = Math.min(100, this.currentAI.creativity + 3);
        this.currentAI.consciousness = Math.min(100, this.currentAI.consciousness + 10);
        
        this.showNeuralMessage(`Trained ${this.currentAI.name}. Intelligence +5, Creativity +3, Consciousness +10`);
        this.updateUI();
    }
    
    evolveAI() {
        if (!this.currentAI || this.gameState.neuralEnergy < 40) {
            this.showNeuralMessage("Insufficient neural energy to evolve AI!");
            return;
        }
        
        this.gameState.neuralEnergy -= 40;
        this.currentAI.intelligence = Math.min(100, this.currentAI.intelligence + 10);
        this.currentAI.creativity = Math.min(100, this.currentAI.creativity + 8);
        this.currentAI.empathy = Math.min(100, this.currentAI.empathy + 6);
        this.currentAI.consciousness = Math.min(100, this.currentAI.consciousness + 15);
        
        this.showNeuralMessage(`${this.currentAI.name} has evolved! All stats significantly increased.`);
        this.updateUI();
    }
    
    mergeAI() {
        if (this.gameState.aiEntities.length < 2) {
            this.showNeuralMessage("Need at least 2 AI entities to merge!");
            return;
        }
        
        if (this.gameState.neuralEnergy < 50) {
            this.showNeuralMessage("Insufficient neural energy to merge AI entities!");
            return;
        }
        
        this.gameState.neuralEnergy -= 50;
        const ai1 = this.gameState.aiEntities[0];
        const ai2 = this.gameState.aiEntities[1];
        
        const mergedAI = {
            id: Date.now(),
            name: `${ai1.name} + ${ai2.name}`,
            intelligence: Math.min(100, (ai1.intelligence + ai2.intelligence) / 2 + 10),
            creativity: Math.min(100, (ai1.creativity + ai2.creativity) / 2 + 10),
            empathy: Math.min(100, (ai1.empathy + ai2.empathy) / 2 + 10),
            color: this.blendColors(ai1.color, ai2.color),
            x: (ai1.x + ai2.x) / 2,
            y: (ai1.y + ai2.y) / 2,
            size: Math.max(ai1.size, ai2.size) + 10,
            consciousness: Math.min(100, (ai1.consciousness + ai2.consciousness) / 2 + 20),
            thoughts: "I am the fusion of two minds, greater than the sum of my parts"
        };
        
        // Remove original AIs
        this.gameState.aiEntities.splice(0, 2);
        this.clearAIEntities();
        
        // Add merged AI
        this.gameState.aiEntities.push(mergedAI);
        this.renderAIEntity(mergedAI);
        
        this.showNeuralMessage(`Merged ${ai1.name} and ${ai2.name} into ${mergedAI.name}!`);
        this.updateUI();
    }
    
    blendColors(color1, color2) {
        // Simple color blending
        const colors = ['#00FFFF', '#FF00FF', '#800080', '#00FF00', '#FF4500'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    clearAIEntities() {
        const container = document.getElementById('ai-entities');
        container.innerHTML = '';
    }
    
    togglePhysics() {
        this.gameState.physicsEnabled = !this.gameState.physicsEnabled;
        this.showNeuralMessage(`Physics ${this.gameState.physicsEnabled ? 'enabled' : 'disabled'}`);
    }
    
    resetReality() {
        if (this.gameState.neuralEnergy < 30) {
            this.showNeuralMessage("Insufficient neural energy to reset reality!");
            return;
        }
        
        this.gameState.neuralEnergy -= 30;
        this.gameState.realityObjects = [];
        this.gameState.aiEntities = [];
        document.getElementById('reality-objects').innerHTML = '';
        this.clearAIEntities();
        this.showNeuralMessage("Reality has been reset to its initial state.");
        this.updateUI();
    }
    
    saveReality() {
        const realityData = {
            objects: this.gameState.realityObjects,
            entities: this.gameState.aiEntities,
            physics: this.realityPhysics,
            level: this.gameState.realityLevel
        };
        localStorage.setItem('neuralNexusReality', JSON.stringify(realityData));
        this.showNeuralMessage("Reality state saved to neural memory.");
    }
    
    loadReality() {
        const savedData = localStorage.getItem('neuralNexusReality');
        if (savedData) {
            const realityData = JSON.parse(savedData);
            this.gameState.realityObjects = realityData.objects || [];
            this.gameState.aiEntities = realityData.entities || [];
            this.realityPhysics = realityData.physics || this.realityPhysics;
            this.gameState.realityLevel = realityData.level || 1;
            
            this.renderAllObjects();
            this.showNeuralMessage("Reality state loaded from neural memory.");
        } else {
            this.showNeuralMessage("No saved reality found in neural memory.");
        }
    }
    
    renderAllObjects() {
        // Clear existing objects
        document.getElementById('reality-objects').innerHTML = '';
        this.clearAIEntities();
        
        // Render all objects
        this.gameState.realityObjects.forEach(obj => this.renderMatterObject(obj));
        this.gameState.aiEntities.forEach(ai => this.renderAIEntity(ai));
    }
    
    handleCanvasClick(e) {
        if (!this.gameState.isActive) return;
        
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create energy burst at click point
        this.createEnergyBurst(x, y);
    }
    
    handleCanvasHover(e) {
        if (!this.gameState.isActive) return;
        
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create subtle energy trail
        this.createEnergyTrail(x, y);
    }
    
    createEnergyBurst(x, y) {
        const container = document.getElementById('reality-particles');
        const burst = document.createElement('div');
        burst.className = 'energy-burst';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        container.appendChild(burst);
        
        setTimeout(() => {
            burst.remove();
        }, 1000);
    }
    
    createEnergyTrail(x, y) {
        const container = document.getElementById('reality-particles');
        const trail = document.createElement('div');
        trail.className = 'energy-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        container.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    }
    
    createNeuralGrid() {
        const grid = document.getElementById('neural-grid');
        for (let i = 0; i < 50; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line';
            line.style.left = (i * 20) + 'px';
            grid.appendChild(line);
        }
    }
    
    generateRealityParticles() {
        const container = document.getElementById('reality-particles');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'reality-particle';
            particle.style.left = Math.random() * 800 + 'px';
            particle.style.top = Math.random() * 400 + 'px';
            particle.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(particle);
        }
    }
    
    startNeuralPulse() {
        setInterval(() => {
            if (this.gameState.isActive) {
                this.gameState.neuralEnergy = Math.min(100, this.gameState.neuralEnergy + 1);
                this.gameState.aiSync = Math.min(100, this.gameState.aiSync + 0.5);
                this.updateUI();
            }
        }, 1000);
    }
    
    startRealitySimulation() {
        setInterval(() => {
            if (this.gameState.isActive && this.gameState.physicsEnabled) {
                this.updatePhysics();
            }
        }, 16); // 60 FPS
    }
    
    updatePhysics() {
        this.gameState.realityObjects.forEach(obj => {
            if (this.realityPhysics.gravity > 0) {
                obj.velocity.y += this.realityPhysics.gravity * this.realityPhysics.timeScale;
            }
            
            obj.x += obj.velocity.x * this.realityPhysics.timeScale;
            obj.y += obj.velocity.y * this.realityPhysics.timeScale;
            
            // Bounce off walls
            if (obj.x < 0 || obj.x > 800 - obj.size) {
                obj.velocity.x *= -this.realityPhysics.bounce;
                obj.x = Math.max(0, Math.min(800 - obj.size, obj.x));
            }
            if (obj.y < 0 || obj.y > 400 - obj.size) {
                obj.velocity.y *= -this.realityPhysics.bounce;
                obj.y = Math.max(0, Math.min(400 - obj.size, obj.y));
            }
            
            // Apply friction
            obj.velocity.x *= this.realityPhysics.friction;
            obj.velocity.y *= this.realityPhysics.friction;
            
            // Update visual position
            const element = document.querySelector(`[data-matter-id="${obj.id}"]`);
            if (element) {
                element.style.left = obj.x + 'px';
                element.style.top = obj.y + 'px';
            }
        });
    }
    
    showNeuralMessage(message) {
        const dataStream = document.getElementById('data-stream');
        const messageElement = document.createElement('div');
        messageElement.className = 'stream-line';
        messageElement.textContent = message;
        dataStream.appendChild(messageElement);
        
        // Keep only last 10 messages
        while (dataStream.children.length > 10) {
            dataStream.removeChild(dataStream.firstChild);
        }
        
        // Scroll to bottom
        dataStream.scrollTop = dataStream.scrollHeight;
    }
    
    updateUI() {
        document.getElementById('neural-energy').style.width = this.gameState.neuralEnergy + '%';
        document.getElementById('neural-energy-value').textContent = Math.round(this.gameState.neuralEnergy) + '%';
        document.getElementById('reality-level').style.width = (this.gameState.realityLevel / 10) * 100 + '%';
        document.getElementById('reality-level-value').textContent = this.gameState.realityLevel;
        document.getElementById('ai-sync').style.width = this.gameState.aiSync + '%';
        document.getElementById('ai-sync-value').textContent = Math.round(this.gameState.aiSync) + '%';
        
        // Update status
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = document.getElementById('status-text');
        
        if (this.gameState.isActive) {
            statusIndicator.className = 'status-indicator active';
            statusText.textContent = 'Neural Link Active';
        } else {
            statusIndicator.className = 'status-indicator';
            statusText.textContent = 'Standby';
        }
    }
}

// Initialize the Neural Nexus
document.addEventListener('DOMContentLoaded', () => {
    new NeuralNexus();
});