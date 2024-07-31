const fetchWithRace = (urls) => {
    const fetchPromises = [];

    for (const url of urls) {
        const fetchPromise = fetch(url)
            .then(response => {
                if (!response) {
                    console.log(`Error ${response}`);
                    return null;
                }
                return response.json();
            })
            .catch(() => null);

        fetchPromises.push(fetchPromise);
    }

    // if any resolve then return or if rejcet then return reject msg
    return Promise.race([
        ...fetchPromises,
        timeoutPromise
    ])
        .then(result => {
            if (result === null) {
                return Promise.reject('All requests failed');
            }
            return result;
        });
};


fetchWithRace(['https://fakestoreapi.com/products', 'https://fakestoreapi.com/products/1'], 5000)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
