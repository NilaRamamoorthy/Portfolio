//  Typing Animation

const textElement = document.getElementById("typed-text");
const roles = ["Trainee", "Python Developer"];
let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeEffect() {
    const current = roles[roleIndex];

    if (typing) {
        textElement.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            typing = false;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        textElement.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            typing = true;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 500);
            return;
        }
    }
    setTimeout(typeEffect, typing ? 150 : 100);
}

window.onload = () => {
    setTimeout(typeEffect, 1000);
};


// Scroll-triggered Animation 


const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('visible');
};

// Create the observe with a threshold and a callback
const observe = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            displayScrollElement(entry.target);
        } else {
            hideScrollElement(entry.target);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.fade-in-up-scroll').forEach(el => observe.observe(el));


// Animate circular conic gradient from 0 to percent
function animateCircle(circle, percent) {
    let current = 0;
    const step = () => {
        if (current <= percent) {
            circle.style.background = `conic-gradient(#a4460c ${current}%, #222 ${current}%)`;
            current++;
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

function animateSkills() {
    document.querySelectorAll('.bar-fill').forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });

    document.querySelectorAll('.circle').forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent'));
        animateCircle(circle, percent);
    });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            animateSkills();
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
