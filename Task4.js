const fetchWithRetry = (url, retries) => new Promise((resolve, reject) => {
    const attemptFetch = (attempts) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => {
                // cehck attempts 
                if (attempts > 0) {
                    console.log(`Retrying... Attempts left: ${attempts}`);
                    attemptFetch(attempts - 1);
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
