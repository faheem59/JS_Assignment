const fetchWithFallback = (urls) => {
    const fetchUrl = (url) =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });

    const fetchAll = urls.map(url =>
        fetchUrl(url).catch(error => {
            
            console.error(`Failed to fetch ${url}: ${error.message}`);
           
            return null;
        })
    );

    return Promise.all(fetchAll).then(results => {
        
        const successfulResults = results.filter(result => result !== null);

        if (successfulResults.length > 0) {
            return successfulResults;
        } else {
            return Promise.reject('All fetch attempts failed.');
        }
    });
};


fetchWithFallback([
    'https://fakestoreapi.com/products/1',
    'https://fakestoreapi.com/products/2',
    'https://fakestoreapi.com/products/3'
])
    .then(results => console.log('Successful results:', results))
    .catch(error => console.error('Error:', error));
