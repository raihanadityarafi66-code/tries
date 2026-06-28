// ==================== 
// 🎀 CUSTOMIZATION DATA - EDIT DI SINI!
// ====================

const DATA = {
    // 🎵 MUSIK (2 pilihan)
    songs: [
        {
            title: "Flashlight",
            artist: "Jessie J",
            emoji: "🎵",
            url: "cewe.mp3" // Ganti dengan link musik
        },
        {
            title: "Here's Your Perfect",
            artist: "Jamie Miller",
            emoji: "🎶",
            url: "cowo.mp3" // Ganti dengan link musik
        }
    ],

    // 👸 DATA TENTANG DIA
    about: {
        nickname: "dr. Chef Dita Rizky Nurkayla",
        emoji: "🐼",
        hobbies: "Tidurrr, Nonton drakor, Masakk",
        food: "Spicy Tofu With Oyster Sauce",
        color: "Pink (setau gw)",
        funFacts: [
            "Ketuju guring 🙄",
            "Prik 😑",
            "Hobinya tidur pagi 🤦‍♂️",
            "Membari muar mksh. 🥳",
            "Chainis, gatau ini baik apa engga🤓"
        ]
    },

    // 📸 FOTO GALLERY (Bisa tambah/kurangi)
    photos: [
        {
            emoji: "📸",
            caption: "Foto di Lobby Antartika after ekspedisi (Roblox)",
            image: "foto1.png"
        },
        {
            emoji: "😂",
            caption: "Foto Ekspedisi Bareng di Antartika (Roblox)",
            image: "foto2.png"
        },
        {
            emoji: "🌙",
            caption: "Foto Jadi Penjaga Kuburan (Roblox)",
            image: "foto3.png"
        },
        {
            emoji: "✨",
            caption: "First time mabar sambung kata (Roblox)",
            image: "foto4.png"
        },
        {
            emoji: "💕",
            caption: "Adu gambar (gambar gw bagus bet jir) (Roblox)",
            image: "foto5.png"
        },
        {
            emoji: "🎵",
            caption: "Gambaran lo yang sangat tidak rispek (Roblox)",
            image: "foto6.png"
        }
    ],

    // 📅 TIMELINE
    timeline: [
        { year: "16 Agustus 2022", event: "First Time Texting", desc: "Ya gausah dijelasin lah siapa yang chat duluan 😂, disitu gw belum tau lo yang mana." },
        { year: "31 Agustus 2022", event: "Reply Status WA", desc: "Gw literli spontan ngirim stiker ngereply sw lo y dan ternyata keterusan chattingan." },
        { year: "15 Mei 2026", event: "Chattingan lagi", desc: "Itu awalnya nanyain pelajaran & keterusan again ckckck." },
        { year: "After 15 Mei 2026", event: "Sekarang", desc: "Texting, mabar roblok, ml, game-game prik dimainin semua." }
    ],

    // 💭 THINGS I KNOW
    thingsIKnow: [
        "Menyebalkan syuhh 🙄",
        "Bangun guring kadaa langsung mandii 😴",
        "Scrolling udah kaya kegiatan sehari-hari 🤦‍♂️",
        "Intinya pengguringan wuu 💤",
        "Bakal senyum pas baca ini i kenow kox 😊"
    ],

    // 🔐 PESAN RAHASIA
    secretMessage: `Haii Ditt,

Banyaki mehamuk, banyaki besesangitt, banyaki gurinkk, banyaki skrolling, banyaki begadang, banyaki masak-masak lawan belajar plating, Jadii orangg baek-baekk y, belajar dirajini. Itu saja sih ya sisanya sudah gooddd..

Semoga hari lo senin terusss.

Mksh,
Raihan - 27 Juni 2026`,

    // 🧠 QUIZ
    quiz: [
        {
            question: "Makanan favorit lo apa?",
            options: ["Seblak", "Bakso", "Naskun", "Mie ayam"],
            correct: 0
        },
        {
            question: "Jam berapa biasanya lo begadang?",
            options: ["Jam 2 pagik", "Jam 12 malam", "Jam 10 malam", "Sampe pagi"],
            correct: 2
        },
        {
            question: "Hobi favorit lo?",
            options: ["Gaming", "Nonton drakor", "Baca", "Olahraga"],
            correct: 1
        }
    ]
};

