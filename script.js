document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const weddingMusic = document.getElementById("wedding-music");
    const musicToggle = document.getElementById("music-toggle");
    const iconPlay = document.getElementById("icon-play");
    const iconPause = document.getElementById("icon-pause");

    // --- Memory variable to track if the user hit pause intentionally ---
    let userManuallyPaused = false;

    // --- Keeps icons in sync with actual audio state ---
    weddingMusic.addEventListener('play', () => {
        iconPlay.style.display = "none";
        iconPause.style.display = "block";
    });

    weddingMusic.addEventListener('pause', () => {
        iconPause.style.display = "none";
        iconPlay.style.display = "block";
    });

    // --- Button Click Action ---
    musicToggle.addEventListener('click', () => {
        if (weddingMusic.paused) {
            weddingMusic.play();
            userManuallyPaused = false; // User wants to hear it again
        } else {
            weddingMusic.pause();
            userManuallyPaused = true; // User intentionally stopped it
        }
    });

    // --- Pauses music if guest switches to another app ---
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            weddingMusic.pause();
        } else {
            // Only auto-play if they have opened the invite AND they didn't mute it manually
            if (splashScreen.style.display === 'none' && !userManuallyPaused) {
                weddingMusic.play().catch(error => console.log("Could not auto-resume"));
            }
        }
    });

    // --- Function to handle opening the invitation ---
    function openInvitation() {
        // Play the romantic music immediately
        weddingMusic.play().catch(error => {
            console.log("Audio couldn't play automatically:", error);
        });

        // Fade out splash screen
        splashScreen.style.opacity = '0';
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            musicToggle.style.display = 'flex'; 
            
            void mainContent.offsetWidth; // Trigger reflow
            mainContent.style.opacity = '1';
        }, 1000);
    }

    // --- Single Tap & Bubble Effect ---
    splashScreen.addEventListener("click", function handleTap(e) {
        // 1. Create the expanding bubble element
        const bubble = document.createElement("div");
        bubble.classList.add("tap-bubble");

        // Set its starting size and center it precisely where the user tapped
        const size = 50;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${e.clientX - (size / 2)}px`;
        bubble.style.top = `${e.clientY - (size / 2)}px`;

        // Add the bubble to the splash screen
        document.body.appendChild(bubble);

        // 2. Open the invitation immediately (This unlocks audio safely!)
        openInvitation();

        // Remove the event listener so they can't spam tap it while it's fading
        splashScreen.removeEventListener("click", handleTap);

        // Clean up the bubble HTML element after it finishes expanding
        setTimeout(() => {
            bubble.remove();
        }, 800);
    });

    // --- Countdown Timer Logic ---
    const countDownDate = new Date("Jul 31, 2026 00:00:00").getTime();
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown-timer").style.display = "none";
            document.getElementById("countdown-expired").style.display = "block";
        }
    }, 1000);
});