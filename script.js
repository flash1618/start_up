// Lemonade Stand - Real Business Simulation
class LemonadeStandGame {
    constructor() {
        this.gameState = {
            day: 1,
            cash: 100,
            price: 5,
            inventory: 0,
            costPerCup: 3,
            streak: 0,
            level: 1,
            totalProfit: 0,
            totalSales: 0
        };
        
        this.weather = ['☀️ Sunny', '🌤️ Partly Cloudy', '☁️ Cloudy', '🌧️ Rainy'];
        this.currentWeather = '☀️ Sunny';
        
        this.achievements = {
            firstSale: false,
            profitableDay: false,
            highSales: false,
            perfectPricing: false
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUI();
        this.showLearningMoment('Welcome to your lemonade stand!', 'Start by setting your price and buying inventory.', '🍋');
    }
    
    setupEventListeners() {
        // Decision buttons
        document.getElementById('set-price-btn').addEventListener('click', () => this.showPriceModal());
        document.getElementById('buy-inventory-btn').addEventListener('click', () => this.buyInventory());
        document.getElementById('start-day-btn').addEventListener('click', () => this.startDay());
        
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
            if (value > 20) e.target.value = 20;
        });
        
        document.getElementById('price-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.confirmPrice();
            }
        });
    }
    
    updateUI() {
        document.getElementById('current-day').textContent = this.gameState.day;
        document.getElementById('weather-info').textContent = this.currentWeather;
        document.getElementById('cash-amount').textContent = `₹${this.gameState.cash}`;
        document.getElementById('price-per-cup').textContent = `₹${this.gameState.price}`;
        document.getElementById('inventory-count').textContent = `${this.gameState.inventory} cups`;
        document.getElementById('cost-per-cup').textContent = `₹${this.gameState.costPerCup}`;
        document.getElementById('streak-count').textContent = this.gameState.streak;
        document.getElementById('level-count').textContent = this.gameState.level;
        
        this.updateDecisionButtons();
    }
    
    updateDecisionButtons() {
        const setPriceBtn = document.getElementById('set-price-btn');
        const buyInventoryBtn = document.getElementById('buy-inventory-btn');
        const startDayBtn = document.getElementById('start-day-btn');
        
        // Reset all buttons
        setPriceBtn.classList.remove('completed');
        buyInventoryBtn.classList.remove('completed');
        startDayBtn.disabled = true;
        
        // Enable start day only if both price and inventory are set
        if (this.gameState.price > 0 && this.gameState.inventory > 0) {
            startDayBtn.disabled = false;
        }
    }
    
    showPriceModal() {
        document.getElementById('modal-title').textContent = 'Set Your Price';
        document.getElementById('modal-description').textContent = 'How much will you charge per cup of lemonade?';
        document.getElementById('price-input').value = this.gameState.price;
        document.getElementById('input-modal').classList.remove('hidden');
        document.getElementById('price-input').focus();
    }
    
    confirmPrice() {
        const price = parseInt(document.getElementById('price-input').value);
        if (price >= 1 && price <= 20) {
            this.gameState.price = price;
            this.hideModal();
            this.updateUI();
            this.showLearningMoment(
                'Price Set!',
                `You're charging ₹${price} per cup. Higher prices mean more profit per sale, but fewer customers might buy.`,
                '💰'
            );
        }
    }
    
    hideModal() {
        document.getElementById('input-modal').classList.add('hidden');
    }
    
    buyInventory() {
        if (this.gameState.cash < this.gameState.costPerCup) {
            this.showLearningMoment(
                'Not Enough Cash!',
                `You need ₹${this.gameState.costPerCup} to make one cup, but you only have ₹${this.gameState.cash}.`,
                '💸'
            );
            return;
        }
        
        // Buy as many cups as possible
        const maxCups = Math.floor(this.gameState.cash / this.gameState.costPerCup);
        const cupsToBuy = Math.min(maxCups, 10); // Limit to 10 cups per day
        
        this.gameState.inventory += cupsToBuy;
        this.gameState.cash -= cupsToBuy * this.gameState.costPerCup;
        
        this.updateUI();
        this.showLearningMoment(
            'Inventory Purchased!',
            `You bought ${cupsToBuy} cups for ₹${cupsToBuy * this.gameState.costPerCup}. Each cup costs ₹${this.gameState.costPerCup} to make.`,
            '🛒'
        );
    }
    
    startDay() {
        if (this.gameState.inventory === 0) {
            this.showLearningMoment(
                'No Inventory!',
                'You need to buy inventory before you can start selling.',
                '⚠️'
            );
            return;
        }
        
        this.simulateDay();
        this.showDayResults();
    }
    
    simulateDay() {
        // Weather affects customer demand
        const weatherMultiplier = this.getWeatherMultiplier();
        
        // Price affects willingness to buy
        const priceMultiplier = this.getPriceMultiplier();
        
        // Calculate potential customers
        const baseCustomers = Math.floor(Math.random() * 15) + 5; // 5-20 customers
        const adjustedCustomers = Math.floor(baseCustomers * weatherMultiplier * priceMultiplier);
        
        // Calculate sales
        const potentialSales = Math.min(adjustedCustomers, this.gameState.inventory);
        const actualSales = Math.max(0, potentialSales);
        
        // Update game state
        this.gameState.inventory -= actualSales;
        const revenue = actualSales * this.gameState.price;
        const costs = actualSales * this.gameState.costPerCup;
        const profit = revenue - costs;
        
        this.gameState.cash += revenue;
        this.gameState.totalProfit += profit;
        this.gameState.totalSales += actualSales;
        
        // Store results for display
        this.dayResults = {
            cupsSold: actualSales,
            revenue: revenue,
            costs: costs,
            profit: profit,
            customers: adjustedCustomers
        };
        
        // Check achievements
        this.checkAchievements(actualSales, profit);
    }
    
    getWeatherMultiplier() {
        switch (this.currentWeather) {
            case '☀️ Sunny': return 1.2;
            case '🌤️ Partly Cloudy': return 1.0;
            case '☁️ Cloudy': return 0.8;
            case '🌧️ Rainy': return 0.5;
            default: return 1.0;
        }
    }
    
    getPriceMultiplier() {
        // Price sensitivity curve
        if (this.gameState.price <= 3) return 1.3;
        if (this.gameState.price <= 5) return 1.0;
        if (this.gameState.price <= 8) return 0.7;
        if (this.gameState.price <= 12) return 0.4;
        return 0.2;
    }
    
    checkAchievements(sales, profit) {
        if (sales > 0 && !this.achievements.firstSale) {
            this.achievements.firstSale = true;
            this.showAchievement('First Sale!', 'You made your first sale!');
        }
        
        if (profit > 0 && !this.achievements.profitableDay) {
            this.achievements.profitableDay = true;
            this.showAchievement('Profitable Day!', 'You made a profit today!');
        }
        
        if (sales >= 15 && !this.achievements.highSales) {
            this.achievements.highSales = true;
            this.showAchievement('High Sales!', 'You sold 15+ cups in one day!');
        }
        
        if (this.gameState.price >= 8 && sales >= 10 && !this.achievements.perfectPricing) {
            this.achievements.perfectPricing = true;
            this.showAchievement('Perfect Pricing!', 'You found the sweet spot for pricing!');
        }
    }
    
    showAchievement(title, text) {
        document.getElementById('achievement-text').textContent = text;
        document.getElementById('achievement-popup').classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('achievement-popup').classList.add('hidden');
        }, 3000);
    }
    
    showDayResults() {
        const results = this.dayResults;
        
        document.getElementById('cups-sold').textContent = results.cupsSold;
        document.getElementById('revenue').textContent = `₹${results.revenue}`;
        document.getElementById('costs').textContent = `₹${results.costs}`;
        document.getElementById('profit').textContent = `₹${results.profit}`;
        
        // Generate learning insight
        let insight = '';
        if (results.profit > 0) {
            insight = `Great job! You made a profit of ₹${results.profit}. Your pricing strategy is working!`;
        } else if (results.profit < 0) {
            insight = `You lost ₹${Math.abs(results.profit)} today. Consider adjusting your price or reducing costs.`;
        } else {
            insight = `You broke even today. Try to optimize your pricing for better profits.`;
        }
        
        document.getElementById('insight-text').textContent = insight;
        document.getElementById('day-results').classList.remove('hidden');
    }
    
    nextDay() {
        this.gameState.day++;
        this.gameState.streak++;
        
        // Level up every 5 days
        if (this.gameState.day % 5 === 0) {
            this.gameState.level++;
            this.showLearningMoment(
                'Level Up!',
                `You've reached level ${this.gameState.level}! You're becoming a better business owner.`,
                '⭐'
            );
        }
        
        // Random weather
        this.currentWeather = this.weather[Math.floor(Math.random() * this.weather.length)];
        
        // Reset for new day
        this.gameState.price = 5;
        this.gameState.inventory = 0;
        
        // Hide results
        document.getElementById('day-results').classList.add('hidden');
        
        this.updateUI();
        this.showLearningMoment(
            `Day ${this.gameState.day}`,
            `Weather: ${this.currentWeather}. Start by setting your price and buying inventory.`,
            '🌅'
        );
    }
    
    showLearningMoment(title, text, icon) {
        document.getElementById('learning-title').textContent = title;
        document.getElementById('learning-text').textContent = text;
        document.getElementById('learning-icon').textContent = icon;
        document.getElementById('learning-moment').classList.remove('hidden');
    }
    
    hideLearningMoment() {
        document.getElementById('learning-moment').classList.add('hidden');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LemonadeStandGame();
});