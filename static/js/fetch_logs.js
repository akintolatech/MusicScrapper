function fetchLogs() {
    fetch(fetchLogsUrl )
        .then(response => response.json())
        .then(data => {
            // const recentLogsContainer = document.getElementById('recentLogsContainer');
            const allLogsContainer = document.getElementById('allLogsContainer');

            // Clear both containers
            // recentLogsContainer.innerHTML = '';
            allLogsContainer.innerHTML = '';

            // // Populate recent logs container
            // data.recent_logs.forEach(log => {
            //     const logElement = document.createElement('p');
            //     logElement.innerHTML = `<strong>${log.counter}.</strong> ${log.details} on ${log.created}`;
            //     recentLogsContainer.appendChild(logElement);
            // });

            // Populate all logs container
            data.all_logs.forEach(log => {
                const logElement = document.createElement('p');
                logElement.innerHTML = `<strong>${log.counter}.</strong> ${log.details} on ${log.created}`;
                allLogsContainer.appendChild(logElement);
            });

            // Determine the number of items in comprehensive logs
            const totalLogsCount = data.all_logs.length;

            // Display the count on the page
            const totalLogsCountElement = document.querySelector(".log-count");
            if (totalLogsCountElement) {
                totalLogsCountElement.textContent = totalLogsCount;
            }
        });
}

// Refresh logs every 10 seconds
setInterval(fetchLogs, 5000);