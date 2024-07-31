const fetchAllWithErrors = (urls) => {
    
    const fetchUrl = url => fetch(url)
        .then(response => {
            if (!response) {
                console.log(`error! Status: ${response}`);
            }
            return response.json();
        });

    //function, and it’s responsible for creating an array of promises based on the provided URLs. 
    for (const url of urls) {
        const fetchPromise = fetchUrl(url);
        fetchPromises.push(fetchPromise);
    }

   // festch all the promise here
    return Promise.all(fetchPromises)
        .then(results => results)  
        .catch(error => Promise.reject(error));  
};


fetchAllWithErrors(['https://fakestoreapi.com/products', 'https://fakestoreapi.com/product'])
    .then(results => console.log('All data fetched successfully:', results))
    .catch(error => console.error('Error:', error));
