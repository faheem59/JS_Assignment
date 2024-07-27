const batchFetch = async (url, batchSize) => {
    const fetchUrl = (url) =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });

    const allData = await fetchUrl(url);

    const batches = [];
    for (let i = 0; i < allData.length; i += batchSize) {
        batches.push(allData.slice(i, i + batchSize));
    }

    const allResults = [];
    for (const batch of batches) {
        try {
            
            allResults.push(...batch);
        } catch (error) {
            return Promise.reject(`Batch fetch failed: ${error.message}`);
        }
    }

    return allResults;
};

const API_URL = 'https://fakestoreapi.com/products';
const BATCH_SIZE = 2;

batchFetch(API_URL, BATCH_SIZE)
    .then(results => console.log('All results:', results))
    .catch(error => console.error('Error:', error));
