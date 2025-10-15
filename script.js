class LemonadeStandGame {
    constructor() {
        this.difficulty = 'easy'; // Default difficulty
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
        this.user = {
            isLoggedIn: false,
            isGuest: false,
            name: 'Guest Player',
            email: null
        };
        this.maxCustomers = 5;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkLoginStatus();
    }
    
    checkLoginStatus() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('lemonadeUser');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.showGame();
        } else {
            this.showLogin();
        }
    }
    
    showLogin() {
        document.getElementById('login-overlay').style.display = 'flex';
        document.getElementById('game-container').style.display = 'none';
    }
    
    showGame() {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        this.updateUserDisplay();
        this.showDifficultySelection();
    }
    
    updateUserDisplay() {
        document.getElementById('user-name').textContent = this.user.name;
        document.getElementById('user-type').textContent = this.user.isGuest ? 'Guest' : 'User';
    }
    
    setupLoginEventListeners() {
        // Login tabs
        document.querySelectorAll('.login-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabType = e.target.dataset.tab;
                this.switchLoginTab(tabType);
            });
        });
        
        // Login form
        document.getElementById('login-btn').addEventListener('click', () => {
            this.handleLogin();
        });
        
        // Signup form
        document.getElementById('signup-btn').addEventListener('click', () => {
            this.handleSignup();
        });
        
        // Guest login
        document.getElementById('guest-btn').addEventListener('click', () => {
            this.handleGuestLogin();
        });
        
        document.getElementById('guest-btn-signup').addEventListener('click', () => {
            this.handleGuestLogin();
        });
        
        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.handleLogout();
        });
        
        // Enter key for forms
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (document.getElementById('login-form').classList.contains('active')) {
                    this.handleLogin();
                } else if (document.getElementById('signup-form').classList.contains('active')) {
                    this.handleSignup();
                }
            }
        });
    }
    
    switchLoginTab(tabType) {
        // Update tab buttons
        document.querySelectorAll('.login-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabType}"]`).classList.add('active');
        
        // Update forms
        document.querySelectorAll('.login-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${tabType}-form`).classList.add('active');
    }
    
    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Simple validation (in real app, this would be server-side)
        const users = JSON.parse(localStorage.getItem('lemonadeUsers') || '{}');
        if (users[email] && users[email].password === password) {
            this.user = {
                isLoggedIn: true,
                isGuest: false,
                name: users[email].name,
                email: email
            };
            this.saveUser();
            this.showGame();
            this.showMessage(`Welcome back, ${this.user.name}!`, 'success');
        } else {
            this.showMessage('Invalid email or password', 'error');
        }
    }
    
    handleSignup() {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        if (!name || !email || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters', 'error');
            return;
        }
        
        // Simple validation (in real app, this would be server-side)
        const users = JSON.parse(localStorage.getItem('lemonadeUsers') || '{}');
        if (users[email]) {
            this.showMessage('Email already exists', 'error');
            return;
        }
        
        users[email] = { name, password };
        localStorage.setItem('lemonadeUsers', JSON.stringify(users));
        
        this.user = {
            isLoggedIn: true,
            isGuest: false,
            name: name,
            email: email
        };
        this.saveUser();
        this.showGame();
        this.showMessage(`Welcome to Lemonade Stand, ${name}!`, 'success');
    }
    
    handleGuestLogin() {
        this.user = {
            isLoggedIn: true,
            isGuest: true,
            name: 'Guest Player',
            email: null
        };
        this.saveUser();
        this.showGame();
        this.showMessage('Welcome! Playing as guest', 'info');
    }
    
    handleLogout() {
        localStorage.removeItem('lemonadeUser');
        this.user = {
            isLoggedIn: false,
            isGuest: false,
            name: 'Guest Player',
            email: null
        };
        this.showLogin();
        this.showMessage('Logged out successfully', 'info');
    }
    
    saveUser() {
        localStorage.setItem('lemonadeUser', JSON.stringify(this.user));
    }
    
    setupEventListeners() {
        // Login system
        this.setupLoginEventListeners();
        
        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.difficulty-card');
                const difficulty = card.dataset.difficulty;
                this.selectDifficulty(difficulty);
            });
        });
        
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
    
    showDifficultySelection() {
        document.getElementById('difficulty-overlay').classList.remove('hidden');
    }
    
    selectDifficulty(difficulty) {
        this.difficulty = difficulty;
        
        // Adjust game parameters based on difficulty
        this.adjustGameForDifficulty();
        
        // Hide difficulty selection
        document.getElementById('difficulty-overlay').classList.add('hidden');
        
        // Add difficulty class to body for any remaining styling
        document.body.className = document.body.className.replace(/easy-mode|medium-mode|hard-mode/g, '');
        document.body.classList.add(`${difficulty}-mode`);
        
        // Show tutorial for easy mode, or start game directly for others
        if (difficulty === 'easy') {
            this.showTutorial();
        } else {
            this.startGame();
        }
    }
    
    adjustGameForDifficulty() {
        switch(this.difficulty) {
            case 'easy':
                this.gameState.cash = 100;
                this.gameState.goal = 50;
                this.gameState.weather = 'sunny';
                this.gameState.competition = 0;
                this.gameState.marketing = 0;
                break;
            case 'medium':
                this.gameState.cash = 150;
                this.gameState.goal = 100;
                this.gameState.weather = this.getRandomWeather();
                this.gameState.competition = 1;
                this.gameState.marketing = 0;
                this.gameState.products = ['lemonade'];
                break;
            case 'hard':
                this.gameState.cash = 200;
                this.gameState.goal = 200;
                this.gameState.weather = this.getRandomWeather();
                this.gameState.competition = 2;
                this.gameState.marketing = 0;
                this.gameState.products = ['lemonade', 'iced_tea', 'snacks'];
                this.gameState.employees = 0;
                this.gameState.marketResearch = 0;
                break;
        }
        
        // Add difficulty class to body for styling
        document.body.className = document.body.className.replace(/easy-mode|medium-mode|hard-mode/g, '');
        document.body.classList.add(`${this.difficulty}-mode`);
        
        // Show/hide difficulty-specific features
        this.toggleDifficultyFeatures();
    }
    
    getRandomWeather() {
        const weathers = ['sunny', 'cloudy', 'rainy', 'hot'];
        return weathers[Math.floor(Math.random() * weathers.length)];
    }
    
    toggleDifficultyFeatures() {
        // Hide all difficulty-specific elements first
        document.querySelectorAll('.hard-mode-only').forEach(el => {
            el.style.display = 'none';
        });
        
        // Show features based on difficulty
        if (this.difficulty === 'hard') {
            // Show Hard Mode features
            document.querySelectorAll('.hard-mode-only').forEach(el => {
                el.style.display = 'block';
            });
        }
    }
    
    startGame() {
        this.updateUI();
        this.updateWeatherDisplay();
        this.generateCustomers();
    }
    
    updateWeatherDisplay() {
        const weatherDisplay = document.getElementById('weather-display');
        const weatherIcon = document.getElementById('weather-icon');
        const weatherText = document.getElementById('weather-text');
        
        if (this.difficulty === 'easy') {
            weatherDisplay.style.display = 'none';
            return;
        }
        
        weatherDisplay.style.display = 'flex';
        
        const weatherIcons = {
            'sunny': '☀️',
            'cloudy': '☁️',
            'rainy': '🌧️',
            'hot': '🔥'
        };
        
        const weatherNames = {
            'sunny': 'Sunny',
            'cloudy': 'Cloudy',
            'rainy': 'Rainy',
            'hot': 'Hot'
        };
        
        weatherIcon.textContent = weatherIcons[this.gameState.weather];
        weatherText.textContent = weatherNames[this.gameState.weather];
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
            case 'tea':
                quantity = 5;
                totalCost = 40;
                break;
            case 'snacks':
                quantity = 3;
                totalCost = 36;
                break;
        }
        
        if (this.gameState.cash >= totalCost) {
            this.gameState.cash -= totalCost;
            this.gameState.ingredients[item] += quantity;
            
            this.showMessage(`Bought ${quantity} ${item} for ₹${totalCost}!`, 'success');
            this.updateUI();
            
            // Update tutorial progress (only for basic ingredients in Easy mode)
            if (this.difficulty === 'easy' && ['lemons', 'sugar', 'ice'].includes(item)) {
                this.checkTutorialProgress();
            }
            
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
        
        let customerCount = Math.floor(Math.random() * 2) + baseCustomerCount; // 2-5 customers
        
        // Weather effects (Medium & Hard modes)
        if (this.difficulty !== 'easy') {
            customerCount = this.applyWeatherEffects(customerCount);
        }
        
        // Competition effects (Medium & Hard modes)
        if (this.difficulty !== 'easy') {
            customerCount = this.applyCompetitionEffects(customerCount);
        }
        
        for (let i = 0; i < customerCount; i++) {
            const customer = document.createElement('div');
            customer.className = 'customer';
            
            // Customer willingness to pay affected by price
            let minWilling = Math.max(5, this.gameState.price - 5);
            let maxWilling = Math.min(30, this.gameState.price + 15);
            let willingToPay = Math.floor(Math.random() * (maxWilling - minWilling + 1)) + minWilling;
            
            // Weather affects willingness to pay
            if (this.difficulty !== 'easy') {
                willingToPay = this.applyWeatherToWillingness(willingToPay);
            }
            
            customer.dataset.willingToPay = willingToPay;
            
            // Add customer thoughts for learning
            const customerThoughts = this.getCustomerThoughts(willingToPay);
            customer.innerHTML = `
                <div class="customer-avatar">${this.getCustomerEmoji()}</div>
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
    
    applyWeatherEffects(customerCount) {
        switch(this.gameState.weather) {
            case 'hot':
                return Math.floor(customerCount * 1.5); // 50% more customers
            case 'sunny':
                return customerCount; // Normal
            case 'cloudy':
                return Math.floor(customerCount * 0.8); // 20% fewer
            case 'rainy':
                return Math.floor(customerCount * 0.5); // 50% fewer
            default:
                return customerCount;
        }
    }
    
    applyCompetitionEffects(customerCount) {
        const competitionFactor = 1 - (this.gameState.competition * 0.2); // 20% reduction per competitor
        return Math.floor(customerCount * competitionFactor);
    }
    
    applyWeatherToWillingness(willingToPay) {
        switch(this.gameState.weather) {
            case 'hot':
                return Math.floor(willingToPay * 1.2); // Pay 20% more when hot
            case 'rainy':
                return Math.floor(willingToPay * 0.8); // Pay 20% less when rainy
            default:
                return willingToPay;
        }
    }
    
    getCustomerEmoji() {
        const emojis = ['😊', '😄', '🤔', '😐', '😕'];
        return emojis[Math.floor(Math.random() * emojis.length)];
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
        
        // Change weather for Medium & Hard modes
        if (this.difficulty !== 'easy') {
            this.gameState.weather = this.getRandomWeather();
            this.updateWeatherDisplay();
        }
        
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
        message.className = `message ${type}`;
        message.innerHTML = `
            <div class="message-title">${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}</div>
            <div class="message-text">${text}</div>
        `;
        
        messagesContainer.appendChild(message);
        
        // Remove message after 4 seconds
        setTimeout(() => {
            message.remove();
        }, 4000);
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
        
        // Update Hard Mode inventory
        if (this.difficulty === 'hard') {
            document.getElementById('iced-tea-count').textContent = this.gameState.ingredients.tea || 0;
            document.getElementById('snacks-count').textContent = this.gameState.ingredients.snacks || 0;
        }
        
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