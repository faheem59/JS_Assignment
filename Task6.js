const fetchAllWithErrors = (urls) => {
    
    const fetchUrl = url => fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log(`error! Status: ${response.status}`);
            }
            return response.json();
        });

    //function, and it’s responsible for creating an array of promises based on the provided URLs. 
    const fetchPromises = urls.map(url => fetchUrl(url));

   
    return Promise.all(fetchPromises)
        .then(results => results)  
        .catch(error => Promise.reject(error));  
};


fetchAllWithErrors(['https://fakestoreapi.com/products', 'https://fakestoreapi.com/product'])
    .then(results => console.log('All data fetched successfully:', results))
    .catch(error => console.error('Error:', error));
