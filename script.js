document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("starry-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let stars = [];
    const numStars = 100;
    const maxSpeed = 0.5;
    const minSpeed = 0.1;

    function initStars() {
        stars = [];

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() * (maxSpeed - minSpeed) + minSpeed) *
                    (Math.random() < 0.5 ? -1 : 1),
                vy: (Math.random() * (maxSpeed - minSpeed) + minSpeed) *
                    (Math.random() < 0.5 ? -1 : 1),
                alpha: Math.random() * 0.5 + 0.5,
                deltaAlpha: Math.random() * 0.02 - 0.01
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach((star) => {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function updateStars() {
        stars.forEach((star) => {
            star.x += star.vx;
            star.y += star.vy;

            if (star.x < 0) star.x = width;
            if (star.x > width) star.x = 0;
            if (star.y < 0) star.y = height;
            if (star.y > height) star.y = 0;

            star.alpha += star.deltaAlpha;
            if (star.alpha <= 0.3 || star.alpha >= 1) {
                star.deltaAlpha *= -1;
            }
        });
    }

    function animate() {
        drawStars();
        updateStars();
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initStars();
    });

    initStars();
    animate();
});
