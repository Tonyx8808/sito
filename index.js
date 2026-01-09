// ======================
// Intro Splash
// ======================
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  intro.classList.add("fade-out");

  intro.addEventListener("transitionend", () => {
    intro.style.display = "none";
    document.body.classList.remove("intro-active");
    document.querySelector(".navbar").classList.remove("hidden");
  });
});

// ======================
// Navbar scroll
// ======================
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  const scrollingDown = currentScroll > lastScroll;
  const scrollingUp = currentScroll < lastScroll;

  if (currentScroll <= 0) {
    navbar.classList.remove("scroll-up");
  } else if (scrollingDown) {
    navbar.classList.add("scroll-down");
    navbar.classList.remove("scroll-up");
  } else if (scrollingUp) {
    navbar.classList.add("scroll-up");
    navbar.classList.remove("scroll-down");
  }

  lastScroll = currentScroll;
});





//======================
//PAY
//======================

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('togglePricingBtn');
    const priceTag = document.querySelector('.price');

    console.log('Toggle button:', toggleBtn);
    console.log('Price tag:', priceTag);
    
    if (!toggleBtn) {
      console.error('Toggle button non trovato');
      return;
    }
    
    if (!priceTag) {
      console.error('Price tag non trovato');
      return;
    }

    console.log('Dataset monthly:', priceTag.dataset.monthly);
    console.log('Dataset yearly:', priceTag.dataset.yearly);

    toggleBtn.addEventListener('click', () => {
      console.log('Click sul toggle');
      const currentText = toggleBtn.textContent.trim().toLowerCase();
      const isMensile = currentText === 'mensile';
      
      console.log('Is mensile:', isMensile);
      
      // Aggiorna il testo del bottone
      toggleBtn.textContent = isMensile ? 'Annuale' : 'Mensile';
      
      // Aggiorna il prezzo
      const newPrice = isMensile ? priceTag.dataset.yearly : priceTag.dataset.monthly;
      console.log('Nuovo prezzo:', newPrice);
      priceTag.textContent = newPrice;
    });
  });


// ======================
// Contatori Animati
// ======================
document.querySelectorAll(".counter").forEach(counter => {
  counter.innerText = "0";
  const target = +counter.dataset.target;
  const increment = target / 200;

  const update = () => {
    const current = +counter.innerText;
    if (current < target) {
      counter.innerText = `${Math.min(target, Math.ceil(current + increment))}`;
      requestAnimationFrame(update);
    }
  };
  update();
});

document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('.carousel-row');

  rows.forEach((row, index) => {
    const parent = row.parentElement;

    
    // Calcola larghezza e attiva animazione solo se necessario
    const totalWidth = row.scrollWidth;
    const containerWidth = parent.offsetWidth;

    if (totalWidth > containerWidth) {
      animateRow(row, totalWidth, index);
      animateRow(clone, totalWidth, index, true);
    }
  });

  function animateRow(row, width, index, isClone = false) {
    let start = null;
    const speed = 40; // pixel/sec

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const offset = (elapsed / 1000) * speed;

      row.style.transform = `translateX(${-offset % width}px)`;
      requestAnimationFrame(step);
    }

    row.style.willChange = 'transform';
    row.style.display = 'flex';
    row.style.gap = '3rem';
    row.style.padding = '1rem 2rem';
    row.style.position = 'absolute';
    row.style.left = isClone ? `${width}px` : '0';
    row.style.top = `${index * 100}%`;

    requestAnimationFrame(step);
  }
});
