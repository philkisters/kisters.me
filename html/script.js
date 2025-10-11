function toggleSection(element) {
  const contentId = element.getAttribute('data-target');
  const chevronId = element.getAttribute('data-chevron');
  
  const content = document.getElementById(contentId);
  const chevron = document.getElementById(chevronId);
  
  if (content && chevron) {
    content.classList.toggle('expanded');
    chevron.classList.toggle('rotated');
  }
}

function initCollapsibleSections() {
  const headers = document.querySelectorAll('.collapsible-header');
  
  headers.forEach(header => {
    const isDefaultOpen = header.getAttribute('data-default-open') === 'true';
    const contentId = header.getAttribute('data-target');
    const chevronId = header.getAttribute('data-chevron');
    
    const content = document.getElementById(contentId);
    const chevron = document.getElementById(chevronId);
    
    if (content && chevron) {
      if (isDefaultOpen) {
        content.classList.add('expanded');
        chevron.classList.add('rotated');
      } else {
        content.classList.remove('expanded');
        chevron.classList.remove('rotated');
      }
    }
  });
}

let currentSlide = 1;
let originalCards = [];
let isTransitioning = false;

function initInfiniteCarousel() {
  const slider = document.getElementById('projectsSlider');
  const cards = Array.from(slider.querySelectorAll('.project-card'));
  
  originalCards = cards.map(card => card.cloneNode(true));
  
  slider.innerHTML = '';
  
  originalCards.forEach(card => {
    slider.appendChild(card.cloneNode(true));
  });
  
  currentSlide = 1;
}

function slideProjects(direction) {
  if (isTransitioning) return;
  
  isTransitioning = true;
  const slider = document.getElementById('projectsSlider');
  
  // Erste Phase: Slide-Animation
  const cardWidth = getCurrentCardWidth();
  const gap = getCurrentGap();
  const totalCardWidth = cardWidth + gap;
  
  // Temporär zur neuen Position sliden
  const currentTransform = slider.style.transform || 'translateX(0px)';
  const currentX = parseFloat(currentTransform.match(/translateX\(([^)]+)px\)/)?.[1] || 0);
  const newX = currentX + (direction * -totalCardWidth);
  
  slider.style.transform = `translateX(${newX}px)`;
  
  // Nach der Animation: DOM reorganisieren und Position zurücksetzen
  setTimeout(() => {
    slider.style.transition = 'none';
    
    if (direction === 1) {
      const firstCard = slider.firstElementChild;
      slider.appendChild(firstCard);
    } else {
      const lastCard = slider.lastElementChild;
      slider.insertBefore(lastCard, slider.firstElementChild);
    }
    
    // Position zurücksetzen ohne Animation
    updateCarouselPosition();
    
    // Animation wieder aktivieren
    requestAnimationFrame(() => {
      slider.style.transition = 'transform 0.2s ease';
      updateActiveStates();
      isTransitioning = false;
    });
  }, 200);
}

function updateCarouselPosition() {
  const slider = document.getElementById('projectsSlider');
  const container = slider.parentElement;
  const containerWidth = container.offsetWidth;
  const cardWidth = getCurrentCardWidth();
  const gap = getCurrentGap();
  const totalCardWidth = cardWidth + gap;
  
  if (window.innerWidth <= 768) {
    const centerOffset = (containerWidth - cardWidth) / 2;
    const translateX = centerOffset - (currentSlide * totalCardWidth);
    slider.style.transform = `translateX(${translateX}px)`;
  } else {
    const centerOffset = (containerWidth - cardWidth) / 2;
    const translateX = centerOffset - (currentSlide * totalCardWidth);
    slider.style.transform = `translateX(${translateX}px)`;
  }
}

function updateActiveStates() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach((card, index) => {
    card.classList.toggle('active', index === currentSlide);
  });
}

function updateCarousel() {
  updateCarouselPosition();
  updateActiveStates();
}

function getCurrentCardWidth() {
  if (window.innerWidth <= 480) {
    return 280;
  } else if (window.innerWidth <= 768) {
    return 320;
  } else {
    return 350;
  }
}

function getCurrentGap() {
  if (window.innerWidth <= 480) {
    return 8;
  } else if (window.innerWidth <= 768) {
    return 16;
  } else {
    return 32;
  }
}

function getCurrentMargin() {
  if (window.innerWidth <= 480) {
    return 4;
  } else if (window.innerWidth <= 768) {
    return 8;
  } else {
    return 16;
  }
}

function getCardWidth() {
  const cardWidth = getCurrentCardWidth();
  const gap = getCurrentGap();
  return cardWidth + gap;
}

let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      slideProjects(1);
    } else {
      slideProjects(-1);
    }
  }
}

function handleResize() {
  updateCarousel();
}

document.addEventListener('DOMContentLoaded', function() {
  initCollapsibleSections();
  
  initInfiniteCarousel();
  
  const slider = document.getElementById('projectsSlider');
  if (slider) {
    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchend', handleTouchEnd, false);
    
    slider.style.transition = 'transform 0.2s ease';
  }
  
  window.addEventListener('resize', handleResize);
  
  updateCarousel();
});