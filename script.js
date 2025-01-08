document.addEventListener('DOMContentLoaded', () => {
  // Selección de elementos del DOM
  const track = document.querySelector('.carousel-track'); // Contenedor del carrusel
  const items = Array.from(track.children); // Todos los elementos del carrusel
  const prevButton = document.getElementById('prev'); // Botón de navegación anterior
  const nextButton = document.getElementById('next'); // Botón de navegación siguiente
  const likeButtons = document.querySelectorAll('.like-btn'); // Botones de "me gusta"
  const cartButtons = document.querySelectorAll('.cart-btn'); // Botones de "añadir al carrito"
  const favoritesList = document.getElementById('favorites'); // Contenedor de lista de favoritos
  const cartList = document.getElementById('cart'); // Contenedor de lista de carrito
  const filterDropdown = document.getElementById('category-filter'); // Filtro por categoría
  const filterContainer = document.getElementById('filter-container'); // Contenedor del filtro

  // Índice actual del carrusel
  let currentIndex = 0;

  // Función para mover el carrusel a un índice específico
  const moveToIndex = (index, visibleItems) => {
    const itemWidth = visibleItems[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(-${index * itemWidth}px)`; // Desplaza el carrusel según el índice
  };

  // Muestra el contenido de la aplicación (cuando el usuario ha iniciado sesión)
  const showAppContent = () => {
    document.getElementById('auth-container').style.display = 'none'; // Oculta el contenedor de inicio de sesión
    document.querySelector('.carousel-container').style.display = 'flex'; // Muestra el carrusel
    document.querySelector('.liked-items').style.display = 'block'; // Muestra la lista de elementos favoritos
    document.querySelector('.cart-items').style.display = 'block'; // Muestra la lista del carrito
    filterContainer.style.display = 'flex'; // Muestra el filtro
  };

  // Muestra el formulario de inicio de sesión
  const showLoginForm = () => {
    document.getElementById('auth-container').style.display = 'block'; // Muestra el formulario de inicio de sesión
    document.querySelector('.carousel-container').style.display = 'none'; // Oculta el carrusel
    document.querySelector('.liked-items').style.display = 'none'; // Oculta la lista de favoritos
    document.querySelector('.cart-items').style.display = 'none'; // Oculta la lista del carrito
    filterContainer.style.display = 'none'; // Oculta el filtro
  };

  // Evento de inicio de sesión
  document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || []; // Obtener usuarios desde localStorage
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      alert('Inicio de sesión exitoso');
      showAppContent(); // Muestra el contenido de la app si el inicio de sesión es correcto
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });

  // Navegación del carrusel (anterior)
  prevButton.addEventListener('click', () => {
    const visibleItems = items.filter(item => item.style.display !== 'none');
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : visibleItems.length - 1; // Mover al índice anterior
    moveToIndex(currentIndex, visibleItems); // Mueve el carrusel hacia atrás
  });

  // Navegación del carrusel (siguiente)
  nextButton.addEventListener('click', () => {
    const visibleItems = items.filter(item => item.style.display !== 'none');
    currentIndex = (currentIndex < visibleItems.length - 1) ? currentIndex + 1 : 0; // Mover al siguiente índice
    moveToIndex(currentIndex, visibleItems); // Mueve el carrusel hacia adelante
  });

  // Cargar elementos favoritos desde localStorage
  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Obtener favoritos desde localStorage
    favoritesList.innerHTML = ''; // Limpiar la lista de favoritos antes de cargar los nuevos elementos
    favorites.forEach(favorite => {
      const listItem = document.createElement('li'); // Crear un nuevo elemento de lista
      listItem.textContent = favorite;

      const deleteButton = document.createElement('button'); // Crear el botón para eliminar un favorito
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('delete-btn');
      listItem.appendChild(deleteButton); // Añadir el botón de eliminar al elemento de lista

      favoritesList.appendChild(listItem); // Añadir el ítem de favorito a la lista
    });
  };
  loadFavorites(); // Cargar favoritos al inicio

  // Cargar elementos en el carrito desde localStorage
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener carrito desde localStorage
    cartList.innerHTML = ''; // Limpiar la lista del carrito antes de cargar los nuevos elementos
    cart.forEach(item => {
      const listItem = document.createElement('li'); // Crear un nuevo elemento de lista
      listItem.textContent = item;

      const deleteButton = document.createElement('button'); // Crear el botón para eliminar un ítem del carrito
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('delete-btn');
      listItem.appendChild(deleteButton); // Añadir el botón de eliminar al elemento de lista

      cartList.appendChild(listItem); // Añadir el ítem al carrito
    });
  };
  loadCart(); // Cargar el carrito al inicio

  // Evento para agregar un ítem a los favoritos
  likeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const item = e.target.closest('.carousel-item'); // Obtener el ítem del carrusel
      const name = item.querySelector('img').alt; // Obtener el nombre del ítem desde la imagen

      const favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Obtener los favoritos desde localStorage
      if (!favorites.includes(name)) {
        favorites.push(name); // Añadir el ítem a los favoritos si no está presente
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Guardar en localStorage
        loadFavorites(); // Actualizar la lista de favoritos
      }
    });
  });

  // Evento para agregar un ítem al carrito
  cartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const item = e.target.closest('.carousel-item'); // Obtener el ítem del carrusel
      const name = item.querySelector('img').alt; // Obtener el nombre del ítem desde la imagen

      const cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito desde localStorage
      if (!cart.includes(name)) {
        cart.push(name); // Añadir el ítem al carrito si no está presente
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
        loadCart(); // Actualizar la lista del carrito
      }
    });
  });

  // Evento para eliminar un ítem de la lista de favoritos
  favoritesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) { // Si se hace clic en un botón de eliminar
      const listItem = e.target.closest('li');
      const giftName = listItem.textContent.replace('Eliminar', '').trim(); // Obtener el nombre del ítem

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(favorite => favorite !== giftName); // Eliminar el ítem de los favoritos

      localStorage.setItem('favorites', JSON.stringify(favorites)); // Guardar los cambios en localStorage
      loadFavorites(); // Actualizar la lista de favoritos
    }
  });

  // Evento para eliminar un ítem del carrito
  cartList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) { // Si se hace clic en un botón de eliminar
      const listItem = e.target.closest('li');
      const giftName = listItem.textContent.replace('Eliminar', '').trim(); // Obtener el nombre del ítem

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item !== giftName); // Eliminar el ítem del carrito

      localStorage.setItem('cart', JSON.stringify(cart)); // Guardar los cambios en localStorage
      loadCart(); // Actualizar la lista del carrito
    }
  });

  // Evento para filtrar los ítems por categoría
  filterDropdown.addEventListener('change', (e) => {
    const selectedCategory = e.target.value; // Obtener la categoría seleccionada
    items.forEach(item => {
      const itemCategory = item.dataset.category; // Obtener la categoría del ítem
      // Filtrar los ítems según la categoría seleccionada
      const isVisible = selectedCategory === '' || itemCategory === selectedCategory || 
        (selectedCategory === 'moda' && ['gorra', 'camiseta'].some(keyword => item.querySelector('img').alt.toLowerCase().includes(keyword)));
      item.style.display = isVisible ? 'block' : 'none';
    });

    // Mover al primer ítem después de aplicar el filtro
    const visibleItems = items.filter(item => item.style.display !== 'none');
    currentIndex = 0; // Volver al primer ítem visible
    if (visibleItems.length > 0) {
      moveToIndex(currentIndex, visibleItems); // Mueve el carrusel al primer ítem visible
    }
  });

  // Función para crear y mostrar el modal de imágenes
  const createModal = () => {
    const modal = document.createElement('div'); // Crear el modal
    modal.classList.add('modal');
    const modalContent = document.createElement('div'); // Crear el contenido del modal
    modalContent.classList.add('modal-content');

    const modalCloseButton = document.createElement('button'); // Crear el botón de cerrar
    modalCloseButton.textContent = 'Cerrar';
    modalCloseButton.style.marginTop = '10px';
    modalCloseButton.addEventListener('click', () => modal.classList.remove('active')); // Cerrar el modal

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    return { modal, modalContent, modalCloseButton };
  };

  const { modal, modalContent, modalCloseButton } = createModal();

  let modalIndex = 0; // Índice de la imagen del modal
  let modalImages = []; // Arreglo para almacenar las imágenes del modal

  // Función para mover las imágenes del modal
  const moveModalIndex = (index) => {
    modalImages.forEach((img, i) => {
      img.style.display = i === index ? 'block' : 'none';
    });
  };

  // Evento para mostrar el modal al hacer clic en una imagen del carrusel
  items.forEach((item, index) => {
    const img = item.querySelector('img');
    img.addEventListener('click', () => {
      modalIndex = index;
      modalImages = items.map(i => i.querySelector('img').cloneNode()); // Clonar las imágenes para el modal
      modalContent.innerHTML = '';
      modalImages.forEach(modalImg => modalContent.appendChild(modalImg)); // Añadir las imágenes clonadas al modal
      modalContent.appendChild(modalCloseButton); // Añadir el botón de cerrar al modal

      moveModalIndex(modalIndex); // Mostrar la imagen correspondiente
      modal.classList.add('active'); // Mostrar el modal
    });
  });

  // Navegación de imágenes en el modal
  modalContent.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') { // Si se hace clic en una imagen
      modalIndex = (modalIndex + 1) % modalImages.length; // Cambiar a la siguiente imagen
      moveModalIndex(modalIndex);
    }
  });

  showLoginForm(); // Mostrar el formulario de inicio de sesión por defecto
});
