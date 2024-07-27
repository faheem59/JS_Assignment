const fetchWithExponentialBackoff = (url, maxRetries) => {
    const fetchUrl = () =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });

    const attemptFetch = (retriesLeft) => {
        return fetchUrl()
            .catch(error => {
                if (retriesLeft > 0) {
                    const delay = Math.pow(2, maxRetries - retriesLeft) * 1000; // Exponential backoff
                    return new Promise(resolve => setTimeout(resolve, delay))
                        .then(() => attemptFetch(retriesLeft - 1));
                } else {
                    return Promise.reject(`Failed after ${maxRetries} retries: ${error.message}`);
                }
            });
    };

    return attemptFetch(maxRetries);
};


fetchWithExponentialBackoff('https://fakestoreapi.com/products', 3)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