// ==================== 
// END CUSTOMIZATION
// ====================

// Global State
let currentPage = 'musicSelect';
let selectedSong = null;
let quizAnswers = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPage('musicSelect');
});

// ==================== 
// NAVIGASI HALAMAN
// ====================

function showPage(pageName) {
    currentPage = pageName;
    const screen = document.getElementById('screen');
    screen.innerHTML = '';

    switch(pageName) {
        case 'musicSelect':
            screen.appendChild(createMusicSelectPage());
            break;
        case 'welcome':
            screen.appendChild(createWelcomePage());
            break;
        case 'about':
            screen.appendChild(createAboutPage());
            break;
        case 'timeline':
            screen.appendChild(createTimelinePage());
            break;
        case 'gallery':
            screen.appendChild(createGalleryPage());
            break;
        case 'thingsIKnow':
            screen.appendChild(createThingsIKnowPage());
            break;
        case 'secret':
            screen.appendChild(createSecretPage());
            break;
        case 'quiz':
            screen.appendChild(createQuizPage());
            break;
        case 'ending':
            screen.appendChild(createEndingPage());
            break;
    }

    window.scrollTo(0, 0);
}

// ==================== 
// PAGE CREATORS
// ====================

// 1️⃣ MUSIC SELECT PAGE
function createMusicSelectPage() {
    const page = document.createElement('div');
    page.className = 'page active';
    page.innerHTML = `
        <div class="page-content">
            <div class="emoji-xl animate-bounce">🐈‍⬛</div>
            <h1>✨Welcome Ditt!✨</h1>
            <p class="subtitle">Pilih lagu buat nemenin lo punkkk!</p>
            
            <div class="music-cards">
                ${DATA.songs.map((song, idx) => `
                    <div class="music-card" onclick="selectSong(${idx})">
                        <div class="music-card-emoji animate-float">${song.emoji}</div>
                        <div class="music-card-title">${song.title}</div>
                        <div class="music-card-artist">${song.artist}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    return page;
}

// 2️⃣ WELCOME PAGE
function createWelcomePage() {
    const page = document.createElement('div');
    page.className = 'page active';
    page.innerHTML = `
        <div class="page-content">
            <div class="emoji-large animate-bounce">😂🙏</div>
            <h1>🌸WELCOMEE!!🌸</h1>
            <p class="subtitle">Website yang dibuat karena kemaren udah ngetroll Dita HAHHAHA</p>
            <button class="btn" onclick="showPage('about')">Pencett</button>
        </div>
    `;
    return page;
}

// 3️⃣ ABOUT PAGE
function createAboutPage() {
    const about = DATA.about;
    const page = document.createElement('div');
    page.className = 'page active';
    
    const content = document.createElement('div');
    content.className = 'page-content';
    content.innerHTML = `
        <div class="emoji-large">${about.emoji}</div>
        <h2>Tentang Dirimu ✨</h2>
        
        <div style="width: 100%; margin-bottom: 1rem;">
            <div class="card">
                <div class="card-label">NAMA</div>
                <div class="card-title">${about.nickname}</div>
            </div>
            <div class="card">
                <div class="card-label">Hobi</div>
                <div class="card-text">${about.hobbies}</div>
            </div>
            <div class="card">
                <div class="card-label">Makanan Favorit</div>
                <div class="card-text">${about.food}</div>
            </div>
            <div class="card">
                <div class="card-label">Warna Favorit</div>
                <div class="card-text">${about.color}</div>
            </div>
        </div>

        <div style="width: 100%; margin-bottom: 1rem;">
            <h2 style="font-size: 1.3rem; margin-bottom: 1rem;">Fun Facts 💫</h2>
            ${about.funFacts.map(fact => `
                <div class="thing-item" style="animation-delay: ${about.funFacts.indexOf(fact) * 0.1}s">
                    <div class="thing-item-text">✨ ${fact}</div>
                </div>
            `).join('')}
        </div>

        <button class="btn" onclick="showPage('timeline')">Timeline Story of Us ➜</button>
    `;

    // Make content scrollable if needed
    content.style.paddingRight = '0.5rem';

    page.appendChild(content);
    return page;
}

