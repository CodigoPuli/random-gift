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
  
    // Cargar los regalos guardados previamente
    const loadFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favoritesList.innerHTML = ''; // Limpiar la lista antes de cargar nuevos elementos
      favorites.forEach(favorite => {
        const listItem = document.createElement('li');
        listItem.textContent = favorite;
        // Crear un botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-btn');
        listItem.appendChild(deleteButton);
        favoritesList.appendChild(listItem);
      });
    };
    loadFavorites();
  
    // Función para dar "like" a los regalos
    likeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const item = e.target.closest('.carousel-item');
        const name = item.querySelector('img').alt;
  
        // Verificar si ya está en favoritos
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
        if (!favorites.includes(name)) {
          favorites.push(name);
          localStorage.setItem('favorites', JSON.stringify(favorites));
  
          // Mostrar el regalo en la lista de favoritos
          loadFavorites();
        }
      });
    });
  
    // Función para eliminar un regalo de los favoritos
    favoritesList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const listItem = e.target.closest('li');
        const giftName = listItem.textContent.replace('Eliminar', '').trim();
  
        // Eliminar el regalo de los favoritos
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(favorite => favorite !== giftName);
  
        // Actualizar localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
  
        // Volver a cargar la lista de favoritos
        loadFavorites();
      }
    });
  });
  