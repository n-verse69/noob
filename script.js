// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startBtn = document.getElementById('start-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const restartBtn = document.getElementById('restart-btn');
    const responseText = document.getElementById('response-text');
    
    // Screens
    const introScreen = document.getElementById('intro-screen');
    const questionScreen = document.getElementById('question-screen');
    const yesScreen = document.getElementById('yes-screen');
    
    // Containers
    const heartsContainer = document.querySelector('.hearts-container');
    const confettiContainer = document.querySelector('.confetti-container');
    
    // State variables
    let noClickCount = 0;
    let isNoButtonMoving = false;
    let noButtonMoveInterval;
    let hasShownStickers = false;
    
    // Initialize the page
    initPage();
    
    // Event Listeners
    startBtn.addEventListener('click', showQuestionScreen);
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);
    restartBtn.addEventListener('click', restartExperience);
    
    // Initialize page with background hearts and intro screen
    function initPage() {
        createBackgroundHearts();
        introScreen.classList.add('active');
    }
    
    // Create floating background hearts
    function createBackgroundHearts() {
        const heartEmojis = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💖', '💗', '💓', '💞', '💕'];
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-bg');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            // Random position
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = 15 + Math.random() * 30;
            heart.style.fontSize = `${size}px`;
            
            // Random animation delay and duration
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heart.style.animationDuration = `${5 + Math.random() * 10}s`;
            
            heartsContainer.appendChild(heart);
        }
    }
    
    // Show the main question screen
    function showQuestionScreen() {
        introScreen.classList.remove('active');
        questionScreen.classList.add('active');
        
        // Reset state
        resetNoButton();
        responseText.textContent = "Choose wisely bbg... 😼";
    }
    
    // Handle YES button click
    function handleYesClick() {
        // Create heart burst effect
        createHeartBurst();
        
        // Create confetti
        createConfetti();

        // Show stickers only on first YES click
if (!hasShownStickers) {
    createStickers();
    hasShownStickers = true;
}
        // Show celebration screen after a short delay
        setTimeout(() => {
            questionScreen.classList.remove('active');
            yesScreen.classList.add('active');
            
            // Scroll to top of yes screen
            yesScreen.scrollIntoView({ behavior: 'smooth' });
        }, 800);
        
        // Update response text before transition
        const responses = [
            "Yay! I knew it! 😼❤️",
            "Ayo fr?? You're not lying right? 😂",
            "Even White Coat Man approves! (maybe) 😾",
            "bbg energy confirmed! ✌️",
            "Hatt?? For real for real? 🥀"
        ];
        responseText.textContent = responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Handle NO button click
    function handleNoClick() {
        noClickCount++;
        
        // Different responses based on click count
        const sadResponses = [
            "Hatt?? Think again 😾",
            "You can't do this to me 😔",
            "Hurr?? But why?? 😭",
            "Blehh... that's harsh hazzyyy 🥀",
            "Cyaa... you're breaking my heart 💔",
            "Gay?? Proud gay?? 🤣 Just kidding... but srsly 😾"
        ];
        
        const randomResponse = sadResponses[Math.floor(Math.random() * sadResponses.length)];
        responseText.textContent = randomResponse;
        
        // Make button move after first click
        if (noClickCount === 1) {
            // Add moving class
            noBtn.classList.add('moving');
            
            // Start moving the button after a short delay
            setTimeout(() => {
                isNoButtonMoving = true;
                startNoButtonMovement();
            }, 500);
        }
    }
    
    // Start moving the NO button randomly
    function startNoButtonMovement() {
        const container = document.querySelector('.buttons-container');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();
        
        // Set button to position absolute for movement
        noBtn.style.position = 'absolute';
        
        // Move button randomly within container
        noButtonMoveInterval = setInterval(() => {
            if (!isNoButtonMoving) return;
            
            const maxX = containerRect.width - buttonRect.width;
            const maxY = containerRect.height - buttonRect.height;
            
            // Generate random position within container
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            // Apply new position with smooth transition
            noBtn.style.transition = 'all 0.5s ease';
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
            
            // Occasionally change button text
            if (Math.random() > 0.7) {
                const noTexts = ["❌ NO", "😾 NO", "🥀 NO", "😭 NO", "😂 NO"];
                noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];
            }
        }, 600); // Move every 600ms
    }
    
    // Reset NO button to initial state
    function resetNoButton() {
        noClickCount = 0;
        isNoButtonMoving = false;
        
        // Clear movement interval
        if (noButtonMoveInterval) {
            clearInterval(noButtonMoveInterval);
        }
        
        // Reset button styles
        noBtn.classList.remove('moving');
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.textContent = '❌ NO';
        noBtn.style.transition = '';
    }
    
    // Create heart burst animation
    function createHeartBurst() {
        const heartBurst = document.querySelector('.heart-burst');
        heartBurst.style.animation = 'none';
        
        // Trigger reflow to restart animation
        void heartBurst.offsetWidth;
        
        heartBurst.style.animation = 'heartbeat 0.5s 3';
    }
    
    // Create confetti animation
    function createConfetti() {
        // Show confetti container
        confettiContainer.style.display = 'block';
        
        // Create confetti pieces
        const colors = ['#ff6b6b', '#ff8e8e', '#ffb6d9', '#ff85c0', '#ff4757'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random color
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random position
            confetti.style.left = `${Math.random() * 100}%`;
            
            // Random size
            const size = 5 + Math.random() * 10;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Random rotation
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            confettiContainer.appendChild(confetti);
            
            // Animate confetti falling
            animateConfetti(confetti);
        }
        
        // Hide confetti after animation
        setTimeout(() => {
            confettiContainer.style.display = 'none';
            // Remove all confetti elements
            while (confettiContainer.firstChild) {
                confettiContainer.removeChild(confettiContainer.firstChild);
            }
        }, 3000);
    }
    
    // Animate individual confetti piece
    function animateConfetti(confetti) {
        // Random animation values
        const duration = 2 + Math.random() * 2;
        const delay = Math.random() * 1;
        
        // Set initial position (above viewport)
        confetti.style.top = '-20px';
        confetti.style.opacity = '1';
        
        // Apply animation
        confetti.style.transition = `all ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1) ${delay}s`;
        
        // Trigger animation
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.opacity = '0';
            confetti.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
        }, 10);
    }
    
    // Restart the experience
    function restartExperience() {
        yesScreen.classList.remove('active');
        introScreen.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Add interactive rating stars
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            // Fill all stars up to the clicked one
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.style.color = 'gold';
                    s.style.textShadow = '0 0 10px gold';
                } else {
                    s.style.color = '';
                    s.style.textShadow = '';
                }
            });
            
            // Show funny message based on rating
            const messages = [
                "Only {count}? Hatt?? 😾",
                "{count} stars? Blehh... 🥀",
                "{count}? Cyaa... you're harsh hazzyyy 😭",
                "{count} stars? I'll take it! 😼",
                "All {count}! Yesss! bbg energy! ✌️"
            ];
            
            const selectedMessage = messages[index];
            const ratingNote = document.querySelector('.rating-note');
            
            // Update the message after a delay
            setTimeout(() => {
                const originalText = ratingNote.textContent;
                ratingNote.textContent = selectedMessage.replace('{count}', index + 1);
                
                // Revert after 3 seconds
                setTimeout(() => {
                    ratingNote.textContent = originalText;
                }, 3000);
            }, 500);
        });
    });
    
    // Add some random text changes for dynamic feel
    setInterval(() => {
        if (questionScreen.classList.contains('active')) {
            const teasers = [
                "White Coat Man is watching... 👀",
                "Remember... gay proud gay 🤣",
                "bbg is waiting... 😼",
                "No pressure hazzyyy... 👀",
                "Just choose... it's not that deep 😂"
            ];
            
            // Only change if user hasn't interacted recently
            if (Date.now() - lastInteraction > 5000) {
                const randomTeaser = teasers[Math.floor(Math.random() * teasers.length)];
                document.querySelector('.tease-text').textContent = randomTeaser;
            }
        }
    }, 8000);
    
    let lastInteraction = Date.now();
    
    // Update last interaction time on any click
    document.addEventListener('click', () => {
        lastInteraction = Date.now();
    });

