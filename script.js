let shows = [];
let currentIndex = 0; // for keyboard navigation

// ===== LOADING STATE =====
const container = document.getElementById('showContainer');
container.innerHTML = `<div class="loading">Loading...</div>`;

// ===== FETCH DATA =====
fetch('data/shows.json')
  .then(response => response.json())
  .then(data => {
    shows = data;
    renderShows(shows); // <-- your original behavior preserved
  })
  .catch(() => {
    showNotFound("Failed to load content");
  });

// ===== EVENT LISTENERS (your original search + genre filter) =====
document.getElementById('search').addEventListener('input', filterShows);
document.getElementById('genreFilter').addEventListener('change', filterShows);

// ===== FILTERING (your original logic, untouched) =====
function filterShows() {
  const searchText = document.getElementById('search').value.toLowerCase();
  const selectedGenre = document.getElementById('genreFilter').value;

  const filtered = shows.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchText);
    const matchesGenre = selectedGenre === 'All' || show.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  if (searchText && filtered.length === 0) {
    container.innerHTML = `
      <div class="not-found">
        <h2>This movie does not exist</h2>
      </div>
    `;
  } else if (filtered.length === 0) {
    showNotFound("🎬 Movie not found");
  } else {
    renderShows(filtered);
  }
}


// ===== RENDER SHOW CARDS =====
function renderShows(showList) {
  container.innerHTML = '';

  showList.forEach((show, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.tabIndex = 0; // allow keyboard focus
    card.dataset.index = index;

    card.innerHTML = `
      <img src="${show.thumbnail}" 
           alt="${show.title}"
           onerror="this.src='images/placeholder.jpg'">
      <div class="card-content">
        <h3>${show.title}</h3>
        <p>${show.genre} • ${show.year} • ${show.rating}</p>
      </div>
    `;

    // CLICK → OPEN DETAIL
    card.addEventListener('click', () => openDetail(show));

    container.appendChild(card);
  });

  highlightCard(0); // highlight first card
}

// ===== DETAIL VIEW =====
function openDetail(show) {
  document.getElementById('movie-detail').classList.remove('hidden');
  document.getElementById('detail-image').src = show.thumbnail;
  document.getElementById('detail-title').textContent = show.title;
  document.getElementById('detail-description').textContent =
    `${show.genre} • ${show.year} • Rated ${show.rating}`;
}

function closeDetail() {
  document.getElementById('movie-detail').classList.add('hidden');
}

// ===== NOT FOUND =====
function showNotFound(message) {
  container.innerHTML = `
    <div class="not-found">
      <h2>${message}</h2>
    </div>
  `;
}

// ===== KEYBOARD NAVIGATION (Roku-style) =====
document.addEventListener('keydown', (e) => {
  const active = document.activeElement;

  // Ignore key events if user is typing in search or selecting a genre
  if (active.tagName === 'INPUT' || active.tagName === 'SELECT') return;

  const cards = [...document.querySelectorAll('.card')];
  if (cards.length === 0) return;

  const cols = Math.floor(container.offsetWidth / 200);

  switch(e.key) {
    case 'ArrowRight':
      currentIndex = Math.min(currentIndex + 1, cards.length - 1);
      break;
    case 'ArrowLeft':
      currentIndex = Math.max(currentIndex - 1, 0);
      break;
    case 'ArrowDown':
      currentIndex = Math.min(currentIndex + cols, cards.length - 1);
      break;
    case 'ArrowUp':
      currentIndex = Math.max(currentIndex - cols, 0);
      break;
    case 'Enter':
      cards[currentIndex].click();
      break;
  }

  highlightCard(currentIndex);
});



// ===== HIGHLIGHT CARD =====
function highlightCard(index) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('focused'));
  if (cards[index]) {
    cards[index].classList.add('focused');
    cards[index].focus();
  }
}
