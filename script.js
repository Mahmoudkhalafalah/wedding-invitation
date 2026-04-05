document.addEventListener("DOMContentLoaded", () => {

    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const weddingMusic = document.getElementById("wedding-music");
    const musicToggle = document.getElementById("music-toggle");
    const iconPlay = document.getElementById("icon-play");
    const iconPause = document.getElementById("icon-pause");

    let userManuallyPaused = false;


    weddingMusic.addEventListener('play', () => {
        iconPlay.style.display = "none";
        iconPause.style.display = "block";
    });

    weddingMusic.addEventListener('pause', () => {
        iconPause.style.display = "none";
        iconPlay.style.display = "block";
    });

    musicToggle.addEventListener('click', () => {
        if (weddingMusic.paused) {
            weddingMusic.play();
            userManuallyPaused = false;
        } else {
            weddingMusic.pause();
            userManuallyPaused = true;
        }
    });

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            weddingMusic.pause();
        } else {
            if (splashScreen.style.display === 'none' && !userManuallyPaused) {
                weddingMusic.play().catch(error => console.log("Could not auto-resume"));
            }
        }
    });


    function openInvitation() {
        weddingMusic.play().catch(error => console.log(error));
        splashScreen.style.opacity = '0';

        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
            musicToggle.style.display = 'flex';
            void mainContent.offsetWidth;
            mainContent.style.opacity = '1';


            initStoryScroll();
        }, 1000);
    }

    splashScreen.addEventListener("click", function handleTap(e) {
        const bubble = document.createElement("div");
        bubble.classList.add("tap-bubble");
        const size = 50;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${e.clientX - (size / 2)}px`;
        bubble.style.top = `${e.clientY - (size / 2)}px`;
        document.body.appendChild(bubble);

        openInvitation();
        splashScreen.removeEventListener("click", handleTap);

        setTimeout(() => { bubble.remove(); }, 800);
    });


    const countDownDate = new Date("Jul 31, 2026 00:00:00").getTime();
    const x = setInterval(function () {
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





    function initStoryScroll() {


        let track = document.querySelector(".story-track");
        let panels = gsap.utils.toArray(".story-panel");

        let scrollTween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".story-container",
                pin: true,
                scrub: 1,
                end: "+=5000",
            }
        });

        panels.forEach((panel, index) => {
            let text = panel.querySelectorAll("h3, p");

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: scrollTween,
                    start: "left center",
                    end: "right center",
                    toggleActions: "play reverse play reverse",
                }
            });


            tl.fromTo(text,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
                0
            );


            if (index === 0) {
                tl.fromTo(".scene1-boy", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 0.5)
                    .fromTo(".scene1-girl", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 0.5)
                    .to(".scene1-heart", {
                        y: -80,
                        x: 0,        // start above
                        scale: 0.6,
                        opacity: 0,
                    }, 1.3)

                    .to(".scene1-heart", {
                        y: 0,
                        opacity: 1,
                        scale: 1.1,
                        duration: 2,
                        ease: "power2.in"
                    }, 1.3)

                    .to(".scene1-heart", {
                        scale: 1,
                        duration: 1,
                        ease: "back.out(1.7)" // soft bounce settle
                    }, 2.3);
            }
            else if (index === 1) {
                tl.fromTo(".scene2-boy", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.5)
                    .fromTo(".scene2-father", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.5)
                    .fromTo(".scene2-handshake", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.8, ease: "power1.inOut" }, 1.2);
            }
            else if (index === 2) {
                tl.fromTo(".scene3-fam-left", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" }, 0.5)
                    .fromTo(".scene3-fam-right", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" }, 0.7);
            }
            else if (index === 3) {
                tl.fromTo(".scene4-girl", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.5)
                    .fromTo(".scene4-boy", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }, 0.8)
                    .fromTo(".scene4-ring", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(2)" }, 1.5);
            }
            else if (index === 4) {
                tl.to(".scene5-arch", { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, 0.2)
                    .fromTo(".scene5-couple", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 1.5);
            }
        });


        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        if (window.innerWidth < 768) {
            camera.position.z = 90;
        } else {
            camera.position.z = 65;
        }

        const particleCount = 2500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        const shapeScatter = new Float32Array(particleCount * 3);
        const shapeSphere = new Float32Array(particleCount * 3);
        const shapeHeart = new Float32Array(particleCount * 3);
        const shapeRing = new Float32Array(particleCount * 3);
        const shapeInfinity = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {

            shapeScatter[i * 3] = (Math.random() - 0.5) * 100;
            shapeScatter[i * 3 + 1] = (Math.random() - 0.5) * 100;
            shapeScatter[i * 3 + 2] = (Math.random() - 0.5) * 100;


            let r = 20 * Math.cbrt(Math.random());
            let theta = Math.random() * 2 * Math.PI;
            let phi = Math.acos(2 * Math.random() - 1);
            shapeSphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            shapeSphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            shapeSphere[i * 3 + 2] = r * Math.cos(phi);


            let t = (Math.random() * Math.PI * 2);
            let hx = 16 * Math.pow(Math.sin(t), 3);
            let hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            shapeHeart[i * 3] = hx + (Math.random() * 4 - 2);
            shapeHeart[i * 3 + 1] = hy + (Math.random() * 4 - 2);
            shapeHeart[i * 3 + 2] = (Math.random() * 4 - 2);


            if (i < particleCount * 0.85) {

                let angle = Math.random() * Math.PI * 2;
                let radiusX = 18 + (Math.random() * 2);
                let radiusY = 7 + (Math.random() * 1.5);

                shapeRing[i * 3] = Math.cos(angle) * radiusX;
                shapeRing[i * 3 + 1] = Math.sin(angle) * radiusY - 4;
                shapeRing[i * 3 + 2] = Math.sin(angle) * 10;
            } else {

                let px = (Math.random() - 0.5) * 10;
                let py = (Math.random() - 0.5) * 12;
                let pz = (Math.random() - 0.5) * 10;


                if (Math.abs(px) + Math.abs(py * 0.8) + Math.abs(pz) > 6) {
                    px *= 0.4; py *= 0.4; pz *= 0.4;
                }

                shapeRing[i * 3] = px;

                shapeRing[i * 3 + 1] = py + 6.5;
                shapeRing[i * 3 + 2] = pz + 10;
            }


            let infT = Math.random() * Math.PI * 2;
            shapeInfinity[i * 3] = 22 * Math.cos(infT) + (Math.random() * 3 - 1.5);
            shapeInfinity[i * 3 + 1] = 9 * Math.sin(2 * infT) + (Math.random() * 3 - 1.5);
            shapeInfinity[i * 3 + 2] = (Math.random() * 4 - 2);


            positions[i * 3] = shapeHeart[i * 3];
            positions[i * 3 + 1] = shapeHeart[i * 3 + 1];
            positions[i * 3 + 2] = shapeHeart[i * 3 + 2];
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xD4A373, // Lighter golden/sand color (var(--primary-color))
            size: 0.40,      // Slightly scaled down
            transparent: true,
            opacity: 0.45    // Lower opacity makes it a subtle, elegant texture
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);


        const allShapes = [shapeHeart, shapeScatter, shapeSphere, shapeRing, shapeInfinity];

        ScrollTrigger.create({
            trigger: ".story-container",
            start: "top top",
            end: "+=5000",
            scrub: true,
            onUpdate: (self) => {
                let p = self.progress;

                let totalSegments = allShapes.length - 1;
                let rawSegment = p * totalSegments;

                let startIndex = Math.floor(rawSegment);
                let endIndex = Math.min(startIndex + 1, totalSegments);

                let localProgress = rawSegment - startIndex;
                let easeProgress = -0.5 * (Math.cos(Math.PI * localProgress) - 1);

                let currentPositions = particles.geometry.attributes.position.array;
                let startShape = allShapes[startIndex];
                let endShape = allShapes[endIndex];

                for (let i = 0; i < currentPositions.length; i++) {
                    currentPositions[i] = startShape[i] + (endShape[i] - startShape[i]) * easeProgress;
                }

                particles.geometry.attributes.position.needsUpdate = true;
            }
        });


        function animate() {
            requestAnimationFrame(animate);


            let time = Date.now() * 0.001;


            particles.rotation.y = Math.sin(time * 0.5) * 0.15;
            particles.rotation.x = Math.sin(time * 0.3) * 0.10;
            particles.position.y = Math.sin(time * 1.2) * 1.5;

            renderer.render(scene, camera);
        }
        animate();


        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (window.innerWidth < 768) {
                camera.position.z = 90;
            } else {
                camera.position.z = 65;
            }
        });
    }
});

