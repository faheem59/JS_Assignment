const conditionalChaining = (initialUrl, secondaryUrl1, secondaryUrl2) => {
    const fetchUrl = (url) =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });

    return fetchUrl(initialUrl)
        .then(initialData => {
            const shouldFetchSecondaryUrl1 = initialData.someCondition;
            const secondaryUrl = shouldFetchSecondaryUrl1 ? secondaryUrl1 : secondaryUrl2;
            return fetchUrl(secondaryUrl);
        })
        .then(secondaryData => {
            return secondaryData;
        })
        .catch(error => {
            return Promise.reject(`Fetch failed: ${error.message}`);
        });
};


conditionalChaining('https://fakestoreapi.com/products', 'https://fakestoreapi.com/products/1', 'https://fakestoreapi.com/products/2')
    .then(data => console.log('Data fetched:', data))
    .catch(error => console.error('Error:', error));
