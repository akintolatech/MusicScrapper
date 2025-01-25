// const fetchSongsURL = "/your-api-endpoint/"; // Replace with your actual API URL

function fetchSongs() {
    fetch(fetchSongsURL)
        .then(response => response.json())
        .then(data => {
            const recentSongsContainer = document.getElementById('recentSongsContainer');
            const allSongsContainer = document.getElementById('allSongsContainer');

            // Clear both containers
            recentSongsContainer.innerHTML = '';
            allSongsContainer.innerHTML = '';

            // Populate recent songs container
            data.recent_songs.forEach(song => {
                const songElement = document.createElement('div');
                songElement.innerHTML = `
                    <div class="song_tab">
                        <div class="image_and_details">
                            <div class="song_album">
                                <img src="${staticUrl}img/img.jpg" />
                            </div>
                            <div class="song_detail">
                                <h3>${song.title}</h3>
                                <p>${song.artist}</p>
                            </div>
                        </div>
                        <a href="${song.link}" target="_blank"> 
                            <div class="song_album" style="width: 38px; height: 38px;">
                                <img src="${staticUrl}img/download.svg" />
                            </div>
                        </a>
                    </div>
                `;
                recentSongsContainer.appendChild(songElement);
            });

            // Populate all songs container
            data.all_songs.forEach(song => {
                const songElement = document.createElement('div');
                songElement.innerHTML = `
                    <strong>${song.counter}.</strong>
                    <div class="song_tab">
                        <div class="image_and_details">
                            <div class="song_album">
                                <img src="${staticUrl}img/img.jpg" />
                            </div>
                            <div class="song_detail">
                                <h3>${song.title}</h3>
                                <p>${song.artist}</p>
                            </div>
                        </div>
                        <a href="${song.link}" target="_blank"> 
                            <div class="song_album" style="width: 38px; height: 38px;">
                                <img src="${staticUrl}img/download.svg" />
                            </div>
                        </a>
                    </div>
                `;
                allSongsContainer.appendChild(songElement);
            });

            // Determine the number of items in all songs
            const totalSongsCount = data.all_songs.length;

            // Display the count on the page
            const totalSongsCountElement = document.querySelector(".log-count");
            if (totalSongsCountElement) {
                totalSongsCountElement.textContent = totalSongsCount;
            }
        })
        .catch(error => console.error("Error fetching songs:", error));
}


// Refresh songs every 10 seconds
setInterval(fetchSongs, 10000);

// Fetch songs on page load
fetchSongs();
