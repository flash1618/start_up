// Startup Simulator Game Logic
class StartupSimulator {
    constructor() {
        this.currentUser = null;
        this.gameState = {
            businessType: null,
            cash: 1000,
            month: 1,
            customers: 0,
            price: 0,
            demand: 0,
            revenue: 0,
            cogs: 0,
            grossMargin: 0,
            netProfit: 0,
            cac: 0,
            ltv: 0,
            burnRate: 0,
            runway: Infinity,
            marketingSpent: 0,
            inventory: 0,
            employees: 0,
            rdLevel: 0,
            totalRevenue: 0,
            peakCustomers: 0,
            gameOver: false,
            victory: false,
            achievements: {
                firstSale: false,
                profitability: false,
                hundredCustomers: false
            }
        };

        this.businessTypes = {
            food: {
                name: "Food Brand",
                basePrice: 5,
                baseCOGS: 2,
                baseDemand: 80,
                demandVolatility: 0.3,
                priceSensitivity: 0.4,
                marketingEffectiveness: 0.6,
                inventoryCost: 200,
                employeeCost: 800,
                rdCost: 400,
                icon: "fas fa-utensils"
            },
            saas: {
                name: "SaaS Tool",
                basePrice: 29,
                baseCOGS: 5,
                baseDemand: 50,
                demandVolatility: 0.2,
                priceSensitivity: 0.3,
                marketingEffectiveness: 0.8,
                inventoryCost: 0,
                employeeCost: 1200,
                rdCost: 600,
                icon: "fas fa-laptop-code"
            },
            fashion: {
                name: "Fashion Store",
                basePrice: 45,
                baseCOGS: 18,
                baseDemand: 60,
                demandVolatility: 0.4,
                priceSensitivity: 0.5,
                marketingEffectiveness: 0.7,
                inventoryCost: 500,
                employeeCost: 1000,
                rdCost: 500,
                icon: "fas fa-tshirt"
            }
        };

        this.randomEvents = [
            {
                name: "Viral Social Media Post",
                probability: 0.1,
                effect: { demand: 1.5, duration: 2 },
                message: "Your product went viral! Demand increased by 50% for 2 months!",
                type: "positive"
            },
            {
                name: "Supplier Delay",
                probability: 0.15,
                effect: { cogs: 1.3, duration: 1 },
                message: "Supplier issues caused a 30% increase in costs this month.",
                type: "negative"
            },
            {
                name: "Competitor Launch",
                probability: 0.12,
                effect: { demand: 0.7, duration: 3 },
                message: "A competitor launched a similar product. Demand decreased by 30% for 3 months.",
                type: "negative"
            },
            {
                name: "Positive Review",
                probability: 0.08,
                effect: { demand: 1.2, duration: 1 },
                message: "A major publication featured your product! Demand increased by 20% this month.",
                type: "positive"
            },
            {
                name: "Economic Boom",
                probability: 0.05,
                effect: { demand: 1.3, duration: 2 },
                message: "Economic conditions improved! Overall demand increased by 30% for 2 months.",
                type: "positive"
            },
            {
                name: "Supply Chain Issues",
                probability: 0.1,
                effect: { cogs: 1.4, duration: 2 },
                message: "Global supply chain issues increased your costs by 40% for 2 months.",
                type: "negative"
            }
        ];

        this.activeEvents = [];
        this.eventsLog = [];
        this.audioContext = null;
        this.soundsEnabled = true;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAudio();
        this.checkForSavedUser();
        this.showScreen('setup-screen');
        this.addEvent("Welcome to Startup Simulator! Choose your business idea to begin.", "info");
    }

