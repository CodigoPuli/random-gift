document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(track.children);
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const likeButtons = document.querySelectorAll('.like-btn');
  const favoritesList = document.getElementById('favorites');

  let currentIndex = 0;

  // Función para mover el carrusel
  const moveToIndex = (index) => {
    const itemWidth = items[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  };

  // Mostrar el contenido de la app
  const showAppContent = () => {
    document.getElementById('auth-container').style.display = 'none';
    document.querySelector('.carousel-container').style.display = 'flex';
    document.querySelector('.liked-items').style.display = 'block';
  };

  // Ocultar contenido de la app y mostrar login
  const showLoginForm = () => {
    document.getElementById('auth-container').style.display = 'block';
    document.querySelector('.carousel-container').style.display = 'none';
    document.querySelector('.liked-items').style.display = 'none';
  };

  // Manejo de login
  document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      alert('Inicio de sesión exitoso');
      showAppContent();
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });

  // Ajustar la posición del carrusel
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    moveToIndex(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    moveToIndex(currentIndex);
  });

  // Cargar los regalos guardados en la lista de favoritos
  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = ''; // Limpiar la lista antes de cargar nuevos elementos
    favorites.forEach(favorite => {
      const listItem = document.createElement('li');
      listItem.textContent = favorite;

      // Botón de eliminar
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('delete-btn');
      listItem.appendChild(deleteButton);

      favoritesList.appendChild(listItem);
    });
  };
  loadFavorites();

  // Manejo de "Like" en los regalos
  likeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const item = e.target.closest('.carousel-item');
      const name = item.querySelector('img').alt;

      // Verificar si ya está en favoritos
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.includes(name)) {
        favorites.push(name);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites(); // Actualizar la lista de favoritos
      }
    });
  });

  // Manejo de eliminación de regalos en la lista de favoritos
  favoritesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const listItem = e.target.closest('li');
      const giftName = listItem.textContent.replace('Eliminar', '').trim();

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(favorite => favorite !== giftName);

      localStorage.setItem('favorites', JSON.stringify(favorites));
      loadFavorites(); // Actualizar la lista de favoritos
    }
  });

  // Mostrar el formulario de login al cargar la página
  showLoginForm();
});
