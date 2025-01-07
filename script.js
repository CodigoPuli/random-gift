document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(track.children);
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const likeButtons = document.querySelectorAll('.like-btn');
  const favoritesList = document.getElementById('favorites');
  const filterDropdown = document.getElementById('category-filter');
  const filterContainer = document.getElementById('filter-container');

  let currentIndex = 0;

  const moveToIndex = (index) => {
    const visibleItems = items.filter(item => item.style.display !== 'none');
    const itemWidth = visibleItems[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  };

  const showAppContent = () => {
    document.getElementById('auth-container').style.display = 'none';
    document.querySelector('.carousel-container').style.display = 'flex';
    document.querySelector('.liked-items').style.display = 'block';
    filterContainer.style.display = 'flex'; // Mostrar filtro solo cuando el usuario haya iniciado sesión
  };

  const showLoginForm = () => {
    document.getElementById('auth-container').style.display = 'block';
    document.querySelector('.carousel-container').style.display = 'none';
    document.querySelector('.liked-items').style.display = 'none';
    filterContainer.style.display = 'none'; // Ocultar filtro en la página de login
  };

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

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    moveToIndex(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    moveToIndex(currentIndex);
  });

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = '';
    favorites.forEach(favorite => {
      const listItem = document.createElement('li');
      listItem.textContent = favorite;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('delete-btn');
      listItem.appendChild(deleteButton);

      favoritesList.appendChild(listItem);
    });
  };
  loadFavorites();

  likeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const item = e.target.closest('.carousel-item');
      const name = item.querySelector('img').alt;

      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.includes(name)) {
        favorites.push(name);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
      }
    });
  });

  favoritesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const listItem = e.target.closest('li');
      const giftName = listItem.textContent.replace('Eliminar', '').trim();

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(favorite => favorite !== giftName);

      localStorage.setItem('favorites', JSON.stringify(favorites));
      loadFavorites();
    }
  });

  filterDropdown.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    items.forEach(item => {
      const itemCategory = item.dataset.category;
      item.style.display = (selectedCategory === '' || itemCategory === selectedCategory || (selectedCategory === 'moda' && ['gorra', 'camiseta'].some(keyword => item.querySelector('img').alt.toLowerCase().includes(keyword)))) ? 'block' : 'none';
    });
    currentIndex = 0;
    moveToIndex(currentIndex);
  });

  showLoginForm();
});
