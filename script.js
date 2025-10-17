// Business Academy - Real Business Simulation with Adaptive Learning
class BusinessAcademy {
    constructor() {
        this.currentDifficulty = null;
        this.gameState = {
            day: 1,
            cash: 100,
            level: 1,
            xp: 0,
            streak: 0,
            totalProfit: 0,
            totalSales: 0,
            price: 0,
            inventory: 0,
            costPerCup: 3,
            weather: 'sunny',
            marketConditions: 'normal',
            competition: 'low'
        };
        
        this.learningState = {
            concepts: {
                revenue: { mastery: 0, lastPracticed: 0, difficulty: 1 },
                costs: { mastery: 0, lastPracticed: 0, difficulty: 1 },
                profit: { mastery: 0, lastPracticed: 0, difficulty: 1 },
                pricing: { mastery: 0, lastPracticed: 0, difficulty: 1 },
                demand: { mastery: 0, lastPracticed: 0, difficulty: 1 }
            },
            spacedRepetition: {
                intervals: [1, 3, 7, 14, 30], // days
                currentInterval: 0
            }
        };
        
        this.scenarios = {
            beginner: {
                title: "Lemonade Stand",
                scenarios: [
                    {
                        title: "Day 1: Starting Your Business",
                        context: "You have ₹100 to start your lemonade stand. You need to decide on pricing and inventory.",
                        decisions: [
                            {
                                id: "set-price",
                                text: "Set Price per Cup",
                                icon: "💰",
                                action: "showPriceModal",
                                learning: "pricing"
                            },
                            {
                                id: "buy-inventory",
                                text: "Buy Inventory",
                                icon: "🛒",
                                action: "buyInventory",
                                learning: "costs"
                            }
                        ],
                        metrics: ["Revenue", "Costs", "Profit"],
                        learning: "Basic business concepts: Revenue = Price × Quantity, Profit = Revenue - Costs"
                    },
                    {
                        title: "Day 2: Understanding Customers",
                        context: "Yesterday you learned about pricing. Today, let's understand customer behavior.",
                        decisions: [
                            {
                                id: "analyze-demand",
                                text: "Analyze Customer Demand",
                                icon: "📊",
                                action: "analyzeDemand",
                                learning: "demand"
                            },
                            {
                                id: "adjust-price",
                                text: "Adjust Price Strategy",
                                icon: "⚖️",
                                action: "adjustPrice",
                                learning: "pricing"
                            }
                        ],
                        metrics: ["Customer Count", "Conversion Rate", "Average Order Value"],
                        learning: "Customer behavior affects sales. Higher prices = fewer customers, lower prices = more customers"
                    }
                ]
            },
            intermediate: {
                title: "Coffee Shop",
                scenarios: [
                    {
                        title: "Day 1: Market Analysis",
                        context: "You're opening a coffee shop. Analyze the market and set your strategy.",
                        decisions: [
                            {
                                id: "market-research",
                                text: "Conduct Market Research",
                                icon: "🔍",
                                action: "marketResearch",
                                learning: "market"
                            },
                            {
                                id: "set-pricing",
                                text: "Set Pricing Strategy",
                                icon: "💎",
                                action: "setPricing",
                                learning: "pricing"
                            }
                        ],
                        metrics: ["Market Share", "Customer Acquisition Cost", "Lifetime Value"],
                        learning: "Market analysis helps you understand competition and customer needs"
                    }
                ]
            },
            advanced: {
                title: "Tech Startup",
                scenarios: [
                    {
                        title: "Day 1: Financial Modeling",
                        context: "You're launching a tech startup. Build your financial model and growth strategy.",
                        decisions: [
                            {
                                id: "build-model",
                                text: "Build Financial Model",
                                icon: "📈",
                                action: "buildModel",
                                learning: "finance"
                            },
                            {
                                id: "growth-strategy",
                                text: "Plan Growth Strategy",
                                icon: "🚀",
                                action: "growthStrategy",
                                learning: "strategy"
                            }
                        ],
                        metrics: ["Burn Rate", "Runway", "ROI", "Growth Rate"],
                        learning: "Financial modeling helps predict cash flow and plan for growth"
                    }
                ]
            }
        };
        
        this.achievements = {
            firstSale: false,
            profitableDay: false,
            marketLeader: false,
            growthExpert: false
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.showWelcomeScreen();
    }
    
    setupEventListeners() {
        // Difficulty selection
        document.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const difficulty = e.currentTarget.dataset.difficulty;
                this.selectDifficulty(difficulty);
            });
        });
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigateToSection(section);
            });
        });
        
        // Modal buttons
        document.getElementById('confirm-btn').addEventListener('click', () => this.confirmPrice());
        document.getElementById('cancel-btn').addEventListener('click', () => this.hideModal());
        
        // Continue buttons
        document.getElementById('continue-btn').addEventListener('click', () => this.hideLearningMoment());
        document.getElementById('next-day-btn').addEventListener('click', () => this.nextDay());
        
        // Input handling
        document.getElementById('price-input').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (value < 1) e.target.value = 1;
            if (value > 50) e.target.value = 50;
        });
        
        document.getElementById('price-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.confirmPrice();
            }
        });
    }
    
    loadUserData() {
        const savedData = localStorage.getItem('businessAcademyData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.gameState = { ...this.gameState, ...data.gameState };
            this.learningState = { ...this.learningState, ...data.learningState };
            this.achievements = { ...this.achievements, ...data.achievements };
            this.currentDifficulty = data.difficulty;
        }
        this.updateUI();
    }
    
    saveUserData() {
        const data = {
            gameState: this.gameState,
            learningState: this.learningState,
            achievements: this.achievements,
            difficulty: this.currentDifficulty
        };
        localStorage.setItem('businessAcademyData', JSON.stringify(data));
    }
    
    updateUI() {
        document.getElementById('streak-count').textContent = this.gameState.streak;
        document.getElementById('xp-count').textContent = this.gameState.xp;
        document.getElementById('level-count').textContent = this.gameState.level;
        document.getElementById('cash-amount').textContent = `₹${this.gameState.cash}`;
        document.getElementById('current-day').textContent = this.gameState.day;
        document.getElementById('current-level').textContent = this.gameState.level;
    }
    
    showWelcomeScreen() {
        document.getElementById('welcome-screen').classList.remove('hidden');
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('leaderboard-screen').classList.add('hidden');
    }
    
    selectDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        this.gameState.day = 1;
        this.showGameScreen();
        this.saveUserData();
    }
    
    showGameScreen() {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        document.getElementById('leaderboard-screen').classList.add('hidden');
        
        this.renderCurrentScenario();
    }
    
    renderCurrentScenario() {
        const difficulty = this.scenarios[this.currentDifficulty];
        const scenario = difficulty.scenarios[this.gameState.day - 1];
        
        if (!scenario) {
            this.showCompletionScreen();
            return;
        }
        
        // Update business title
        document.getElementById('business-title').textContent = difficulty.title;
        
        // Update scenario
        document.getElementById('scenario-title').textContent = scenario.title;
        document.getElementById('scenario-context').textContent = scenario.context;
        
        // Render decisions
        this.renderDecisions(scenario.decisions);
        
        // Hide other screens
        document.getElementById('learning-moment').classList.add('hidden');
        document.getElementById('results-screen').classList.add('hidden');
    }
    
    renderDecisions(decisions) {
        const decisionOptions = document.getElementById('decision-options');
        decisionOptions.innerHTML = '';
        
        decisions.forEach(decision => {
            const button = document.createElement('button');
            button.className = 'decision-btn';
            button.innerHTML = `
                <span class="btn-icon">${decision.icon}</span>
                <span class="btn-text">${decision.text}</span>
            `;
            button.addEventListener('click', () => this.handleDecision(decision));
            decisionOptions.appendChild(button);
        });
    }
    
    handleDecision(decision) {
        switch (decision.action) {
            case 'showPriceModal':
                this.showPriceModal();
                break;
            case 'buyInventory':
                this.buyInventory();
                break;
            case 'analyzeDemand':
                this.analyzeDemand();
                break;
            case 'adjustPrice':
                this.adjustPrice();
                break;
            case 'marketResearch':
                this.marketResearch();
                break;
            case 'setPricing':
                this.setPricing();
                break;
            case 'buildModel':
                this.buildModel();
                break;
            case 'growthStrategy':
                this.growthStrategy();
                break;
        }
    }
    
    showPriceModal() {
        document.getElementById('modal-title').textContent = 'Set Your Price';
        document.getElementById('modal-description').textContent = 'How much will you charge per cup?';
        document.getElementById('price-input').value = this.gameState.price || 5;
        document.getElementById('input-modal').classList.remove('hidden');
        document.getElementById('price-input').focus();
    }
    
    confirmPrice() {
        const price = parseInt(document.getElementById('price-input').value);
        if (price >= 1 && price <= 50) {
            this.gameState.price = price;
            this.hideModal();
            this.updateLearningState('pricing', true);
            this.showLearningMoment(
                'Price Set!',
                `You're charging ₹${price} per cup. This affects how many customers will buy.`,
                '💰',
                `Price: ₹${price} per cup`
            );
        }
    }
    
    hideModal() {
        document.getElementById('input-modal').classList.add('hidden');
    }
    
    buyInventory() {
        if (this.gameState.cash < 30) {
            this.showLearningMoment(
                'Not Enough Cash!',
                'You need at least ₹30 to buy inventory.',
                '💸'
            );
            return;
        }
        
        const cost = 30;
        this.gameState.cash -= cost;
        this.gameState.inventory = 10;
        
        this.updateLearningState('costs', true);
        this.updateUI();
        this.showLearningMoment(
            'Inventory Purchased!',
            'You bought 10 cups for ₹30. Each cup costs ₹3 to make.',
            '🛒',
            `Cost: ₹${cost}, Inventory: 10 cups`
        );
    }
    
    analyzeDemand() {
        const price = this.gameState.price || 5;
        const demand = this.calculateDemand(price);
        
        this.updateLearningState('demand', true);
        this.showLearningMoment(
            'Demand Analysis',
            `At ₹${price} per cup, you can expect ${demand} customers. Higher prices = fewer customers.`,
            '📊',
            `Price: ₹${price}, Expected Customers: ${demand}`
        );
    }
    
    adjustPrice() {
        this.showPriceModal();
    }
    
    marketResearch() {
        this.updateLearningState('market', true);
        this.showLearningMoment(
            'Market Research Complete',
            'You found that the average coffee price is ₹80. Your target market prefers quality over price.',
            '🔍',
            'Market Average: ₹80, Target: Quality-focused customers'
        );
    }
    
    setPricing() {
        this.showPriceModal();
    }
    
    buildModel() {
        this.updateLearningState('finance', true);
        this.showLearningMoment(
            'Financial Model Built',
            'Your startup needs ₹50,000 monthly. With current revenue, you have 6 months runway.',
            '📈',
            'Monthly Burn: ₹50,000, Runway: 6 months'
        );
    }
    
    growthStrategy() {
        this.updateLearningState('strategy', true);
        this.showLearningMoment(
            'Growth Strategy Planned',
            'Focus on customer acquisition. Target 20% monthly growth rate.',
            '🚀',
            'Target Growth: 20% monthly'
        );
    }
    
    calculateDemand(price) {
        // Simple demand curve with weather and competition effects
        let baseDemand = 20;
        
        // Price sensitivity
        if (price <= 3) baseDemand = 25;
        else if (price <= 5) baseDemand = 20;
        else if (price <= 8) baseDemand = 15;
        else if (price <= 12) baseDemand = 10;
        else baseDemand = 5;
        
        // Weather effects
        if (this.gameState.weather === 'sunny') baseDemand *= 1.2;
        else if (this.gameState.weather === 'rainy') baseDemand *= 0.6;
        
        // Competition effects
        if (this.gameState.competition === 'high') baseDemand *= 0.7;
        
        return Math.floor(baseDemand);
    }
    
    updateLearningState(concept, correct) {
        if (this.learningState.concepts[concept]) {
            const conceptState = this.learningState.concepts[concept];
            
            if (correct) {
                conceptState.mastery += 1;
                conceptState.lastPracticed = Date.now();
                
                // Increase difficulty if mastery is high
                if (conceptState.mastery > 3) {
                    conceptState.difficulty = Math.min(conceptState.difficulty + 0.1, 3);
                }
            } else {
                conceptState.mastery = Math.max(conceptState.mastery - 0.5, 0);
                conceptState.difficulty = Math.max(conceptState.difficulty - 0.1, 0.5);
            }
        }
        
        this.saveUserData();
    }
    
    showLearningMoment(title, text, icon, metrics = '') {
        document.getElementById('learning-title').textContent = title;
        document.getElementById('learning-text').textContent = text;
        document.getElementById('learning-icon').textContent = icon;
        
        const metricsElement = document.getElementById('learning-metrics');
        if (metrics) {
            metricsElement.innerHTML = `<p><strong>${metrics}</strong></p>`;
        } else {
            metricsElement.innerHTML = '';
        }
        
        document.getElementById('learning-moment').classList.remove('hidden');
        
        // Award XP based on learning state
        const xpGain = this.calculateXPGain();
        this.gameState.xp += xpGain;
        this.gameState.streak++;
        
        // Level up check
        if (this.gameState.xp >= this.gameState.level * 100) {
            this.gameState.level++;
            this.showAchievement('Level Up!', `You've reached level ${this.gameState.level}!`);
        }
        
        this.updateUI();
        this.saveUserData();
    }
    
    calculateXPGain() {
        // Base XP + bonus for mastery
        let baseXP = 10;
        let masteryBonus = 0;
        
        Object.values(this.learningState.concepts).forEach(concept => {
            masteryBonus += concept.mastery * 2;
        });
        
        return Math.floor(baseXP + masteryBonus);
    }
    
    hideLearningMoment() {
        document.getElementById('learning-moment').classList.add('hidden');
        
        // Check if all decisions are made
        if (this.allDecisionsMade()) {
            this.showResults();
        }
    }
    
    allDecisionsMade() {
        // Simple check - in real implementation, track which decisions were made
        return this.gameState.price > 0 && this.gameState.inventory > 0;
    }
    
    showResults() {
        const results = this.calculateResults();
        
        const resultsGrid = document.getElementById('results-grid');
        resultsGrid.innerHTML = '';
        
        Object.entries(results).forEach(([key, value]) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <span class="result-label">${key}</span>
                <span class="result-value">${value}</span>
            `;
            resultsGrid.appendChild(resultItem);
        });
        
        // Generate insight based on learning state
        const insight = this.generateInsight(results);
        document.getElementById('insight-text').textContent = insight;
        
        document.getElementById('results-screen').classList.remove('hidden');
    }
    
    calculateResults() {
        const price = this.gameState.price || 5;
        const demand = this.calculateDemand(price);
        const sales = Math.min(demand, this.gameState.inventory || 0);
        const revenue = sales * price;
        const costs = sales * this.gameState.costPerCup;
        const profit = revenue - costs;
        
        // Update game state
        this.gameState.cash += revenue;
        this.gameState.totalProfit += profit;
        this.gameState.totalSales += sales;
        
        return {
            'Cups Sold': sales,
            'Revenue': `₹${revenue}`,
            'Costs': `₹${costs}`,
            'Profit': `₹${profit}`
        };
    }
    
    generateInsight(results) {
        const profit = parseInt(results.Profit.replace('₹', ''));
        
        // Use learning state to personalize insights
        const pricingMastery = this.learningState.concepts.pricing.mastery;
        const demandMastery = this.learningState.concepts.demand.mastery;
        
        if (pricingMastery > 3 && demandMastery > 3) {
            return `Excellent! Your pricing strategy is working perfectly. You understand both pricing and demand.`;
        } else if (profit > 0) {
            return `Great job! You made a profit of ₹${profit}. Keep learning about pricing and demand.`;
        } else if (profit < 0) {
            return `You lost ₹${Math.abs(profit)} today. Consider adjusting your price or reducing costs.`;
        } else {
            return `You broke even today. Try to optimize your pricing for better profits.`;
        }
    }
    
    nextDay() {
        this.gameState.day++;
        
        // Random weather and market conditions
        this.gameState.weather = ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)];
        this.gameState.marketConditions = ['normal', 'boom', 'recession'][Math.floor(Math.random() * 3)];
        this.gameState.competition = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];
        
        // Reset for new day
        this.gameState.price = 0;
        this.gameState.inventory = 0;
        
        // Hide results
        document.getElementById('results-screen').classList.add('hidden');
        
        this.updateUI();
        this.renderCurrentScenario();
    }
    
    showCompletionScreen() {
        const scenarioContent = document.getElementById('scenario-content');
        scenarioContent.innerHTML = `
            <div class="completion-content">
                <h3>🎉 Congratulations!</h3>
                <p>You've completed all scenarios in ${this.currentDifficulty} mode!</p>
                <div class="completion-stats">
                    <p><strong>Total XP:</strong> ${this.gameState.xp}</p>
                    <p><strong>Current Streak:</strong> ${this.gameState.streak} days</p>
                    <p><strong>Level:</strong> ${this.gameState.level}</p>
                </div>
                <button class="continue-btn" onclick="location.reload()">Start Over</button>
            </div>
        `;
    }
    
    showAchievement(title, text) {
        document.getElementById('achievement-text').textContent = text;
        document.getElementById('achievement-popup').classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('achievement-popup').classList.add('hidden');
        }, 3000);
    }
    
    navigateToSection(section) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // Handle different sections
        switch(section) {
            case 'learn':
                this.showWelcomeScreen();
                break;
            case 'practice':
                // Show practice mode
                break;
            case 'leaderboard':
                this.showLeaderboard();
                break;
            case 'profile':
                // Show profile
                break;
        }
    }
    
    showLeaderboard() {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('leaderboard-screen').classList.remove('hidden');
        
        // Generate mock leaderboard
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = '';
        
        const mockData = [
            { name: 'Business Pro', score: 1250 },
            { name: 'Startup Master', score: 1100 },
            { name: 'You', score: this.gameState.xp },
            { name: 'Coffee Expert', score: 950 },
            { name: 'Lemonade King', score: 800 }
        ];
        
        mockData.forEach((player, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            item.innerHTML = `
                <span class="leaderboard-rank">${index + 1}</span>
                <span class="leaderboard-name">${player.name}</span>
                <span class="leaderboard-score">${player.score} XP</span>
            `;
            leaderboardList.appendChild(item);
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BusinessAcademy();
});