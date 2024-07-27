const fetchWithRace = (urls, timeout) => {
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    const fetchPromises = urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch(() => null) 
    );

    return Promise.race([
        ...fetchPromises,
        timeoutPromise
    ])
        .then(result => {
            if (result === null) {
                return Promise.reject(new Error('All requests failed'));
            }
            return result;
        });
};


fetchWithRace(['https://fakestoreapi.com/products', 'https://fakestoreapi.com/products/1'], 5000)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
