const videos = [
    { id: 'ubM9cX8G_gk', title: 'Video One' },
    { id: 'kfcnYB0sQbM', title: 'Video Two' },
    { id: 'Pez37wmUaQM', title: 'Video Three' },
    { id: 'tBObk72EYYw', title: 'Video Four' },
    { id: 'S9bCbCRyzCo', title: 'Video Five' },
    { id: 'dlu8PmKXopU', title: 'Video Six' },
    { id: 'XGVHqv8Hof0', title: 'Video Seven' },
];

const grid = document.getElementById('grid');

async function fetchTitle(id) {
    try {
        const res = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
        );
        if (!res.ok) return null;
        const data = await res.json();
        return data.title || null;
    } catch { return null; }
}

async function buildCards() {
    for (let i = 0; i < videos.length; i++) {
        const v = videos[i];
        const url = `https://www.youtube.com/watch?v=${v.id}`;
        const thumb = `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`;
        const thumbFallback = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
        const num = String(i + 1).padStart(2, '0');

        // 'a' ને બદલે 'div' — આખા card પર link નહીં
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="thumb-wrap">
            <img id="img-${v.id}" src="${thumb}" alt="Thumbnail" loading="lazy"
                 onerror="this.onerror=null;this.src='${thumbFallback}'"/>
            <div class="play-btn">
              <div class="play-circle">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-num">${num}</p>
            <h2 class="card-title" id="title-${v.id}">${v.title}</h2>
            <a class="watch-link" href="${url}" target="_blank" rel="noopener noreferrer">
              Watch
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>`;

        grid.appendChild(card);

        fetchTitle(v.id).then(title => {
            if (title) {
                const el = document.getElementById(`title-${v.id}`);
                if (el) el.textContent = title;
            }
        });
    }
}

buildCards();