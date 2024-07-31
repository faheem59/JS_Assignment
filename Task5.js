const fetchWithTimeout = (url, timeout) => {
    //check timeout Promise
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() =>
            reject(('Request timed out')),
            timeout)
    );

    //fetch promeise
    const fetchPromise = fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
    return Promise.race([fetchPromise, timeoutPromise]);
};

fetchWithTimeout('https://fakestoreapi.com/products', 5000)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
