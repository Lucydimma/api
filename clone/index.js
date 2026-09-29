const API_KEY = "dd509db55d8d4b3689347ad6b190b3c5";
    const API_URL = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`;

    async function loadTrending() {
      try {
        const res = await fetch(API_URL, {
          // Uncomment if using Bearer Token:
          // headers: { Authorization: `Bearer ${BEARER}` }
        });
        const data = await res.json();
        if (!data.results) throw new Error(data.status_message || "Check your API Key");

        document.getElementById('status').style.display = 'none';
        render(data.results);
      } catch (err) {
        document.getElementById('status').innerHTML = `Error: ${err.message}<br><small>Make sure you added your API Key in the code</small>`;
      }
    }

    function render(items) {
      const grid = document.getElementById('grid');
      grid.innerHTML = items.map(item => {
        const title = item.title || item.name || 'Untitled';
        const date = item.release_date || item.first_air_date || '';
        const type = item.media_type;
        const vote_count = item.vote_count;
        const popularity = item.popularity;
        const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
        const overview = item.overview || 'No summary available.';

        return `
      <div class="card">
        <img src="${poster}" loading="lazy">
        <div class="card-body">
          <h3 title="${title}">${title}</h3>
          <p>${date}</p>
          <p>${vote_count}</p>
          <p>${popularity}</p>
          <span class="badge ${type}">${type.toUpperCase()}</span>
          <details>
            <summary></summary>
            <div class="overview">${overview}</div>
          </details>
        </div>
      </div>
    `;
      }).join('');
    }

    function filterCards() {
      const q = document.getElementById('search').value.toLowerCase();
      document.querySelectorAll('.card').forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(q) ? 'block' : 'none';
      });
    }

    loadTrending();