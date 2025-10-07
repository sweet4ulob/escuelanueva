document.addEventListener('DOMContentLoaded', () => {
  const mainBubble = document.getElementById('mainBubble');
  const bubbleGroup = document.getElementById('bubbleGroup');
  const introText = document.getElementById('introText');
  const bubblesSection = document.querySelector('.bubbles-section');
  const bubbles = bubbleGroup.querySelectorAll('.bubble');
  const modal = document.getElementById('modalSlider');
  const slidesContainer = document.getElementById('sliderSlides');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const closeBtn = document.getElementById('sliderClose');
  const indicators = document.getElementById('sliderIndicators');
  let current = 0;
  let currentSlides = [];
  let currentTopic = '';

  // Sliders por tema
  const SLIDERS = {
    origen: [ /* ... igual que antes ... */ ],
    ideas: [ /* ... igual que antes ... */ ],
    historia: [ /* ... igual que antes ... */ ],
    actualidad: [ /* ... igual que antes ... */ ]
  };

  mainBubble.addEventListener('click', () => {
    bubbleGroup.classList.toggle('open');
    if (bubbleGroup.classList.contains('open')) {
      introText.classList.add('hide');
      bubblesSection.classList.add('bubbles-large'); // Agranda burbujas con transición
    } else {
      introText.classList.remove('hide');
      bubblesSection.classList.remove('bubbles-large');
    }
  });

  bubbles.forEach((bubble) => {
    bubble.addEventListener('click', () => {
      const topic = bubble.getAttribute('data-topic');
      currentTopic = topic;
      loadSlides(topic);
      showSlide(0);
      // Sliders largos para temas extensos
      if (topic === 'origen' || topic === 'historia') {
        modal.querySelector('.slider-content').classList.add('slider-long');
      } else {
        modal.querySelector('.slider-content').classList.remove('slider-long');
      }
      modal.hidden = false;
      setTimeout(() => modal.classList.add('open'), 10);
    });
  });

  function loadSlides(topic) {
    slidesContainer.innerHTML = '';
    currentSlides = SLIDERS[topic] || [];
    currentSlides.forEach((slide, idx) => {
      const div = document.createElement('div');
      div.className = 'slider-slide';
      div.dataset.index = idx;
      div.innerHTML = `<div class="slide-title">${slide.title}</div>${slide.content}`;
      slidesContainer.appendChild(div);
    });
    updateIndicators();
  }

  function showSlide(idx) {
    const slides = slidesContainer.querySelectorAll('.slider-slide');
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    current = idx;
    updateIndicators();
  }

  prevBtn.addEventListener('click', () => {
    const slides = slidesContainer.querySelectorAll('.slider-slide');
    if (!slides.length) return;
    showSlide((current - 1 + slides.length) % slides.length);
  });
  nextBtn.addEventListener('click', () => {
    const slides = slidesContainer.querySelectorAll('.slider-slide');
    if (!slides.length) return;
    showSlide((current + 1) % slides.length);
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    setTimeout(() => { modal.hidden = true; }, 400);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  function updateIndicators() {
    if (!indicators) return;
    indicators.innerHTML = '';
    for (let i = 0; i < currentSlides.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'slider-indicator-dot' + (i === current ? ' active' : '');
      indicators.appendChild(dot);
    }
  }
});