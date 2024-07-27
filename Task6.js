const fetchAllWithErrors = (urls) => {
    
    const fetchUrl = url => fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });

    
    const fetchPromises = urls.map(url => fetchUrl(url));

   
    return Promise.all(fetchPromises)
        .then(results => results)  
        .catch(error => Promise.reject(error));  
};


fetchAllWithErrors(['https://fakestoreapi.com/products', 'https://fakestoreapi.com/products/1'])
    .then(results => console.log('All data fetched successfully:', results))
    .catch(error => console.error('Error:', error));
