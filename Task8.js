const fetchAnyWithErrors = (urls) => {

    // fetch urrl first 
    const fetchUrl = url =>
        fetch(url)
            .then(resposne => {
                if (!resposne) {
                    console.log(`error! ${response}`)
                }
                return resposne.json();
            });
    //function, and it’s responsible for creating an array of promises based on the provided URLs. 
    for (const url of urls) {
        const fetchPromise = fetchUrl(url)
            .catch(error => ({ error: error.message }));
        fetchPromises.push(fetchPromise);
    }
    return Promise.all(fetchPromise)
        .then(res => {
            const successfully = res.find(result => !result.error);
            if (successfully) {
                return successfully;
            }

            const aggregate = res.filter(result => result.error).map(result => result.error).join('; ')

            return Promise.reject(`All are failed ${aggregate.error}`);
        })

}

fetchAnyWithErrors(['https://fakestoreapi.com/products', 'https://fakestoreapi.com/products/1'])
    .then(data => console.log('Data fetched successfully:', data))
    .catch(error => console.error('Error:', error));