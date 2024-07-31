const fetchSequentially = (urls) => {
    // fetch url for 
    const fetchUrl = url =>
        fetch(url)
            .then(response => {
                if (!response) {
                    console.log(`error! ${response}`);
                }
                return response.json();
            });

    
    const fetchResults = async () => {
        const results = [];

        for (const url of urls) {
            try {
                const data = await fetchUrl(url);
                results.push(data);
            } catch (error) {
                
                results.push({ error: error.message });
            }
        }

        return results;
    };

    return fetchResults();
};


fetchSequentially(['https://fakestoreapi.com/products', 'https://fakestoreapi.com/product/1'])
    .then(results => console.log('Results fetched sequentially:', results))
    .catch(error => console.error('Error:', error));
