// Duolingo Clone - Complete Spanish Learning Experience
class DuolingoApp {
    constructor() {
        this.userState = {
            hearts: 5,
            gems: 0,
            streak: 0,
            dailyXP: 0,
            dailyGoal: 10,
            currentLesson: 0,
            completedLessons: [],
            level: 1,
            totalXP: 0
        };
        
        this.lessons = [
            {
                id: 1,
                title: "Hello",
                xp: 10,
                type: "basics",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "Translate to Spanish: Hello",
                        options: ["Hola", "Adiós", "Gracias", "Por favor"],
                        correct: 0,
                        explanation: "Hello in Spanish is 'Hola'"
                    },
                    {
                        type: "multiple_choice",
                        question: "What does 'Hola' mean?",
                        options: ["Goodbye", "Hello", "Thank you", "Please"],
                        correct: 1,
                        explanation: "'Hola' means Hello"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Good morning",
                        answer: "Buenos días",
                        explanation: "Good morning in Spanish is 'Buenos días'"
                    }
                ]
            },
            {
                id: 2,
                title: "Goodbye",
                xp: 10,
                type: "basics",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "Translate to Spanish: Goodbye",
                        options: ["Hola", "Adiós", "Gracias", "Buenos días"],
                        correct: 1,
                        explanation: "Goodbye in Spanish is 'Adiós'"
                    },
                    {
                        type: "multiple_choice",
                        question: "What does 'Adiós' mean?",
                        options: ["Hello", "Goodbye", "Thank you", "Good morning"],
                        correct: 1,
                        explanation: "'Adiós' means Goodbye"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: See you later",
                        answer: "Hasta luego",
                        explanation: "See you later in Spanish is 'Hasta luego'"
                    }
                ]
            },
            {
                id: 3,
                title: "Thank you",
                xp: 10,
                type: "basics",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "Translate to Spanish: Thank you",
                        options: ["Por favor", "Gracias", "De nada", "Lo siento"],
                        correct: 1,
                        explanation: "Thank you in Spanish is 'Gracias'"
                    },
                    {
                        type: "multiple_choice",
                        question: "What does 'Gracias' mean?",
                        options: ["Please", "Thank you", "You're welcome", "Sorry"],
                        correct: 1,
                        explanation: "'Gracias' means Thank you"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: You're welcome",
                        answer: "De nada",
                        explanation: "You're welcome in Spanish is 'De nada'"
                    }
                ]
            },
            {
                id: 4,
                title: "Please",
                xp: 10,
                type: "basics",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "Translate to Spanish: Please",
                        options: ["Gracias", "Por favor", "De nada", "Lo siento"],
                        correct: 1,
                        explanation: "Please in Spanish is 'Por favor'"
                    },
                    {
                        type: "multiple_choice",
                        question: "What does 'Por favor' mean?",
                        options: ["Thank you", "Please", "You're welcome", "Sorry"],
                        correct: 1,
                        explanation: "'Por favor' means Please"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Excuse me",
                        answer: "Perdón",
                        explanation: "Excuse me in Spanish is 'Perdón'"
                    }
                ]
            },
            {
                id: 5,
                title: "Sorry",
                xp: 10,
                type: "basics",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "Translate to Spanish: Sorry",
                        options: ["Perdón", "Lo siento", "Disculpe", "All of the above"],
                        correct: 3,
                        explanation: "Sorry can be 'Perdón', 'Lo siento', or 'Disculpe'"
                    },
                    {
                        type: "multiple_choice",
                        question: "What does 'Lo siento' mean?",
                        options: ["Excuse me", "I'm sorry", "Thank you", "Please"],
                        correct: 1,
                        explanation: "'Lo siento' means I'm sorry"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: I'm sorry",
                        answer: "Lo siento",
                        explanation: "I'm sorry in Spanish is 'Lo siento'"
                    }
                ]
            },
            {
                id: 6,
                title: "Numbers 1-5",
                xp: 10,
                type: "numbers",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'uno' in English?",
                        options: ["Two", "One", "Three", "Four"],
                        correct: 1,
                        explanation: "'Uno' means One"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'tres' in English?",
                        options: ["Two", "Three", "Four", "Five"],
                        correct: 1,
                        explanation: "'Tres' means Three"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Five",
                        answer: "Cinco",
                        explanation: "Five in Spanish is 'Cinco'"
                    }
                ]
            },
            {
                id: 7,
                title: "Numbers 6-10",
                xp: 10,
                type: "numbers",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'seis' in English?",
                        options: ["Five", "Six", "Seven", "Eight"],
                        correct: 1,
                        explanation: "'Seis' means Six"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'diez' in English?",
                        options: ["Eight", "Nine", "Ten", "Eleven"],
                        correct: 2,
                        explanation: "'Diez' means Ten"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Eight",
                        answer: "Ocho",
                        explanation: "Eight in Spanish is 'Ocho'"
                    }
                ]
            },
            {
                id: 8,
                title: "Colors",
                xp: 10,
                type: "colors",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'rojo' in English?",
                        options: ["Blue", "Red", "Green", "Yellow"],
                        correct: 1,
                        explanation: "'Rojo' means Red"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'azul' in English?",
                        options: ["Red", "Blue", "Green", "Yellow"],
                        correct: 1,
                        explanation: "'Azul' means Blue"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Green",
                        answer: "Verde",
                        explanation: "Green in Spanish is 'Verde'"
                    }
                ]
            },
            {
                id: 9,
                title: "Family",
                xp: 10,
                type: "family",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'madre' in English?",
                        options: ["Father", "Mother", "Sister", "Brother"],
                        correct: 1,
                        explanation: "'Madre' means Mother"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'padre' in English?",
                        options: ["Mother", "Father", "Sister", "Brother"],
                        correct: 1,
                        explanation: "'Padre' means Father"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Sister",
                        answer: "Hermana",
                        explanation: "Sister in Spanish is 'Hermana'"
                    }
                ]
            },
            {
                id: 10,
                title: "Food",
                xp: 10,
                type: "food",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'pan' in English?",
                        options: ["Water", "Bread", "Milk", "Cheese"],
                        correct: 1,
                        explanation: "'Pan' means Bread"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'agua' in English?",
                        options: ["Bread", "Water", "Milk", "Cheese"],
                        correct: 1,
                        explanation: "'Agua' means Water"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Milk",
                        answer: "Leche",
                        explanation: "Milk in Spanish is 'Leche'"
                    }
                ]
            },
            {
                id: 11,
                title: "Animals",
                xp: 10,
                type: "animals",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'perro' in English?",
                        options: ["Cat", "Dog", "Bird", "Fish"],
                        correct: 1,
                        explanation: "'Perro' means Dog"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'gato' in English?",
                        options: ["Dog", "Cat", "Bird", "Fish"],
                        correct: 1,
                        explanation: "'Gato' means Cat"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Bird",
                        answer: "Pájaro",
                        explanation: "Bird in Spanish is 'Pájaro'"
                    }
                ]
            },
            {
                id: 12,
                title: "Time",
                xp: 10,
                type: "time",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'mañana' in English?",
                        options: ["Today", "Tomorrow", "Yesterday", "Tonight"],
                        correct: 1,
                        explanation: "'Mañana' means Tomorrow"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'hoy' in English?",
                        options: ["Tomorrow", "Today", "Yesterday", "Tonight"],
                        correct: 1,
                        explanation: "'Hoy' means Today"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Yesterday",
                        answer: "Ayer",
                        explanation: "Yesterday in Spanish is 'Ayer'"
                    }
                ]
            },
            {
                id: 13,
                title: "Weather",
                xp: 10,
                type: "weather",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'sol' in English?",
                        options: ["Rain", "Sun", "Cloud", "Wind"],
                        correct: 1,
                        explanation: "'Sol' means Sun"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'lluvia' in English?",
                        options: ["Sun", "Rain", "Cloud", "Wind"],
                        correct: 1,
                        explanation: "'Lluvia' means Rain"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Cloud",
                        answer: "Nube",
                        explanation: "Cloud in Spanish is 'Nube'"
                    }
                ]
            },
            {
                id: 14,
                title: "Clothes",
                xp: 10,
                type: "clothes",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'camisa' in English?",
                        options: ["Pants", "Shirt", "Dress", "Shoes"],
                        correct: 1,
                        explanation: "'Camisa' means Shirt"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'pantalones' in English?",
                        options: ["Shirt", "Pants", "Dress", "Shoes"],
                        correct: 1,
                        explanation: "'Pantalones' means Pants"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Shoes",
                        answer: "Zapatos",
                        explanation: "Shoes in Spanish is 'Zapatos'"
                    }
                ]
            },
            {
                id: 15,
                title: "House",
                xp: 10,
                type: "house",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'casa' in English?",
                        options: ["Room", "House", "Kitchen", "Bathroom"],
                        correct: 1,
                        explanation: "'Casa' means House"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'cocina' in English?",
                        options: ["House", "Kitchen", "Bathroom", "Room"],
                        correct: 1,
                        explanation: "'Cocina' means Kitchen"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Room",
                        answer: "Habitación",
                        explanation: "Room in Spanish is 'Habitación'"
                    }
                ]
            },
            {
                id: 16,
                title: "Body Parts",
                xp: 10,
                type: "body",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'cabeza' in English?",
                        options: ["Hand", "Head", "Foot", "Eye"],
                        correct: 1,
                        explanation: "'Cabeza' means Head"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'mano' in English?",
                        options: ["Head", "Hand", "Foot", "Eye"],
                        correct: 1,
                        explanation: "'Mano' means Hand"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Eye",
                        answer: "Ojo",
                        explanation: "Eye in Spanish is 'Ojo'"
                    }
                ]
            },
            {
                id: 17,
                title: "School",
                xp: 10,
                type: "school",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'escuela' in English?",
                        options: ["Book", "School", "Teacher", "Student"],
                        correct: 1,
                        explanation: "'Escuela' means School"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'libro' in English?",
                        options: ["School", "Book", "Teacher", "Student"],
                        correct: 1,
                        explanation: "'Libro' means Book"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Teacher",
                        answer: "Maestro",
                        explanation: "Teacher in Spanish is 'Maestro'"
                    }
                ]
            },
            {
                id: 18,
                title: "Work",
                xp: 10,
                type: "work",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'trabajo' in English?",
                        options: ["Office", "Work", "Meeting", "Job"],
                        correct: 1,
                        explanation: "'Trabajo' means Work"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'oficina' in English?",
                        options: ["Work", "Office", "Meeting", "Job"],
                        correct: 1,
                        explanation: "'Oficina' means Office"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Meeting",
                        answer: "Reunión",
                        explanation: "Meeting in Spanish is 'Reunión'"
                    }
                ]
            },
            {
                id: 19,
                title: "Travel",
                xp: 10,
                type: "travel",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'viaje' in English?",
                        options: ["Airport", "Trip", "Hotel", "Passport"],
                        correct: 1,
                        explanation: "'Viaje' means Trip"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'aeropuerto' in English?",
                        options: ["Trip", "Airport", "Hotel", "Passport"],
                        correct: 1,
                        explanation: "'Aeropuerto' means Airport"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Hotel",
                        answer: "Hotel",
                        explanation: "Hotel is the same in Spanish and English"
                    }
                ]
            },
            {
                id: 20,
                title: "Review",
                xp: 15,
                type: "review",
                exercises: [
                    {
                        type: "multiple_choice",
                        question: "What is 'gracias' in English?",
                        options: ["Please", "Thank you", "You're welcome", "Sorry"],
                        correct: 1,
                        explanation: "'Gracias' means Thank you"
                    },
                    {
                        type: "multiple_choice",
                        question: "What is 'cinco' in English?",
                        options: ["Four", "Five", "Six", "Seven"],
                        correct: 1,
                        explanation: "'Cinco' means Five"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Good morning",
                        answer: "Buenos días",
                        explanation: "Good morning in Spanish is 'Buenos días'"
                    },
                    {
                        type: "translation",
                        question: "Translate to Spanish: Red",
                        answer: "Rojo",
                        explanation: "Red in Spanish is 'Rojo'"
                    }
                ]
            }
        ];
        
        this.currentExercise = 0;
        this.currentLessonData = null;
        this.exerciseScore = 0;
        this.isExerciseComplete = false;
        
        this.init();
    }
    
    init() {
        this.loadUserState();
        this.setupEventListeners();
        this.renderHomeScreen();
        this.updateUI();
    }
    
    setupEventListeners() {
        // Home screen
        document.getElementById('back-to-home').addEventListener('click', () => this.showHomeScreen());
        document.getElementById('continue-btn').addEventListener('click', () => this.continueToNextLesson());
        document.getElementById('practice-btn').addEventListener('click', () => this.practiceLesson());
        
        // Modal
        document.getElementById('modal-close').addEventListener('click', () => this.hideModal());
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideModal();
            }
        });
        
        // Check button
        document.getElementById('check-btn').addEventListener('click', () => this.checkAnswer());
    }
    
    loadUserState() {
        const savedState = localStorage.getItem('duolingoUserState');
        if (savedState) {
            this.userState = { ...this.userState, ...JSON.parse(savedState) };
        }
    }
    
    saveUserState() {
        localStorage.setItem('duolingoUserState', JSON.stringify(this.userState));
    }
    
    renderHomeScreen() {
        const homeScreen = document.getElementById('home-screen');
        const lessonScreen = document.getElementById('lesson-screen');
        const resultsScreen = document.getElementById('results-screen');
        
        homeScreen.classList.remove('hidden');
        lessonScreen.classList.add('hidden');
        resultsScreen.classList.add('hidden');
        
        this.renderLessons();
    }
    
    renderLessons() {
        const lessonsGrid = document.getElementById('lessons-grid');
        lessonsGrid.innerHTML = '';
        
        this.lessons.forEach((lesson, index) => {
            const lessonCard = document.createElement('div');
            lessonCard.className = 'lesson-card';
            
            if (this.userState.completedLessons.includes(lesson.id)) {
                lessonCard.classList.add('completed');
            } else if (index === this.userState.currentLesson) {
                lessonCard.classList.add('current');
            } else if (index > this.userState.currentLesson) {
                lessonCard.classList.add('locked');
            }
            
            lessonCard.innerHTML = `
                <div class="lesson-number">${lesson.id}</div>
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-xp">${lesson.xp} XP</div>
                ${this.userState.completedLessons.includes(lesson.id) ? '<div class="lesson-icon">✓</div>' : ''}
            `;
            
            if (index <= this.userState.currentLesson) {
                lessonCard.addEventListener('click', () => this.startLesson(lesson));
            }
            
            lessonsGrid.appendChild(lessonCard);
        });
    }
    
    startLesson(lesson) {
        this.currentLessonData = lesson;
        this.currentExercise = 0;
        this.exerciseScore = 0;
        this.isExerciseComplete = false;
        
        document.getElementById('home-screen').classList.add('hidden');
        document.getElementById('lesson-screen').classList.remove('hidden');
        
        this.renderExercise();
        this.updateUI();
    }
    
    renderExercise() {
        const exercise = this.currentLessonData.exercises[this.currentExercise];
        const exerciseContainer = document.getElementById('exercise-container');
        const checkBtn = document.getElementById('check-btn');
        
        // Update progress dots
        this.updateProgressDots();
        
        // Clear previous exercise
        exerciseContainer.innerHTML = '';
        checkBtn.disabled = true;
        checkBtn.textContent = 'Check';
        
        // Create exercise title
        const title = document.createElement('div');
        title.className = 'exercise-title';
        title.textContent = `${this.currentLessonData.title} - Exercise ${this.currentExercise + 1}`;
        exerciseContainer.appendChild(title);
        
        // Create question
        const question = document.createElement('div');
        question.className = 'exercise-question';
        question.textContent = exercise.question;
        exerciseContainer.appendChild(question);
        
        // Create exercise content based on type
        if (exercise.type === 'multiple_choice') {
            this.renderMultipleChoice(exercise, exerciseContainer);
        } else if (exercise.type === 'translation') {
            this.renderTranslation(exercise, exerciseContainer);
        }
    }
    
    renderMultipleChoice(exercise, container) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'exercise-options';
        
        exercise.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = option;
            optionBtn.dataset.index = index;
            
            optionBtn.addEventListener('click', () => this.selectOption(optionBtn, index));
            
            optionsContainer.appendChild(optionBtn);
        });
        
        container.appendChild(optionsContainer);
    }
    
    renderTranslation(exercise, container) {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'exercise-input-container';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'exercise-input';
        input.placeholder = 'Type your answer here...';
        input.addEventListener('input', () => this.handleTranslationInput(input));
        
        inputContainer.appendChild(input);
        container.appendChild(inputContainer);
    }
    
    selectOption(button, index) {
        // Remove previous selection
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select current option
        button.classList.add('selected');
        button.dataset.selected = 'true';
        
        // Enable check button
        document.getElementById('check-btn').disabled = false;
    }
    
    handleTranslationInput(input) {
        // Enable check button if input has content
        document.getElementById('check-btn').disabled = input.value.trim() === '';
    }
    
    checkAnswer() {
        const exercise = this.currentLessonData.exercises[this.currentExercise];
        let isCorrect = false;
        
        if (exercise.type === 'multiple_choice') {
            const selectedBtn = document.querySelector('.option-btn.selected');
            if (selectedBtn) {
                const selectedIndex = parseInt(selectedBtn.dataset.index);
                isCorrect = selectedIndex === exercise.correct;
                
                // Show correct/incorrect styling
                document.querySelectorAll('.option-btn').forEach((btn, index) => {
                    if (index === exercise.correct) {
                        btn.classList.add('correct');
                    } else if (btn.classList.contains('selected') && !isCorrect) {
                        btn.classList.add('incorrect');
                    }
                });
            }
        } else if (exercise.type === 'translation') {
            const input = document.querySelector('.exercise-input');
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = exercise.answer.toLowerCase();
            
            isCorrect = userAnswer === correctAnswer;
            
            if (isCorrect) {
                input.classList.add('correct');
            } else {
                input.classList.add('incorrect');
            }
        }
        
        // Update score
        if (isCorrect) {
            this.exerciseScore++;
            this.showCorrectAnimation();
        } else {
            this.showWrongAnimation();
            this.userState.hearts = Math.max(0, this.userState.hearts - 1);
        }
        
        // Disable check button and show next button
        const checkBtn = document.getElementById('check-btn');
        checkBtn.disabled = true;
        checkBtn.textContent = 'Next';
        checkBtn.onclick = () => this.nextExercise();
        
        // Show explanation after a delay
        setTimeout(() => {
            this.showExplanation(exercise.explanation);
        }, 1000);
    }
    
    nextExercise() {
        this.currentExercise++;
        
        if (this.currentExercise < this.currentLessonData.exercises.length) {
            this.renderExercise();
        } else {
            this.completeLesson();
        }
    }
    
    completeLesson() {
        // Calculate XP earned
        const xpEarned = Math.floor((this.exerciseScore / this.currentLessonData.exercises.length) * this.currentLessonData.xp);
        
        // Update user state
        this.userState.dailyXP += xpEarned;
        this.userState.totalXP += xpEarned;
        this.userState.gems += Math.floor(xpEarned / 5);
        
        if (!this.userState.completedLessons.includes(this.currentLessonData.id)) {
            this.userState.completedLessons.push(this.currentLessonData.id);
            this.userState.currentLesson = Math.min(this.userState.currentLesson + 1, this.lessons.length - 1);
        }
        
        // Update streak
        this.userState.streak++;
        
        // Save state
        this.saveUserState();
        
        // Show results screen
        this.showResultsScreen(xpEarned);
    }
    
    showResultsScreen(xpEarned) {
        document.getElementById('lesson-screen').classList.add('hidden');
        document.getElementById('results-screen').classList.remove('hidden');
        
        // Update results display
        document.getElementById('earned-xp').textContent = xpEarned;
        document.getElementById('streak-days').textContent = this.userState.streak;
        document.getElementById('earned-gems').textContent = Math.floor(xpEarned / 5);
        
        this.updateUI();
    }
    
    continueToNextLesson() {
        this.showHomeScreen();
    }
    
    practiceLesson() {
        // Reset exercise for practice
        this.currentExercise = 0;
        this.exerciseScore = 0;
        this.isExerciseComplete = false;
        
        document.getElementById('results-screen').classList.add('hidden');
        document.getElementById('lesson-screen').classList.remove('hidden');
        
        this.renderExercise();
    }
    
    showHomeScreen() {
        document.getElementById('lesson-screen').classList.add('hidden');
        document.getElementById('results-screen').classList.add('hidden');
        document.getElementById('home-screen').classList.remove('hidden');
        
        this.renderLessons();
        this.updateUI();
    }
    
    updateProgressDots() {
        const progressDots = document.getElementById('progress-dots');
        progressDots.innerHTML = '';
        
        for (let i = 0; i < this.currentLessonData.exercises.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            
            if (i < this.currentExercise) {
                dot.classList.add('completed');
            } else if (i === this.currentExercise) {
                dot.classList.add('current');
            }
            
            progressDots.appendChild(dot);
        }
    }
    
    showCorrectAnimation() {
        const animation = document.getElementById('correct-animation');
        animation.classList.remove('hidden');
        
        setTimeout(() => {
            animation.classList.add('hidden');
        }, 1500);
    }
    
    showWrongAnimation() {
        const animation = document.getElementById('wrong-animation');
        animation.classList.remove('hidden');
        
        setTimeout(() => {
            animation.classList.add('hidden');
        }, 1500);
    }
    
    showExplanation(explanation) {
        const modal = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        modalTitle.textContent = 'Explanation';
        modalBody.innerHTML = `<p>${explanation}</p>`;
        
        modal.classList.remove('hidden');
    }
    
    hideModal() {
        document.getElementById('modal-overlay').classList.add('hidden');
    }
    
    updateUI() {
        // Update header stats
        document.getElementById('hearts').textContent = this.userState.hearts;
        document.getElementById('gems').textContent = this.userState.gems;
        document.getElementById('streak').textContent = this.userState.streak;
        
        // Update daily progress
        const progressFill = document.getElementById('daily-progress');
        const progressText = document.querySelector('.progress-text');
        const progressPercentage = Math.min((this.userState.dailyXP / this.userState.dailyGoal) * 100, 100);
        
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${this.userState.dailyXP} / ${this.userState.dailyGoal} XP`;
        
        // Update lesson stats
        document.getElementById('lesson-hearts').textContent = this.userState.hearts;
        document.getElementById('lesson-gems').textContent = this.userState.gems;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DuolingoApp();
});
