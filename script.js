// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
if (prefersDarkScheme.matches) {
    body.classList.add("dark-mode");
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Animasi Trail pada Hero Section
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    console.log('Canvas element:', canvas);

    var ctx = canvas.getContext('2d');
    console.log('Canvas context:', ctx);

    var particles = [];
    var particleCount = 330;
    var hue = 0;

    function resizeCanvas() {
        var heroSection = document.getElementById('hero');
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
    }

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5,
            life: 100,
            hue: hue
        };
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hue = (hue + 0.1) % 360; // Mengubah hue secara perlahan
        
        particles.forEach(function(particle, index) {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life--;

            if (particle.life <= 0) {
                particles.splice(index, 1);
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.life / 100})`;
            ctx.fill();
        });

        requestAnimationFrame(drawParticles);
    }

    function mouseMoveHandler(e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        for (var i = 0; i < 5; i++) {
            particles.push(createParticle(x, y));
        }

        while (particles.length > particleCount) {
            particles.shift();
        }
    }

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', mouseMoveHandler);
    console.log('Event listeners added');

    resizeCanvas();
    drawParticles();
    console.log('Animation started');

    // Handle form submission
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var form = this;

        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Pesan terkirim! Terima kasih telah menghubungi saya.');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! Ada masalah saat mengirim pesan Anda');
                    }
                })
            }
        }).catch(error => {
            alert('Oops! Ada masalah saat mengirim pesan Anda');
        });
    });
});