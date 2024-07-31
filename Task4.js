const fetchWithRetry = (url, retries) => new Promise((resolve, reject) => {
    const attemptFetch = (attemptsLeft) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => {
                if (attemptsLeft > 0) {
                    console.log(`Retrying... Attempts left: ${attemptsLeft}`);
                    attemptFetch(attemptsLeft - 1);
                } else {
                    reject(`Failed after ${retries} retries: ${error.message}`);
                }
            });
    };

    attemptFetch(retries);
});


fetchWithRetry('https://fakestoreapi.com/product', 3)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
