const conditionalChaining = (initialUrl, secondaryUrl1, secondaryUrl2) => {

    // fetch url first 
    const fetchUrl = (url) =>
        fetch(url)
            .then(response => {
                if (!response) {
                   console.log(`error!${response}`);
                }
                return response.json();
            });
    // take the initalurl if resolve then return fetchurl
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
