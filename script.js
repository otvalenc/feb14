// ========== DATA (Personalize these!) ==========

const reasons = [
    "That adorable face of yours that I could stare at forever",
    "The way you laugh and I know I will always stop to listen",
    "When you cough in my mouth even though I ask you not to...",
    "How incredibly proud I am of your performance in class",
    "Watching you grow socially, you inspire me so much",
    "Your emotional growth and how much more is yet to come",
    "The fact that I get to call you mine FOREVER",
    "How your face scrunches up when you're being silly",
    "You make me want to be the best version of myself",
    "Every moment with you feels like exactly where I'm supposed to be",
    "Your discipline when it comes to the most important things",
    "Being your boyfriend is the greatest thing that's ever happened to me"
];

// ========== FLOATING HEARTS ==========

function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    const hearts = ['♥', '♡', '❤', '💕'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(heart);
    }
}

// ========== SPARKLE ON CLICK ==========

document.addEventListener('click', (e) => {
    const sparkles = ['♥', '✧', '♡', '✦', '❤'];
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
        sparkle.style.top = (e.clientY + (Math.random() - 0.5) * 40) + 'px';
        sparkle.style.color = `hsl(${340 + Math.random() * 30}, 70%, ${50 + Math.random() * 20}%)`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
});

// ========== SECTION NAVIGATION ==========

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(sectionId);
    section.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== HERO → LETTER ==========

document.getElementById('enterBtn').addEventListener('click', () => {
    showSection('letterSection');
});

// ========== ENVELOPE ==========

let envelopeOpened = false;
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.querySelector('.envelope-wrapper');

envelopeWrapper.addEventListener('click', () => {
    if (envelopeOpened) return;
    envelopeOpened = true;

    envelope.classList.add('opened');
    document.getElementById('tapHint').style.display = 'none';

    setTimeout(() => {
        envelope.style.display = 'none';
        const letterContent = document.getElementById('letterContent');
        letterContent.classList.add('visible');
    }, 800);
});

// ========== LETTER → REASONS ==========

document.getElementById('toReasonsBtn').addEventListener('click', () => {
    showSection('reasonsSection');
    buildReasons();
});

// ========== REASONS ==========

let reasonsBuilt = false;
let revealedCount = 0;

function buildReasons() {
    if (reasonsBuilt) return;
    reasonsBuilt = true;

    const grid = document.getElementById('reasonsGrid');
    document.getElementById('totalCount').textContent = reasons.length;

    reasons.forEach((reason, i) => {
        const heart = document.createElement('div');
        heart.className = 'reason-heart';
        heart.innerHTML = `
            <span class="heart-number">${i + 1}</span>
            <span class="reason-text">${reason}</span>
        `;
        heart.addEventListener('click', () => {
            if (!heart.classList.contains('revealed')) {
                heart.classList.add('revealed');
                revealedCount++;
                document.getElementById('revealedCount').textContent = revealedCount;

                if (revealedCount === reasons.length) {
                    // Show the finale after all reasons are revealed
                    setTimeout(() => {
                        document.getElementById('finaleContent').classList.remove('hidden');
                        document.getElementById('finale').scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                }
            }
        });

        // Stagger the appearance
        heart.style.opacity = '0';
        heart.style.transform = 'scale(0)';
        setTimeout(() => {
            heart.style.transition = 'all 0.4s ease';
            heart.style.opacity = '1';
            heart.style.transform = 'scale(1)';
        }, i * 100);

        grid.appendChild(heart);
    });
}

// ========== RESTART ==========

document.getElementById('restartBtn').addEventListener('click', () => {
    // Reset states
    envelopeOpened = false;
    reasonsBuilt = false;
    revealedCount = 0;

    envelope.classList.remove('opened');
    envelope.style.display = '';
    document.getElementById('tapHint').style.display = '';
    document.getElementById('letterContent').classList.remove('visible');
    document.getElementById('reasonsGrid').innerHTML = '';
    document.getElementById('revealedCount').textContent = '0';
    document.getElementById('finaleContent').classList.add('hidden');

    showSection('hero');
});

// ========== LOVE COUNTER ==========

const togetherSince = new Date(2023, 9, 26, 22, 0, 0); // October 26, 2023 at 10pm

function updateCounter() {
    const now = new Date();
    let diff = Math.floor((now - togetherSince) / 1000);

    const days = Math.floor(diff / 86400);
    diff -= days * 86400;
    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    const mins = Math.floor(diff / 60);
    const secs = diff - mins * 60;

    document.getElementById('counterDays').textContent = days;
    document.getElementById('counterHours').textContent = hours;
    document.getElementById('counterMins').textContent = mins;
    document.getElementById('counterSecs').textContent = secs;
}

updateCounter();
setInterval(updateCounter, 1000);

// ========== INIT ==========

createFloatingHearts();
