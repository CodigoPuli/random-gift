document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const likeButtons = document.querySelectorAll('.like-btn');
    const favoritesList = document.getElementById('favorites');
  
    const itemWidth = items[0].getBoundingClientRect().width;
    let currentIndex = 0;
  
    // Alinear los elementos uno al lado del otro
    const setItemPosition = (item, index) => {
      item.style.left = `${index * itemWidth}px`;
    };
    items.forEach(setItemPosition);
  
    // Función para mover el carrusel
    const moveToIndex = (index) => {
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    };
  
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      moveToIndex(currentIndex);
    });
  
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
      moveToIndex(currentIndex);
    });
  
    // Función para dar "like" a los regalos
    likeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const item = e.target.closest('.carousel-item');
        const name = item.querySelector('img').alt;
  
        if (!Array.from(favoritesList.children).some(li => li.textContent === name)) {
          const listItem = document.createElement('li');
          listItem.textContent = name;
          favoritesList.appendChild(listItem);
        }
      });
    });
  });
  