// Create sticker pop-up animation
function createStickers() {
    const stickersContainer = document.querySelector('.stickers-container');
    const stickerPaths = [
        'stickers/sticker1.png',
        'stickers/sticker2.png',
        'stickers/sticker3.png',
        'stickers/sticker4.png'
    ];
    
    stickerPaths.forEach((path, index) => {
        const sticker = document.createElement('div');
        sticker.classList.add('sticker');
        
        const img = document.createElement('img');
        img.src = path;
        img.alt = `Sticker ${index + 1}`;
        
        sticker.appendChild(img);
        
        // Alternate sides: left (even index) or right (odd index)
        const isLeft = index % 2 === 0;
        
        if (isLeft) {
    sticker.style.left = '10%';
    sticker.style.animation = `stickerPopFromLeft 5s ease-out forwards`;  // ← Changed
} else {
    sticker.style.right = '10%';
    sticker.style.animation = `stickerPopFromRight 5s ease-out forwards`;  // ← Changed
}
        
        // Vertical position with slight randomness
        const baseBottom = 20 + (index * 15);
        sticker.style.bottom = `${baseBottom}%`;
        
        // Stagger the animation start times
        sticker.style.animationDelay = `${index * 0.2}s`;
        
        stickersContainer.appendChild(sticker);
        
        // Remove sticker after animation completes
        setTimeout(() => {
    if (sticker && sticker.parentNode) {
        sticker.remove();
    }
}, 5000 + (index * 200));  // ← Changed to 5000
    });
}
// ============ ADD SECRET MODE CODE HERE ============

