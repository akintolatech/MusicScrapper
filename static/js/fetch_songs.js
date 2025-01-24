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
                const songElement = document.createElement('p');
                songElement.innerHTML = `<strong>${song.counter}.</strong> ${song.title} by ${song.artist} - <a href="${song.link}" target="_blank">Download</a>`;
                recentSongsContainer.appendChild(songElement);
            });

            // Populate all songs container
            data.all_songs.forEach(song => {
                const songElement = document.createElement('div');
                songElement.innerHTML = `
                                            <strong>${song.counter}.</strong>
                                            
                                            ${song.title} by ${song.artist} - <a href="${song.link}" target="_blank">Download</a>
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

// function fetchSongs() {
//     fetch( fetchSongsURL )
//         .then(response => response.json())
//         .then(data => {
//             const recentSongsContainer = document.getElementById('recentSongsContainer');
//             const allSongsContainer = document.getElementById('allSongsContainer');

//             // Clear both containers
//             recentSongsContainer.innerHTML = '';
//             allSongsContainer.innerHTML = '';

//             // Populate recent Songs container
//             data.recent_songs.forEach(log => {
//                 const logElement = document.createElement('p');
//                 logElement.innerHTML = `<strong>${log.counter}.</strong> ${log.title} on ${log.artist}, ${log.link}`;
//                 recentSongsContainer.appendChild(logElement);
//             });

//             // Populate all Songs container
//             data.all_songs.forEach(log => {
//                 const logElement = document.createElement('p');
//                 logElement.innerHTML = `<strong>${log.counter}.</strong> ${log.title} on ${log.artist}, ${log.link}`;
//                 allSongsContainer.appendChild(logElement);
//             });

//             // Determine the number of items in comprehensive Songs
//             const totalSongsCount = data.all_Songs.length;

//             // Optionally, display the count on the page
//             const totalSongsCountElement = document.querySelector(".log-count");
//             if (totalSongsCountElement) {
//                 totalSongsCountElement.textContent = totalSongsCount;
//             }

//         });
// }

// // Refresh Songs every 10 seconds
// setInterval(fetchSongs, 5000);