    setupEventListeners() {
        // Business selection
        document.querySelectorAll('.business-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectBusiness(e.currentTarget.dataset.business);
            });
        });

        // Game actions
        document.getElementById('set-price-btn').addEventListener('click', () => {
            this.setPrice();
        });

        document.getElementById('price-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.setPrice();
            }
        });

        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const amount = parseInt(e.currentTarget.dataset.amount);
                this.performAction(action, amount);
            });
        });

        // Game controls
        document.getElementById('next-month-btn').addEventListener('click', () => {
            this.nextMonth();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.restart();
        });

        document.getElementById('victory-play-again-btn').addEventListener('click', () => {
            this.restart();
        });

        // User authentication
        document.getElementById('login-btn').addEventListener('click', () => {
            this.login();
        });

        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        document.getElementById('username-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.login();
            }
        });

        document.getElementById('guest-btn').addEventListener('click', () => {
            this.loginAsGuest();
        });

        // Save game
        document.getElementById('save-game-btn').addEventListener('click', () => {
            this.saveGame();
        });

        // Tooltips
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    selectBusiness(businessType) {
        // Remove previous selection
        document.querySelectorAll('.business-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        document.querySelector(`[data-business="${businessType}"]`).classList.add('selected');

        // Set business type and initialize game
        this.gameState.businessType = businessType;
        const business = this.businessTypes[businessType];
        
        this.gameState.price = business.basePrice;
        this.gameState.demand = business.baseDemand;
        
        // Update UI
        document.getElementById('business-name').textContent = business.name;
        document.getElementById('price-input').value = business.basePrice;

        // Start the game
        setTimeout(() => {
            this.startGame();
        }, 500);
    }

    startGame() {
        this.showScreen('game-screen');
        this.updateProductDisplay();
        this.updateUI();
        this.addEvent(`Started ${this.businessTypes[this.gameState.businessType].name}! Set your price and make your first business decisions.`, "info");
    }

    setPrice() {
        const newPrice = parseFloat(document.getElementById('price-input').value);
        if (newPrice > 0) {
            this.gameState.price = newPrice;
            this.updateUI();
            this.addEvent(`Price updated to $${newPrice.toFixed(2)} per unit.`, "info");
        }
    }

    performAction(action, amount) {
        if (this.gameState.cash < amount) {
            this.addEvent("Not enough cash for this action!", "negative");
            this.playErrorSound();
            return;
        }

        this.gameState.cash -= amount;
        this.playClickSound();

        switch (action) {
            case 'marketing':
                this.gameState.marketingSpent += amount;
                this.addEvent(`Spent $${amount} on marketing. This will boost demand next month.`, "info");
                break;
            case 'inventory':
                this.gameState.inventory += amount;
                this.addEvent(`Bought $${amount} worth of inventory. This reduces your COGS.`, "info");
                break;
            case 'hire':
                this.gameState.employees++;
                this.addEvent(`Hired an employee for $${amount}. This improves efficiency.`, "info");
                break;
            case 'rd':
                this.gameState.rdLevel++;
                this.addEvent(`Invested $${amount} in R&D. This improves your product quality.`, "info");
                break;
        }

        this.updateUI();
    }

    nextMonth() {
        if (this.gameState.gameOver || this.gameState.victory) return;

        this.gameState.month++;
        this.processMonth();
        this.updateUI();
        this.checkWinConditions();
    }

    processMonth() {
        const business = this.businessTypes[this.gameState.businessType];
        
        // Calculate demand based on price, marketing, and events
        let demandMultiplier = 1;
        
        // Price sensitivity
        const priceRatio = this.gameState.price / business.basePrice;
        const priceEffect = Math.max(0.3, 1 - (priceRatio - 1) * business.priceSensitivity);
        demandMultiplier *= priceEffect;

        // Marketing effect
        const marketingEffect = 1 + (this.gameState.marketingSpent / 1000) * business.marketingEffectiveness;
        demandMultiplier *= marketingEffect;

        // Employee effect
        const employeeEffect = 1 + (this.gameState.employees * 0.1);
        demandMultiplier *= employeeEffect;

        // R&D effect
        const rdEffect = 1 + (this.gameState.rdLevel * 0.15);
        demandMultiplier *= rdEffect;

        // Apply active events
        this.activeEvents.forEach(event => {
            if (event.effect.demand) {
                demandMultiplier *= event.effect.demand;
            }
        });

        // Calculate customers
        const baseCustomers = Math.floor(business.baseDemand * demandMultiplier);
        this.gameState.customers = Math.max(0, baseCustomers + Math.floor(Math.random() * 20 - 10));
        
        if (this.gameState.customers > this.gameState.peakCustomers) {
            this.gameState.peakCustomers = this.gameState.customers;
        }

        // Show sales animation if we have customers
        if (this.gameState.customers > 0) {
            this.showSalesAnimation(this.gameState.revenue);
            this.playSaleSound();
        }

        // Calculate revenue and costs
        this.gameState.revenue = this.gameState.customers * this.gameState.price;
        this.gameState.totalRevenue += this.gameState.revenue;

        // Calculate COGS
        let cogsPerUnit = business.baseCOGS;
        
        // Inventory reduces COGS
        if (this.gameState.inventory > 0) {
            cogsPerUnit *= 0.8; // 20% reduction
            this.gameState.inventory = Math.max(0, this.gameState.inventory - 100);
        }

        // Apply active events to COGS
        this.activeEvents.forEach(event => {
            if (event.effect.cogs) {
                cogsPerUnit *= event.effect.cogs;
            }
        });

        this.gameState.cogs = this.gameState.customers * cogsPerUnit;
        this.gameState.grossMargin = this.gameState.revenue - this.gameState.cogs;

        // Calculate expenses
        const employeeCosts = this.gameState.employees * 200; // Monthly salary
        const fixedCosts = 100; // Rent, utilities, etc.
        const totalExpenses = employeeCosts + fixedCosts;

        this.gameState.netProfit = this.gameState.grossMargin - totalExpenses;
        this.gameState.cash += this.gameState.netProfit;

        // Calculate metrics
        this.gameState.cac = this.gameState.marketingSpent / Math.max(1, this.gameState.customers);
        this.gameState.ltv = this.gameState.price * 12; // Assume 12 month average customer lifetime
        this.gameState.burnRate = totalExpenses - this.gameState.grossMargin;
        this.gameState.runway = this.gameState.burnRate > 0 ? 
            Math.floor(this.gameState.cash / this.gameState.burnRate) : Infinity;

        // Reset marketing spend
        this.gameState.marketingSpent = 0;

        // Process events
        this.processEvents();

        // Check achievements
        this.updateAchievements();

        // Add month summary
        this.addEvent(`Month ${this.gameState.month}: ${this.gameState.customers} customers, $${this.gameState.revenue.toFixed(0)} revenue, $${this.gameState.netProfit.toFixed(0)} profit`, 
            this.gameState.netProfit >= 0 ? "positive" : "negative");
    }

    processEvents() {
        // Remove expired events
        this.activeEvents = this.activeEvents.filter(event => {
            event.duration--;
            return event.duration > 0;
        });

        // Check for new random events
        this.randomEvents.forEach(event => {
            if (Math.random() < event.probability) {
                this.activeEvents.push({
                    ...event.effect,
                    duration: event.effect.duration,
                    name: event.name,
                    message: event.message,
                    type: event.type
                });
                this.addEvent(event.message, event.type);
            }
        });
    }

    checkWinConditions() {
        // Check for bankruptcy
        if (this.gameState.cash <= 0) {
            this.gameState.gameOver = true;
            this.showGameOver();
            return;
        }

        // Check for victory (profitability for 3 consecutive months)
        if (this.gameState.netProfit > 0) {
            if (!this.gameState.consecutiveProfitableMonths) {
                this.gameState.consecutiveProfitableMonths = 1;
            } else {
                this.gameState.consecutiveProfitableMonths++;
            }
        } else {
            this.gameState.consecutiveProfitableMonths = 0;
        }

        if (this.gameState.consecutiveProfitableMonths >= 3) {
            this.gameState.victory = true;
            this.showVictory();
        }
    }

    showGameOver() {
        document.getElementById('final-months').textContent = this.gameState.month - 1;
        document.getElementById('final-revenue').textContent = `$${this.gameState.totalRevenue.toFixed(0)}`;
        document.getElementById('final-customers').textContent = this.gameState.peakCustomers;
        this.showScreen('game-over-screen');
    }

    showVictory() {
        const valuation = this.gameState.totalRevenue * 5; // Simple valuation formula
        document.getElementById('victory-months').textContent = this.gameState.month - 1;
        document.getElementById('final-valuation').textContent = `$${valuation.toFixed(0)}`;
        document.getElementById('victory-customers').textContent = this.gameState.customers;
        this.showScreen('victory-screen');
    }

    restart() {
        // Reset game state
        this.gameState = {
            businessType: null,
            cash: 1000,
            month: 1,
            customers: 0,
            price: 0,
            demand: 0,
            revenue: 0,
            cogs: 0,
            grossMargin: 0,
            netProfit: 0,
            cac: 0,
            ltv: 0,
            burnRate: 0,
            runway: Infinity,
            marketingSpent: 0,
            inventory: 0,
            employees: 0,
            rdLevel: 0,
            totalRevenue: 0,
            peakCustomers: 0,
            gameOver: false,
            victory: false,
            consecutiveProfitableMonths: 0
        };

        this.activeEvents = [];
        this.eventsLog = [];

        // Reset UI
        document.querySelectorAll('.business-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.getElementById('events-log').innerHTML = '';

        this.showScreen('setup-screen');
        this.addEvent("Welcome to Startup Simulator! Choose your business idea to begin.", "info");
    }

    updateUI() {
        // Update metrics
        document.getElementById('cash').textContent = `$${this.gameState.cash.toFixed(0)}`;
        document.getElementById('revenue').textContent = `$${this.gameState.revenue.toFixed(0)}`;
        document.getElementById('cogs').textContent = `$${this.gameState.cogs.toFixed(0)}`;
        document.getElementById('gross-margin').textContent = `$${this.gameState.grossMargin.toFixed(0)}`;
        document.getElementById('net-profit').textContent = `$${this.gameState.netProfit.toFixed(0)}`;
        document.getElementById('cac').textContent = `$${this.gameState.cac.toFixed(0)}`;
        document.getElementById('ltv').textContent = `$${this.gameState.ltv.toFixed(0)}`;
        document.getElementById('burn-rate').textContent = `$${this.gameState.burnRate.toFixed(0)}`;
        document.getElementById('runway').textContent = this.gameState.runway === Infinity ? '∞' : `${this.gameState.runway}`;
        document.getElementById('customers').textContent = this.gameState.customers;
        document.getElementById('price').textContent = `$${this.gameState.price.toFixed(2)}`;
        document.getElementById('demand').textContent = `${this.gameState.demand.toFixed(0)}%`;
        document.getElementById('current-month').textContent = this.gameState.month;

        // Update price input
        document.getElementById('price-input').value = this.gameState.price;

        // Color code profit/loss
        const netProfitElement = document.getElementById('net-profit');
        netProfitElement.className = 'metric-value';
        if (this.gameState.netProfit > 0) {
            netProfitElement.classList.add('positive');
        } else if (this.gameState.netProfit < 0) {
            netProfitElement.classList.add('negative');
        }

        // Disable buttons if not enough cash
        document.querySelectorAll('.action-btn').forEach(btn => {
            const amount = parseInt(btn.dataset.amount);
            btn.disabled = this.gameState.cash < amount;
        });

        // Disable next month if game over
        document.getElementById('next-month-btn').disabled = this.gameState.gameOver || this.gameState.victory;
    }

    addEvent(message, type = 'info') {
        const eventElement = document.createElement('div');
        eventElement.className = `event-item ${type}`;
        
        let icon = 'fas fa-info-circle';
        if (type === 'positive') icon = 'fas fa-check-circle';
        if (type === 'negative') icon = 'fas fa-exclamation-triangle';
        
        eventElement.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
        
        const eventsLog = document.getElementById('events-log');
        eventsLog.insertBefore(eventElement, eventsLog.firstChild);
        
        // Keep only last 10 events
        while (eventsLog.children.length > 10) {
            eventsLog.removeChild(eventsLog.lastChild);
        }
        
        this.eventsLog.unshift({ message, type, month: this.gameState.month });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    showTooltip(element, text) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = text;
        tooltip.classList.add('show');
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }

    hideTooltip() {
        document.getElementById('tooltip').classList.remove('show');
    }

    // User Authentication Methods
    login() {
        const username = document.getElementById('username-input').value.trim();
        if (!username) {
            alert('Please enter a username');
            return;
        }

        this.currentUser = username;
        this.isGuest = false;
        localStorage.setItem('startupSimulator_user', username);
        localStorage.setItem('startupSimulator_isGuest', 'false');
        this.updateUserInterface();
        this.loadUserData();
        this.addEvent(`Welcome back, ${username}!`, "positive");
    }

    loginAsGuest() {
        this.currentUser = 'Guest_' + Math.random().toString(36).substr(2, 9);
        this.isGuest = true;
        localStorage.setItem('startupSimulator_user', this.currentUser);
        localStorage.setItem('startupSimulator_isGuest', 'true');
        this.updateUserInterface();
        this.addEvent(`Welcome, Guest! Your progress will be saved locally but won't sync across devices.`, "info");
    }

    logout() {
        this.saveGame(); // Save before logout
        this.currentUser = null;
        localStorage.removeItem('startupSimulator_user');
        this.updateUserInterface();
        this.restart();
    }

    checkForSavedUser() {
        const savedUser = localStorage.getItem('startupSimulator_user');
        const isGuest = localStorage.getItem('startupSimulator_isGuest') === 'true';
        
        if (savedUser) {
            this.currentUser = savedUser;
            this.isGuest = isGuest;
            this.updateUserInterface();
            this.loadUserData();
        }
    }

    updateUserInterface() {
        const userInfo = document.getElementById('user-info');
        const loginSection = document.getElementById('login-section');
        const usernameDisplay = document.getElementById('username-display');

        if (this.currentUser) {
            userInfo.classList.remove('hidden');
            loginSection.classList.add('hidden');
            const displayName = this.isGuest ? 'Guest Player' : this.currentUser;
            usernameDisplay.textContent = displayName;
        } else {
            userInfo.classList.add('hidden');
            loginSection.classList.remove('hidden');
        }
    }

    // Save/Load Methods
    saveGame() {
        if (!this.currentUser) {
            alert('Please login to save your game');
            return;
        }

        const saveData = {
            gameState: this.gameState,
            activeEvents: this.activeEvents,
            eventsLog: this.eventsLog,
            timestamp: Date.now(),
            isGuest: this.isGuest
        };

        localStorage.setItem(`startupSimulator_game_${this.currentUser}`, JSON.stringify(saveData));
        
        if (this.isGuest) {
            this.addEvent('Game saved locally! (Guest mode)', "info");
        } else {
            this.addEvent('Game saved successfully!', "positive");
        }
    }

    loadUserData() {
        if (!this.currentUser) return;

        const savedData = localStorage.getItem(`startupSimulator_game_${this.currentUser}`);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.gameState = { ...this.gameState, ...data.gameState };
                this.activeEvents = data.activeEvents || [];
                this.eventsLog = data.eventsLog || [];
                
                // Restore events log in UI
                const eventsLog = document.getElementById('events-log');
                eventsLog.innerHTML = '';
                this.eventsLog.slice(0, 10).forEach(event => {
                    this.addEventToUI(event.message, event.type);
                });

                this.updateUI();
                this.updateProductDisplay();
                this.updateAchievements();
                this.addEvent('Game loaded successfully!', "positive");
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }

    // Product Visualization Methods
    updateProductDisplay() {
        const productDisplay = document.getElementById('product-display');
        
        if (!this.gameState.businessType) {
            productDisplay.innerHTML = `
                <div class="product-placeholder">
                    <i class="fas fa-question-circle"></i>
                    <p>Choose a business to see your product</p>
                </div>
            `;
            return;
        }

        const business = this.businessTypes[this.gameState.businessType];
        const productNames = {
            food: "Healthy Snack Pack",
            saas: "Productivity Pro",
            fashion: "Trendy T-Shirt"
        };

        productDisplay.innerHTML = `
            <div class="product-item">
                <i class="${business.icon}"></i>
                <div class="product-name">${productNames[this.gameState.businessType]}</div>
                <div class="product-price">$${this.gameState.price.toFixed(2)}</div>
            </div>
        `;
    }

    showSalesAnimation(amount) {
        const salesAnimation = document.getElementById('sales-animation');
        const saleAmount = document.getElementById('sale-amount');
        
        saleAmount.textContent = amount.toFixed(0);
        salesAnimation.classList.remove('hidden');
        
        setTimeout(() => {
            salesAnimation.classList.add('hidden');
        }, 1500);
    }

    // Achievement Methods
    updateAchievements() {
        const achievements = [
            { id: 'firstSale', condition: this.gameState.customers > 0, name: 'First Sale' },
            { id: 'profitability', condition: this.gameState.netProfit > 0, name: 'Profitability' },
            { id: 'hundredCustomers', condition: this.gameState.customers >= 100, name: '100 Customers' }
        ];

        achievements.forEach(achievement => {
            const element = document.querySelector(`[data-achievement="${achievement.id}"]`);
            if (element) {
                if (achievement.condition && !this.gameState.achievements[achievement.id]) {
                    this.unlockAchievement(achievement.id, achievement.name);
                }
            }
        });
    }

    unlockAchievement(id, name) {
        this.gameState.achievements[id] = true;
        
        // Find and update the achievement element
        const achievements = document.querySelectorAll('.achievement-item');
        achievements.forEach(achievement => {
            if (achievement.textContent.includes(name)) {
                achievement.classList.remove('locked');
                achievement.classList.add('unlocked');
                achievement.querySelector('i').className = 'fas fa-trophy';
            }
        });

        this.playSuccessSound();
        this.addEvent(`🏆 Achievement Unlocked: ${name}!`, "positive");
    }

    addEventToUI(message, type = 'info') {
        const eventElement = document.createElement('div');
        eventElement.className = `event-item ${type}`;
        
        let icon = 'fas fa-info-circle';
        if (type === 'positive') icon = 'fas fa-check-circle';
        if (type === 'negative') icon = 'fas fa-exclamation-triangle';
        
        eventElement.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
        
        const eventsLog = document.getElementById('events-log');
        eventsLog.insertBefore(eventElement, eventsLog.firstChild);
        
        // Keep only last 10 events
        while (eventsLog.children.length > 10) {
            eventsLog.removeChild(eventsLog.lastChild);
        }
    }

    // Audio Methods
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Web Audio API not supported');
            this.soundsEnabled = false;
        }
    }

    playSound(frequency, duration, type = 'sine') {
        if (!this.soundsEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playSuccessSound() {
        this.playSound(523, 0.2); // C5
        setTimeout(() => this.playSound(659, 0.2), 100); // E5
        setTimeout(() => this.playSound(784, 0.3), 200); // G5
    }

    playErrorSound() {
        this.playSound(200, 0.5, 'sawtooth');
    }

    playClickSound() {
        this.playSound(800, 0.1);
    }

    playSaleSound() {
        this.playSound(1000, 0.15);
        setTimeout(() => this.playSound(1200, 0.15), 50);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new StartupSimulator();
});