// Secret message to type out
const secretMessage = `Alright Noor, secret mode unlocked 😼

I joke a lot, but genuinely, you're someone who makes things feel easy. Talking to you never feels forced, and that's kinda rare these days.

This site, the jokes, the chaos, all just a dumb little way of saying "Yeah, you matter as a friend" ❤️

Okay done before this gets awkward 😂✌️`;

// Secret mode variables
let isSecretModeActive = false;
let shakeThreshold = 15; // Adjust sensitivity
let lastShakeTime = 0;
let minShakeInterval = 2000; // Minimum time between shakes (ms)

// Secret mode DOM elements
const secretScreen = document.getElementById('secret-screen');
const okayBtn = document.getElementById('okay-btn');
const typedText = document.getElementById('typed-text');

// Add event listener for OK button
if (okayBtn) {
    okayBtn.addEventListener('click', exitSecretMode);
}

// Shake detection function
function handleShake(event) {
    if (isSecretModeActive) return; // Don't trigger if already in secret mode
    
    const acceleration = event.accelerationIncludingGravity;
    const currentTime = new Date().getTime();
    
    // Calculate total acceleration
    const totalAcceleration = Math.sqrt(
        acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );
    
    // Check if it's a shake (above threshold and enough time since last shake)
    if (totalAcceleration > shakeThreshold && 
        (currentTime - lastShakeTime) > minShakeInterval) {
        
        lastShakeTime = currentTime;
        activateSecretMode();
    }
}

// Activate secret romantic mode
function activateSecretMode() {
    if (isSecretModeActive) return;
    
    isSecretModeActive = true;
    
    // Get current active screen
    const currentScreen = document.querySelector('.screen.active');
    
    // Create floating petals for romantic effect
    createRomanticPetals();
    
    // Hide current screen
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }
    
    // Show secret screen
    if (secretScreen) {
        secretScreen.classList.add('active');
    }
    
    // Start typing animation
    setTimeout(() => {
        typeSecretMessage();
    }, 1000);
}

// Create floating petals
function createRomanticPetals() {
    const secretScreenEl = document.getElementById('secret-screen');
    if (!secretScreenEl) return;
    
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize properties
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.animationDuration = `${10 + Math.random() * 10}s`;
        
        // Randomize color slightly
        const hue = Math.floor(Math.random() * 20) + 330; // Pink hue range
        petal.style.background = `hsla(${hue}, 80%, 70%, 0.7)`;
        
        // Random size
        const size = 10 + Math.random() * 15;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        secretScreenEl.appendChild(petal);
    }
}

// Type the secret message letter by letter
function typeSecretMessage() {
    if (!typedText) return;
    
    typedText.innerHTML = '';
    let i = 0;
    const typingSpeed = 40; // ms per character
    
    function typeChar() {
        if (i < secretMessage.length) {
            // Handle newlines
            if (secretMessage.charAt(i) === '\n') {
                typedText.innerHTML += '<br>';
            } else {
                typedText.innerHTML += secretMessage.charAt(i);
            }
            i++;
            
            // Scroll to keep text in view
            typedText.scrollTop = typedText.scrollHeight;
            
            // Random slight speed variation for natural feel
            const speedVariation = typingSpeed + (Math.random() * 20 - 10);
            setTimeout(typeChar, speedVariation);
        }
    }
    
    typeChar();
}

// Exit secret mode and return to previous screen
function exitSecretMode() {
    isSecretModeActive = false;
    
    // Clear petals
    const petals = document.querySelectorAll('.petal');
    petals.forEach(petal => {
        if (petal && petal.parentNode) {
            petal.remove();
        }
    });
    
    // Hide secret screen
    if (secretScreen) {
        secretScreen.classList.remove('active');
    }
    
    // Return to intro screen
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
        introScreen.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// For testing on desktop (without accelerometer)
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isSecretModeActive) {
        event.preventDefault();
        activateSecretMode();
    }
});

// Add shake event listener
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', handleShake);
} else {
    console.log("DeviceMotion not supported - using spacebar for testing");
}

// ============ END OF SECRET MODE CODE ============

// Your script should end with this (DON'T DELETE):
});
});
