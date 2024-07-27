console.log("Program started");

const firstPromise = new Promise((resolve) => {
    console.log("Promise is pending...");
    setTimeout(() => {
        resolve({ data: "Hello, Binmile!", error: null });
    }, 5000);
});


console.log("Program in progress...");


firstPromise
    .then((result) => {
        console.log("First promise resolved with:", result);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("First promise chain complete!");
            }, 2000);
        });
    })
    .then((message) => {
        console.log(message);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Second promise chain complete!");
            }, 10000);
        });
    })
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error("Promise chain failed:", error);
    });



//Why does it work this way?

// Promises work this way because each.then() returns a new promise,
//     which ensures that the next.then() waits for the previous one to resolve.
//     This allows for chaining of asynchronous tasks,
//     where each step depends on the completion of the previous one.
//     It maintains a clear sequence and handles errors through a structured approach.