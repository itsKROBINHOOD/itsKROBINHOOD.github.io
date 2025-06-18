document.addEventListener('DOMContentLoaded', () => {
  // ===== THEME (Dark Mode) =====
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }

const themeToggle = document.getElementById('dark-mode-toggle');
const soundDark = document.getElementById('sound-dark');
const soundLight = document.getElementById('sound-light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    const soundToPlay = isDark ? soundDark : soundLight;

    if (soundToPlay) {
      soundToPlay.currentTime = 0; // rewind
      soundToPlay.play().catch(err => {
        console.warn("Sound play was interrupted:", err);
      });
    }
  });

const hyperlinkSound = document.getElementById('hyperlink');
const contactBtn = document.getElementById('contact-button');
const musicBtn = document.getElementById('music-button');

function playHyperlinkSound() {
  if (hyperlinkSound) {
    hyperlinkSound.currentTime = 0;
    hyperlinkSound.play().catch(err => {
      console.warn("Hyperlink sound play was interrupted:", err);
    });
  }
}

if (contactBtn) {
  contactBtn.addEventListener('click', playHyperlinkSound);
}

if (musicBtn) {
  musicBtn.addEventListener('click', playHyperlinkSound);
}

}

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const triggers = document.querySelectorAll('.lightbox-trigger');

const soundOpen = document.getElementById('lightbox-open-sound');
const soundClose = document.getElementById('lightbox-close-sound');

triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const src = trigger.getAttribute('src') || trigger.dataset.src;
    if (src) {
      lightboxImg.src = src;
      lightbox.classList.remove('hidden');
      
      // Play open sound
      if (soundOpen) {
        soundOpen.currentTime = 0;
        soundOpen.play().catch(err => {
          console.warn("Open sound play was interrupted:", err);
        });
      }
    }
  });
});

lightbox?.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  lightboxImg.src = '';

  // Play close sound
  if (soundClose) {
    soundClose.currentTime = 0;
    soundClose.play().catch(err => {
      console.warn("Close sound play was interrupted:", err);
    });
  }
});


  // ===== GALLERY FILTERING =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.category.toLowerCase();

      filterButtons.forEach(btn =>
        btn.classList.remove('ring', 'ring-offset-2', 'ring-purple-500')
      );
      button.classList.add('ring', 'ring-offset-2', 'ring-purple-500');

      galleryItems.forEach(item => {
        const raw = item.dataset.categories || '';
        const categories = raw.split(',').map(cat => cat.trim().toLowerCase());

        if (selected === 'all' || categories.includes(selected)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ===== ANIMATION LIB INIT =====
  AOS.init();
});
