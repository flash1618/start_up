class LemonadeStandGame {
    constructor() {
        this.gameState = {
            cash: 100,
            day: 1,
            price: 5,
            ingredients: {
                lemons: 0,
                sugar: 0,
                ice: 0
            },
            customersServed: 0,
            dailyEarnings: 0,
            totalEarnings: 0,
            goal: 50,
            achievements: {
                firstSale: false,
                hundredDay: false,
                businessOwner: false
            }
        };
        
        this.tutorialStep = 1;
        this.customers = [];
        this.maxCustomers = 5;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUI();
        this.showTutorial();
    }
    
    setupEventListeners() {
        // Tutorial
        document.getElementById('tutorial-start-btn').addEventListener('click', () => {
            this.hideTutorial();
        });
        
        // Buy ingredients
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.dataset.item;
                const price = parseFloat(e.target.dataset.price);
                this.buyIngredient(item, price);
            });
        });
        
        // Set price
        document.getElementById('set-price-btn').addEventListener('click', () => {
            this.setPrice();
        });
        
        // Serve customers
        document.getElementById('serve-btn').addEventListener('click', () => {
            this.serveCustomer();
        });
        
        // End day button
        document.getElementById('next-day-btn').addEventListener('click', () => {
            this.showDayResults();
        });
        
        // Next day
        document.getElementById('continue-btn').addEventListener('click', () => {
            this.nextDay();
        });
        
        // Customer clicks
        document.getElementById('customer-queue').addEventListener('click', (e) => {
            if (e.target.classList.contains('customer')) {
                this.serveCustomer(e.target);
            }
        });
    }
    
    showTutorial() {
        document.getElementById('tutorial-overlay').classList.remove('hidden');
    }
    
    hideTutorial() {
        document.getElementById('tutorial-overlay').classList.add('hidden');
        this.generateCustomers();
        this.updateTutorialStep(2);
    }
    
    updateTutorialStep(step) {
        // Remove active class from all steps
        document.querySelectorAll('.tutorial-step').forEach(s => {
            s.classList.remove('active');
        });
        
        // Add active class to current step
        const currentStep = document.getElementById(`tutorial-step-${step}`);
        if (currentStep) {
            currentStep.classList.add('active');
        }
    }
    
    buyIngredient(item, price) {
        let quantity, totalCost;
        
        switch(item) {
            case 'lemons':
                quantity = 5;
                totalCost = 10;
                break;
            case 'sugar':
                quantity = 10;
                totalCost = 10;
                break;
            case 'ice':
                quantity = 20;
                totalCost = 10;
                break;
        }
        
        if (this.gameState.cash >= totalCost) {
            this.gameState.cash -= totalCost;
            this.gameState.ingredients[item] += quantity;
            
            this.showMessage(`Bought ${quantity} ${item} for ₹${totalCost}!`, 'success');
            this.updateUI();
            this.checkTutorialProgress();
            
            // Animate the purchase
            this.animatePurchase(item);
        } else {
            this.showMessage(`Not enough cash! Need ₹${totalCost}`, 'error');
        }
    }
    
    animatePurchase(item) {
        const icon = document.querySelector(`[data-item="${item}"]`).parentElement.querySelector('.ingredient-icon');
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'achievementUnlock 0.6s ease-out';
        }, 10);
    }
    
    setPrice() {
        const priceInput = document.getElementById('price-input');
        const price = parseFloat(priceInput.value);
        
        if (price >= 1 && price <= 50) {
            this.gameState.price = price;
            document.getElementById('price-display').textContent = `₹${price}`;
            this.showMessage(`Price set to ₹${price} per cup!`, 'success');
            this.updateTutorialStep(3);
            this.checkTutorialProgress();
            
            // Regenerate customers with new price sensitivity
            this.generateCustomers();
        } else {
            this.showMessage('Price must be between ₹1 and ₹50!', 'error');
        }
    }
    
    generateCustomers() {
        const customerQueue = document.getElementById('customer-queue');
        customerQueue.innerHTML = '';
        
        // Base customer count, affected by price
        let baseCustomerCount = 4;
        if (this.gameState.price > 15) baseCustomerCount = 2;
        else if (this.gameState.price > 10) baseCustomerCount = 3;
        
        const customerCount = Math.floor(Math.random() * 2) + baseCustomerCount; // 2-5 customers
        
        for (let i = 0; i < customerCount; i++) {
            const customer = document.createElement('div');
            customer.className = 'customer';
            
            // Customer willingness to pay affected by price
            let minWilling = Math.max(5, this.gameState.price - 5);
            let maxWilling = Math.min(30, this.gameState.price + 15);
            const willingToPay = Math.floor(Math.random() * (maxWilling - minWilling + 1)) + minWilling;
            customer.dataset.willingToPay = willingToPay;
            
            // Add customer thoughts for learning
            const customerThoughts = this.getCustomerThoughts(willingToPay);
            customer.innerHTML = `
                <div class="customer-avatar">😊</div>
                <div class="customer-thought" style="display: none;">${customerThoughts}</div>
            `;
            
            // Add hover to show thoughts
            customer.addEventListener('mouseenter', () => {
                const thought = customer.querySelector('.customer-thought');
                thought.style.display = 'block';
            });
            
            customer.addEventListener('mouseleave', () => {
                const thought = customer.querySelector('.customer-thought');
                thought.style.display = 'none';
            });
            
            customerQueue.appendChild(customer);
        }
        
        // Enable serve button if we have ingredients
        this.updateServeButton();
    }
    
    getCustomerThoughts(willingToPay) {
        const thoughts = [
            `"I have ₹${willingToPay} in my pocket..."`,
            `"I'm willing to pay up to ₹${willingToPay} for lemonade"`,
            `"My budget is ₹${willingToPay} today"`,
            `"I can afford ₹${willingToPay} maximum"`,
            `"₹${willingToPay} is my limit for drinks"`
        ];
        return thoughts[Math.floor(Math.random() * thoughts.length)];
    }
    
    updateServeButton() {
        const serveBtn = document.getElementById('serve-btn');
        const hasIngredients = this.gameState.ingredients.lemons > 0 && 
                              this.gameState.ingredients.sugar > 0 && 
                              this.gameState.ingredients.ice > 0;
        
        serveBtn.disabled = !hasIngredients;
        
        if (hasIngredients) {
            serveBtn.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
        } else {
            serveBtn.style.background = '#ccc';
        }
    }
    
    serveCustomer(customerElement = null) {
        // Check if we have ingredients first
        if (this.gameState.ingredients.lemons <= 0 || 
            this.gameState.ingredients.sugar <= 0 || 
            this.gameState.ingredients.ice <= 0) {
            this.showMessage('Not enough ingredients! Buy more to serve customers.', 'error');
            return;
        }
        
        if (!customerElement) {
            customerElement = document.querySelector('.customer:not(.served)');
        }
        
        if (!customerElement) {
            this.showMessage('No more customers to serve!', 'warning');
            return;
        }
        
        const willingToPay = parseInt(customerElement.dataset.willingToPay);
        
        // Check if customer will buy at current price
        if (this.gameState.price <= willingToPay) {
            // Customer buys!
            const costPerCup = this.calculateCostPerCup();
            const profitPerCup = this.gameState.price - costPerCup;
            
            this.gameState.cash += this.gameState.price;
            this.gameState.dailyEarnings += this.gameState.price;
            this.gameState.customersServed++;
            
            // Use ingredients
            this.gameState.ingredients.lemons--;
            this.gameState.ingredients.sugar--;
            this.gameState.ingredients.ice--;
            
            // Mark customer as served
            customerElement.classList.add('served');
            customerElement.innerHTML = `
                <div class="customer-avatar">😋</div>
                <div class="sale-result">+₹${this.gameState.price}</div>
            `;
            
            // Show learning message with profit calculation
            this.showLearningMessage(
                `✅ SALE! Customer paid ₹${this.gameState.price}`,
                `📊 Profit: ₹${this.gameState.price} - ₹${costPerCup} = ₹${profitPerCup} profit!`,
                'success'
            );
            
            // Check achievements
            this.checkAchievements();
            
            // Animate cash increase
            this.animateCashIncrease();
            
        } else {
            // Customer leaves
            customerElement.classList.add('served');
            customerElement.innerHTML = `
                <div class="customer-avatar">😞</div>
                <div class="sale-result">No Sale</div>
            `;
            
            // Show learning message about pricing
            this.showLearningMessage(
                `❌ Customer left - price too high!`,
                `💡 They had ₹${willingToPay} but you charged ₹${this.gameState.price}. Try lowering your price!`,
                'warning'
            );
        }
        
        this.updateUI();
        this.updateServeButton();
        
        // Check if all customers served
        const remainingCustomers = document.querySelectorAll('.customer:not(.served)').length;
        if (remainingCustomers === 0) {
            this.endDay();
        }
    }
    
    animateCashIncrease() {
        const cashElement = document.getElementById('cash-amount');
        cashElement.style.animation = 'none';
        setTimeout(() => {
            cashElement.style.animation = 'achievementUnlock 0.6s ease-out';
        }, 10);
    }
    
    endDay() {
        document.getElementById('next-day-btn').disabled = false;
        this.showMessage('All customers served! Click "End Day" to see results.', 'success');
    }
    
    showDayResults() {
        // Show day results modal
        this.showDayResultsModal();
    }
    
    showDayResultsModal() {
        const modal = document.getElementById('day-results-modal');
        const progress = Math.min((this.gameState.dailyEarnings / this.gameState.goal) * 100, 100);
        const costPerCup = this.calculateCostPerCup();
        const totalCosts = this.gameState.customersServed * costPerCup;
        const totalProfit = this.gameState.dailyEarnings - totalCosts;
        
        // Update modal content
        document.getElementById('results-day').textContent = this.gameState.day;
        document.getElementById('result-customers').textContent = this.gameState.customersServed;
        document.getElementById('result-earned').textContent = `₹${this.gameState.dailyEarnings}`;
        document.getElementById('result-goal').textContent = `${Math.round(progress)}%`;
        
        // Update progress bar
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        // Set result message with learning insights
        let message = '';
        if (this.gameState.dailyEarnings >= this.gameState.goal) {
            message = `🎉 Great job! You reached your goal of ₹${this.gameState.goal}!<br><br>📊 Business Analysis:<br>• Revenue: ₹${this.gameState.dailyEarnings}<br>• Costs: ₹${totalCosts.toFixed(1)}<br>• Profit: ₹${totalProfit.toFixed(1)}<br>• Profit per cup: ₹${(totalProfit / this.gameState.customersServed).toFixed(1)}`;
        } else {
            message = `Keep trying! You earned ₹${this.gameState.dailyEarnings} out of ₹${this.gameState.goal} goal.<br><br>📊 Business Analysis:<br>• Revenue: ₹${this.gameState.dailyEarnings}<br>• Costs: ₹${totalCosts.toFixed(1)}<br>• Profit: ₹${totalProfit.toFixed(1)}<br><br>💡 Tip: Try adjusting your price to find the sweet spot between customer count and profit per sale!`;
        }
        document.getElementById('results-message').innerHTML = message;
        
        modal.classList.remove('hidden');
    }
    
    nextDay() {
        // Reset daily stats
        this.gameState.dailyEarnings = 0;
        this.gameState.customersServed = 0;
        this.gameState.day++;
        
        // Increase goal
        this.gameState.goal = Math.min(this.gameState.goal + 25, 200);
        
        // Close modal
        document.getElementById('day-results-modal').classList.add('hidden');
        
        // Show learning challenge on day 3
        if (this.gameState.day === 3) {
            this.showPricingChallenge();
        }
        
        // Generate new customers
        this.generateCustomers();
        
        // Update UI
        this.updateUI();
        
        // Check win condition
        if (this.gameState.cash >= 500) {
            this.showWinScreen();
        }
    }
    
    showPricingChallenge() {
        this.showLearningMessage(
            "🧩 PRICING CHALLENGE!",
            "You've learned the basics! Now here's a puzzle: You have 10 customers today. 3 will pay up to ₹5, 4 will pay up to ₹8, and 3 will pay up to ₹12. What price should you set to maximize profit? (Cost per cup: ₹3.5)",
            'info'
        );
    }
    
    checkAchievements() {
        // First Sale
        if (this.gameState.customersServed === 1 && !this.gameState.achievements.firstSale) {
            this.gameState.achievements.firstSale = true;
            this.gameState.cash += 10; // Bonus
            this.showAchievement('First Sale', 'You made your first sale!', '🥇');
        }
        
        // ₹100 Day
        if (this.gameState.dailyEarnings >= 100 && !this.gameState.achievements.hundredDay) {
            this.gameState.achievements.hundredDay = true;
            this.gameState.cash += 25; // Bonus
            this.showAchievement('₹100 Day', 'You earned ₹100 in one day!', '💰');
        }
        
        // Business Owner
        if (this.gameState.cash >= 500 && !this.gameState.achievements.businessOwner) {
            this.gameState.achievements.businessOwner = true;
            this.showAchievement('Business Owner', 'You saved ₹500 for your bike!', '👑');
        }
    }
    
    showAchievement(title, description, icon) {
        const popup = document.getElementById('achievement-popup');
        popup.querySelector('.achievement-icon-large').textContent = icon;
        popup.querySelector('.achievement-description').textContent = description;
        
        popup.classList.remove('hidden');
        
        // Update achievement list
        const achievementItems = document.querySelectorAll('.achievement-item');
        achievementItems.forEach(item => {
            if (item.querySelector('.achievement-text').textContent === title) {
                item.classList.remove('locked');
                item.classList.add('unlocked');
            }
        });
        
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 3000);
    }
    
    showWinScreen() {
        const modal = document.getElementById('day-results-modal');
        document.getElementById('results-message').innerHTML = `
            🎉🎉🎉 CONGRATULATIONS! 🎉🎉🎉<br><br>
            You saved ₹500 and can now buy your new bike! 🚲<br><br>
            You've become a successful lemonade stand entrepreneur!
        `;
        modal.classList.remove('hidden');
        
        // Change continue button text
        document.getElementById('continue-btn').textContent = 'Play Again';
        document.getElementById('continue-btn').onclick = () => {
            location.reload();
        };
    }
    
    checkTutorialProgress() {
        const hasIngredients = this.gameState.ingredients.lemons > 0 && 
                              this.gameState.ingredients.sugar > 0 && 
                              this.gameState.ingredients.ice > 0;
        
        if (hasIngredients && this.tutorialStep === 2) {
            this.updateTutorialStep(3);
        }
    }
    
    calculateCostPerCup() {
        // Cost breakdown: 1 lemon (₹2), 1 sugar (₹1), 1 ice (₹0.5) = ₹3.5 per cup
        return 3.5;
    }
    
    showLearningMessage(title, explanation, type = 'info') {
        const messagesContainer = document.getElementById('game-messages');
        const message = document.createElement('div');
        message.className = `learning-message ${type}`;
        message.innerHTML = `
            <div class="learning-title">${title}</div>
            <div class="learning-explanation">${explanation}</div>
        `;
        
        messagesContainer.appendChild(message);
        
        // Remove message after 5 seconds (longer for learning)
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    showMessage(text, type = 'info') {
        const messagesContainer = document.getElementById('game-messages');
        const message = document.createElement('div');
        message.className = `game-message ${type}`;
        message.textContent = text;
        
        messagesContainer.appendChild(message);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    updateUI() {
        // Update cash
        document.getElementById('cash-amount').textContent = `₹${this.gameState.cash}`;
        
        // Update day
        document.getElementById('day-number').textContent = this.gameState.day;
        
        // Update ingredients
        document.getElementById('lemons-count').textContent = this.gameState.ingredients.lemons;
        document.getElementById('sugar-count').textContent = this.gameState.ingredients.sugar;
        document.getElementById('ice-count').textContent = this.gameState.ingredients.ice;
        
        // Update price display
        document.getElementById('price-display').textContent = `₹${this.gameState.price}`;
        
        // Update serve count
        document.getElementById('serve-count').textContent = this.gameState.customersServed;
        
        // Update goal
        document.getElementById('goal-amount').textContent = this.gameState.goal;
        
        // Update progress
        const progress = Math.min((this.gameState.dailyEarnings / this.gameState.goal) * 100, 100);
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        // Update goal status
        const goalStatus = document.getElementById('goal-status');
        if (this.gameState.dailyEarnings >= this.gameState.goal) {
            goalStatus.textContent = 'Goal reached! 🎉';
            goalStatus.style.color = '#4CAF50';
        } else {
            goalStatus.textContent = `₹${this.gameState.dailyEarnings} / ₹${this.gameState.goal}`;
            goalStatus.style.color = '#666';
        }
        
        // Update achievements
        this.updateAchievements();
    }
    
    updateAchievements() {
        const achievements = document.querySelectorAll('.achievement-item');
        
        if (this.gameState.achievements.firstSale) {
            achievements[0].classList.remove('locked');
            achievements[0].classList.add('unlocked');
        }
        
        if (this.gameState.achievements.hundredDay) {
            achievements[1].classList.remove('locked');
            achievements[1].classList.add('unlocked');
        }
        
        if (this.gameState.achievements.businessOwner) {
            achievements[2].classList.remove('locked');
            achievements[2].classList.add('unlocked');
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new LemonadeStandGame();
});