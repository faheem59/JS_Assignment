const fetchWithTimeout = (url, timeout) => {
    //check timeout Promise
    const timeoutPromise = new Promise((reject) =>
        setTimeout(() =>
            reject(('timed out')),
            timeout)
    );

    //fetch promise fisrt festch the url
    const fetchPromise = fetch(url)
        .then(response => {
            if (!response) {
                console.log(`error! ${response}`);
            }
            // if fetch promise is reoslve then return the data;
            return response.json();
        });
    
    //return promise if first one is resolve or reject accordingly 
    return Promise.race([fetchPromise, timeoutPromise]);
};

// call to check the function withe 5 sec fist
fetchWithTimeout('https://fakestoreapi.com/products', 5000)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
