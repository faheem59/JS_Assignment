const fetchWithRetry = (url, retry) => new Promise((resolve, reject) => {

    // attempts to fetch 
    const attempt = (attempts) => {
        // fetch the url first
        fetch(url)
            .then(response => {
                if (!response) {
                    console.log(`error: ${response}`);
                }
                // return response if url is correct
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => {
                // cehck attempts if url is not corrct then count the attempts first and throw error
                if (attempts > 0) {
                    console.log(`Retrying... Attempts left: ${attempts}`);
                    // if attemp is greater then count and retrying the attem
                    attempt(attempts - 1);
                } else {
                    reject(`Failed after ${retry} retries: ${error.message}`);
                }
            });
    };
// call the attempt
    attempt(retry);
});


fetchWithRetry('https://fakestoreapi.com/product', 3)
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));
