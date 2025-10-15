// EXACT DUOLINGO REPLICA - Business Academy
class BusinessAcademy {
    constructor() {
        this.currentDifficulty = null;
        this.currentLesson = 0;
        this.totalLessons = 5;
        this.streak = 0;
        this.gems = 0;
        this.lessons = {
            beginner: [
                {
                    title: "What is Revenue?",
                    question: "Revenue is the total amount of money a business earns from selling products or services. If you sell 10 lemonades at ₹5 each, what is your revenue?",
                    options: ["₹50", "₹15", "₹5", "₹10"],
                    correct: 0,
                    explanation: "Revenue = Price × Quantity = ₹5 × 10 = ₹50"
                },
                {
                    title: "Understanding Costs",
                    question: "Costs are the money you spend to make your product. If lemons cost ₹2 each and you need 2 lemons per lemonade, what's the cost for 5 lemonades?",
                    options: ["₹20", "₹10", "₹15", "₹25"],
                    correct: 0,
                    explanation: "Cost = Cost per unit × Quantity = ₹2 × 2 × 5 = ₹20"
                },
                {
                    title: "Calculating Profit",
                    question: "Profit = Revenue - Costs. If your revenue is ₹50 and costs are ₹20, what is your profit?",
                    options: ["₹30", "₹70", "₹25", "₹35"],
                    correct: 0,
                    explanation: "Profit = ₹50 - ₹20 = ₹30"
                },
                {
                    title: "Break-even Point",
                    question: "Break-even is when your revenue equals your costs. If each lemonade costs ₹4 to make and you sell for ₹6, how many do you need to sell to break even with ₹20 in fixed costs?",
                    options: ["10", "5", "15", "20"],
                    correct: 0,
                    explanation: "Break-even = Fixed Costs ÷ (Price - Variable Cost) = ₹20 ÷ (₹6 - ₹4) = 10"
                },
                {
                    title: "Customer Acquisition",
                    question: "Customer Acquisition Cost (CAC) is how much you spend to get one customer. If you spend ₹100 on marketing and get 20 customers, what's your CAC?",
                    options: ["₹5", "₹10", "₹15", "₹20"],
                    correct: 0,
                    explanation: "CAC = Marketing Spend ÷ Customers = ₹100 ÷ 20 = ₹5"
                }
            ],
            intermediate: [
                {
                    title: "Market Analysis",
                    question: "Market share is your portion of total market sales. If the total coffee market is ₹1,000,000 and your shop makes ₹50,000, what's your market share?",
                    options: ["5%", "10%", "15%", "20%"],
                    correct: 0,
                    explanation: "Market Share = (Your Sales ÷ Total Market) × 100 = (₹50,000 ÷ ₹1,000,000) × 100 = 5%"
                },
                {
                    title: "Customer Lifetime Value",
                    question: "LTV is the total value a customer brings over their lifetime. If a customer buys ₹50 worth of coffee monthly for 2 years, what's their LTV?",
                    options: ["₹1,200", "₹1,000", "₹1,500", "₹800"],
                    correct: 0,
                    explanation: "LTV = Monthly Value × Months = ₹50 × 24 = ₹1,200"
                },
                {
                    title: "Gross Margin",
                    question: "Gross margin is the percentage of revenue left after direct costs. If revenue is ₹1,000 and direct costs are ₹600, what's the gross margin?",
                    options: ["40%", "30%", "50%", "60%"],
                    correct: 0,
                    explanation: "Gross Margin = ((Revenue - Costs) ÷ Revenue) × 100 = ((₹1,000 - ₹600) ÷ ₹1,000) × 100 = 40%"
                },
                {
                    title: "Inventory Turnover",
                    question: "Inventory turnover measures how quickly you sell inventory. If you have ₹10,000 in inventory and sell ₹30,000 worth annually, what's your turnover?",
                    options: ["3", "2", "4", "5"],
                    correct: 0,
                    explanation: "Turnover = Annual Sales ÷ Average Inventory = ₹30,000 ÷ ₹10,000 = 3"
                },
                {
                    title: "Cash Flow",
                    question: "Cash flow is money moving in and out. If you have ₹5,000 cash, receive ₹3,000, and spend ₹2,000, what's your ending cash?",
                    options: ["₹6,000", "₹5,000", "₹7,000", "₹4,000"],
                    correct: 0,
                    explanation: "Ending Cash = Starting Cash + Inflows - Outflows = ₹5,000 + ₹3,000 - ₹2,000 = ₹6,000"
                }
            ],
            advanced: [
                {
                    title: "Burn Rate",
                    question: "Burn rate is how fast you spend money. If you have ₹100,000 and spend ₹10,000 monthly, how many months until you run out?",
                    options: ["10", "8", "12", "15"],
                    correct: 0,
                    explanation: "Runway = Cash ÷ Monthly Burn = ₹100,000 ÷ ₹10,000 = 10 months"
                },
                {
                    title: "Valuation Methods",
                    question: "A tech startup has ₹1M revenue and 5x revenue multiple. What's the company valuation?",
                    options: ["₹5M", "₹1M", "₹10M", "₹2M"],
                    correct: 0,
                    explanation: "Valuation = Revenue × Multiple = ₹1M × 5 = ₹5M"
                },
                {
                    title: "Unit Economics",
                    question: "If your product costs ₹20 to make, sells for ₹50, and you spend ₹10 to acquire each customer, what's your unit profit?",
                    options: ["₹20", "₹30", "₹10", "₹40"],
                    correct: 0,
                    explanation: "Unit Profit = Price - Cost - CAC = ₹50 - ₹20 - ₹10 = ₹20"
                },
                {
                    title: "Growth Metrics",
                    question: "If you had 100 customers last month and 120 this month, what's your growth rate?",
                    options: ["20%", "15%", "25%", "30%"],
                    correct: 0,
                    explanation: "Growth Rate = ((New - Old) ÷ Old) × 100 = ((120 - 100) ÷ 100) × 100 = 20%"
                },
                {
                    title: "ROI Calculation",
                    question: "If you invest ₹10,000 in marketing and generate ₹15,000 in sales, what's your ROI?",
                    options: ["50%", "40%", "60%", "30%"],
                    correct: 0,
                    explanation: "ROI = ((Gain - Investment) ÷ Investment) × 100 = ((₹15,000 - ₹10,000) ÷ ₹10,000) × 100 = 50%"
                }
            ]
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
        
        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            this.showLessonScreen();
        });
    }
    
    loadUserData() {
        const savedData = localStorage.getItem('businessAcademyData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.streak = data.streak || 0;
            this.gems = data.gems || 0;
            this.currentDifficulty = data.difficulty || null;
            this.currentLesson = data.lesson || 0;
        }
        this.updateUI();
    }
    
    saveUserData() {
        const data = {
            streak: this.streak,
            gems: this.gems,
            difficulty: this.currentDifficulty,
            lesson: this.currentLesson
        };
        localStorage.setItem('businessAcademyData', JSON.stringify(data));
    }
    
    updateUI() {
        document.getElementById('streak-count').textContent = this.streak;
        document.getElementById('gem-count').textContent = this.gems;
    }
    
    showWelcomeScreen() {
        document.getElementById('welcome-screen').classList.remove('hidden');
        document.getElementById('lesson-screen').classList.add('hidden');
        document.getElementById('lesson-content-screen').classList.add('hidden');
    }
    
    selectDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        this.currentLesson = 0;
        this.showLessonScreen();
        this.saveUserData();
    }
    
    showLessonScreen() {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('lesson-screen').classList.remove('hidden');
        document.getElementById('lesson-content-screen').classList.add('hidden');
        
        this.renderLessonGrid();
    }
    
    renderLessonGrid() {
        const lessonGrid = document.getElementById('lesson-grid');
        const lessonTitle = document.getElementById('lesson-title');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        // Set title based on difficulty
        const titles = {
            beginner: "Lemonade Stand Basics",
            intermediate: "Coffee Shop Growth",
            advanced: "Tech Startup Mastery"
        };
        
        lessonTitle.textContent = titles[this.currentDifficulty];
        
        // Calculate progress
        const progress = (this.currentLesson / this.totalLessons) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Complete`;
        
        // Generate lesson items
        lessonGrid.innerHTML = '';
        for (let i = 0; i < this.totalLessons; i++) {
            const lessonItem = document.createElement('div');
            lessonItem.className = 'lesson-item';
            lessonItem.textContent = i + 1;
            
            if (i < this.currentLesson) {
                lessonItem.classList.add('completed');
            } else if (i === this.currentLesson) {
                lessonItem.classList.add('current');
            } else {
                lessonItem.classList.add('locked');
            }
            
            if (i <= this.currentLesson) {
                lessonItem.addEventListener('click', () => {
                    this.startLesson(i);
                });
            }
            
            lessonGrid.appendChild(lessonItem);
        }
    }
    
    startLesson(lessonIndex) {
        this.currentLesson = lessonIndex;
        this.showLessonContent();
    }
    
    showLessonContent() {
        document.getElementById('lesson-screen').classList.add('hidden');
        document.getElementById('lesson-content-screen').classList.remove('hidden');
        
        const lesson = this.lessons[this.currentDifficulty][this.currentLesson];
        this.renderLessonContent(lesson);
    }
    
    renderLessonContent(lesson) {
        const lessonContent = document.getElementById('lesson-content');
        const currentLessonSpan = document.getElementById('current-lesson');
        const totalLessonsSpan = document.getElementById('total-lessons');
        
        currentLessonSpan.textContent = this.currentLesson + 1;
        totalLessonsSpan.textContent = this.totalLessons;
        
        lessonContent.innerHTML = `
            <div class="question-card">
                <h3 class="question-title">${lesson.title}</h3>
                <p class="question-text">${lesson.question}</p>
                <div class="options-grid" id="options-grid">
                    ${lesson.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
                <button class="continue-btn hidden" id="continue-btn">Continue</button>
                <div class="explanation hidden" id="explanation">
                    <p><strong>Explanation:</strong> ${lesson.explanation}</p>
                </div>
            </div>
        `;
        
        this.setupLessonEventListeners(lesson);
    }
    
    setupLessonEventListeners(lesson) {
        const options = document.querySelectorAll('.option-btn');
        const continueBtn = document.getElementById('continue-btn');
        const explanation = document.getElementById('explanation');
        
        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                this.selectAnswer(index, lesson, options, continueBtn, explanation);
            });
        });
        
        continueBtn.addEventListener('click', () => {
            this.completeLesson();
        });
    }
    
    selectAnswer(selectedIndex, lesson, options, continueBtn, explanation) {
        // Disable all options
        options.forEach(option => {
            option.disabled = true;
            option.style.cursor = 'not-allowed';
        });
        
        // Mark correct and incorrect answers
        options.forEach((option, index) => {
            if (index === lesson.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== lesson.correct) {
                option.classList.add('incorrect');
            }
        });
        
        // Show explanation and continue button
        explanation.classList.remove('hidden');
        continueBtn.classList.remove('hidden');
        
        // Award points
        if (selectedIndex === lesson.correct) {
            this.gems += 10;
            this.streak++;
        } else {
            this.streak = 0;
        }
        
        this.updateUI();
        this.saveUserData();
    }
    
    completeLesson() {
        this.currentLesson++;
        
        if (this.currentLesson >= this.totalLessons) {
            // All lessons completed
            this.showCompletionScreen();
        } else {
            this.showLessonScreen();
        }
    }
    
    showCompletionScreen() {
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.innerHTML = `
            <div class="question-card">
                <h3 class="question-title">🎉 Congratulations!</h3>
                <p class="question-text">You've completed all lessons in ${this.currentDifficulty} mode!</p>
                <div style="margin: 32px 0;">
                    <p><strong>Total Gems Earned:</strong> ${this.gems}</p>
                    <p><strong>Current Streak:</strong> ${this.streak} days</p>
                </div>
                <button class="continue-btn" onclick="location.reload()">Start Over</button>
            </div>
        `;
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
                // Show leaderboard
                break;
            case 'profile':
                // Show profile
                break;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BusinessAcademy();
});
