// Chaining Handling

console.log("Chaining Handling Promise");
const chainingHandling = new Promise((resolve, reject) => {
    console.log("Promise 1 is in pending");
    setTimeout(() => {
        resolve("Step 1 Complete");
    }, 3000);
});
chainingHandling
    .then((res) => {
        console.log("Promise", res);
        console.log("Promise 2 is in progress");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Step 2 complete");
            }, 3000);
        });
    })
    .then((res) => {
        console.log("Promise", res);
    })
    .catch((e) => {
        console.error("Promise failure", e);
    });






