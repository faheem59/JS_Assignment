const fetchWithRace = (urls) => {
   

    const fetchPromises = urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    console.log(`HTTP error! Status: ${response.status}`);
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
                return Promise.reject(('All requests failed'));
            }
            return result;
        });
};


fetchWithRace(['https://fakestoreapi.com/products', 'https://fakestoreapi.com/products/1'], 5000)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