// 4️⃣ TIMELINE PAGE
function createTimelinePage() {
    const page = document.createElement('div');
    page.className = 'page active';
    
    const content = document.createElement('div');
    content.className = 'page-content';
    content.innerHTML = `
        <h2>Timeline Story of Us 🗓️</h2>
        
        <div style="width: 100%; margin-bottom: 1rem;">
            ${DATA.timeline.map((item, idx) => `
                <div class="timeline-item" style="animation-delay: ${idx * 0.1}s">
                    <div class="timeline-year">${item.year}</div>
                    <div class="timeline-event">${item.event}</div>
                    <div class="timeline-desc">${item.desc}</div>
                </div>
            `).join('')}
        </div>

        <button class="btn" onclick="showPage('gallery')">Photos of Us ➜</button>
    `;

    page.appendChild(content);
    return page;
}

// 5️⃣ GALLERY PAGE
function createGalleryPage() {
    const page = document.createElement('div');
    page.className = 'page active';
    page.innerHTML = `
        <div class="page-content">
            <h2>Photos of Us 📸</h2>
            
            <div class="gallery-grid">
                ${DATA.photos.map((photo, idx) => `
                    <div class="gallery-item" onclick="openPhotoModal(${idx})" style="animation-delay: ${idx * 0.05}s">
                        ${photo.image ? `<img src="${photo.image}" alt="">` : photo.emoji}
                    </div>
                `).join('')}
            </div>

            <button class="btn" onclick="showPage('thingsIKnow')">About you ➜</button>
        </div>
    `;
    return page;
}

// 6️⃣ THINGS I KNOW PAGE
function createThingsIKnowPage() {
    const page = document.createElement('div');
    page.className = 'page active';
    
    const content = document.createElement('div');
    content.className = 'page-content';
    content.innerHTML = `
        <h2>Things I Know About You 💭</h2>
        
        <div style="width: 100%; margin-bottom: 1rem;">
            ${DATA.thingsIKnow.map((thing, idx) => `
                <div class="thing-item" style="animation-delay: ${idx * 0.1}s">
                    <div class="thing-item-text">✓ ${thing}</div>
                </div>
            `).join('')}
        </div>

        <button class="btn" onclick="showPage('secret')">Pesan Prom Mi </button>
    `;

    page.appendChild(content);
    return page;
}

// 7️⃣ SECRET MESSAGE PAGE
function createSecretPage() {
    const page = document.createElement('div');
    page.className = 'page active';
    page.innerHTML = `
        <div class="page-content">
            <div class="secret-lock">📩</div>
            <h2>Pesan Dari Gwakk</h2>
            <button class="btn" id="unlockBtn" onclick="unlockSecret()">Pencett</button>
            
            <div id="secretContent" style="display: none; width: 100%;">
                <div class="secret-message">${DATA.secretMessage}</div>
                <button class="btn" style="margin-top: 1rem;" onclick="showPage('quiz')">Quiz Tentang Kamu ➜</button>
            </div>
        </div>
    `;
    return page;
}

