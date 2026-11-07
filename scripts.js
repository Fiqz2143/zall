document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.getElementById("starsContainer");
    const createStars = () => {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.left = `${Math.random() * 100}vw`;
            const size = Math.random() * 3 + 1;
            star.style.width = star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${Math.random() * 4 + 4}s`;
            starsContainer.appendChild(star);
        }
    };
    createStars();

    let timeLeft = 2;
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const btnOpenGift = document.getElementById("btnOpenGift");
    const statusNote = document.querySelector(".status-note");

    const countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            secondsEl.textContent = "00";
            btnOpenGift.classList.remove("disabled");
            btnOpenGift.removeAttribute("disabled");
            btnOpenGift.innerHTML = "🎁 OPEN HER GIFT ✨";
            statusNote.textContent = "Hari ini adalah hari spesialnya! 🌸";
        } else {
            secondsEl.textContent = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;
            timeLeft--;
        }
    }, 1000);

    const bgMusic = document.getElementById("bgMusic");
    const birthdayVideo = document.getElementById("birthdayVideo");

    const switchScene = (currentId, nextId) => {
        document.getElementById(currentId).classList.remove("active");
        document.getElementById(nextId).classList.add("active");
    };

    btnOpenGift.addEventListener("click", () => {
        bgMusic.play().catch(e => console.log("Audio autoplay"));
        switchScene("scene1", "scene2");
    });

    document.getElementById("giftBox").addEventListener("click", () => {
        switchScene("scene2", "scene3");
    });

    document.getElementById("btnOurMemories").addEventListener("click", () => {
        switchScene("scene3", "scene4");
    });

    document.getElementById("btnWatchVideo").addEventListener("click", () => {
        switchScene("scene4", "scene5");
        bgMusic.pause(100);
        birthdayVideo.play(200);
    });

    document.getElementById("btnBirthdayWishes").addEventListener("click", () => {
        birthdayVideo.pause();
        bgMusic.play();
        switchScene("scene5", "scene6");
    });

    const endingText = document.getElementById("endingText");
    document.getElementById("btnOneMoreThing").addEventListener("click", () => {
        switchScene("scene6", "scene7");
        startEndingAnimation();
    });

    const startEndingAnimation = () => {
        const textSequence = [
            "HAPPY BIRTHDAY",
            "WITH ALL MY LOVE",
            "ALWAYS & FOREVER"
        ];
        let index = 0;

        const textInterval = setInterval(() => {
            if (index < textSequence.length) {
                endingText.style.opacity = 0;
                setTimeout(() => {
                    endingText.textContent = textSequence[index];
                    endingText.style.opacity = 1;
                    index++;
                }, 500);
            } else {
                clearInterval(textInterval);
            }
        }, 3000);
    };

    document.getElementById("btnReplay").addEventListener("click", () => {
        birthdayVideo.currentTime = 0;
        switchScene("scene7", "scene1");
        timeLeft = 2;
        secondsEl.textContent = "02";
        btnOpenGift.classList.add("disabled");
        btnOpenGift.setAttribute("disabled", "true");
        btnOpenGift.innerHTML = "🔒 TUNGGU SAMPAI WAKTUNYA";
        statusNote.textContent = "⏳ Beberapa detik lagi...";
    });
});