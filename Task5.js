const fetchWithTimeout = (url, timeout) => {
    //check timeout Promise
    const timeoutPromise = new Promise((reject) =>
        setTimeout(() =>
            reject(('timed out')),
            timeout)
    );

    //fetch promeise
    const fetchPromise = fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log(`error! ${response.status}`);
            }
            return response.json();
        });
    return Promise.race([fetchPromise, timeoutPromise]);
};

fetchWithTimeout('https://fakestoreapi.com/products', 5000)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