// 8️⃣ QUIZ PAGE
function createQuizPage() {
    const page = document.createElement('div');
    page.className = 'page active';
    
    const content = document.createElement('div');
    content.className = 'page-content';
    content.innerHTML = `
        <h2>Kuis Tentang Lo 🧠</h2>
        
        <div class="quiz-container" style="width: 100%;">
            ${DATA.quiz.map((q, qIdx) => {
                const isAnswered = qIdx in quizAnswers;
                return `
                    <div class="quiz-question">
                        <div class="quiz-question-text">${q.question}</div>
                        <div class="quiz-options">
                            ${q.options.map((option, oIdx) => {
                                let className = 'quiz-option';
                                if (isAnswered) {
                                    if (oIdx === q.correct) className += ' correct';
                                    else if (oIdx === quizAnswers[qIdx]) className += ' wrong';
                                }
                                return `
                                    <button class="${className}" 
                                        onclick="answerQuiz(${qIdx}, ${oIdx}, ${q.correct})"
                                        ${isAnswered ? 'disabled' : ''}>
                                        ${option}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                        ${isAnswered ? `
                            <div class="quiz-feedback ${quizAnswers[qIdx] === q.correct ? 'correct' : 'wrong'}">
                                ${quizAnswers[qIdx] === q.correct 
                                    ? '✓ bjur loo guee, sigma agaih😎' 
                                    : '✗ Hmm, aduh maap gatawu'}
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}
        </div>

        <button class="btn" style="margin-top: 1rem;" onclick="showPage('ending')">Lanjott ➜</button>
    `;

    page.appendChild(content);
    return page;
}

// 9️⃣ ENDING PAGE
function createEndingPage() {
    const page = document.createElement('div');
    page.className = 'page active';
    page.innerHTML = `
        <div class="page-content">
            <div class="ending-star animate-bounce">⭐</div>
            <h1>Thank youu!!</h1>
            
            <div class="ending-message">
                Thanks y udh berkunjunggg, sorii kemaren gw troll intinya proyek gw bagus-bagus aowkowak
            </div>
            
            <p class="ending-subtext">Enjoy yurr deyy yaaw✨</p>
            
            <button class="btn" onclick="triggerConfetti()">Coba klikk ✨</button>
        </div>
    `;
    return page;
}

// ==================== 
// INTERACTIVE FUNCTIONS
// ====================

async function selectSong(index) {
    selectedSong = DATA.songs[index];

    const audio = document.getElementById('audioPlayer');

    try {
        audio.pause();
        audio.currentTime = 0;
        audio.src = selectedSong.url;
        audio.loop = true;

        await audio.play();
        console.log("Musik diputar:", selectedSong.title);
    } catch(err) {
        console.error("Gagal memutar musik:", err);
    }

    showPage('welcome');
}

function unlockSecret() {
    document.getElementById('unlockBtn').style.display = 'none';
    document.getElementById('secretContent').style.display = 'block';
}

function answerQuiz(qIdx, oIdx, correct) {
    quizAnswers[qIdx] = oIdx;
    
    // Refresh halaman untuk update tampilan
    showPage('quiz');
}

function openPhotoModal(index) {
    const photo = DATA.photos[index];
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
            ${photo.image ? `<img src="${photo.image}" alt="" class="modal-image">` : `<div style="font-size: 5rem; margin: 1rem 0;">${photo.emoji}</div>`}
            <div class="modal-caption">${photo.caption}</div>
        </div>
    `;
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    document.body.appendChild(modal);
}

function triggerConfetti() {
    const confettiPieces = ['🌟', '✨', '🌸', '🎀', '💫', '🎉', '🎊'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.zIndex = '10000';
        confetti.style.pointerEvents = 'none';
        confetti.textContent = confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
        confetti.style.animation = `confetti ${2 + Math.random() * 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ==================== 
// HELPER FUNCTIONS
// ====================

function playMusic() {
    const audio = document.getElementById('audioPlayer');
    if (selectedSong) {
        audio.src = selectedSong.url;
        audio.loop = true;
        audio.play();
    }
}

function stopMusic() {
    const audio = document.getElementById('audioPlayer');
    audio.pause();
}