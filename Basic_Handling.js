//Basic Handling

console.log("Basic Handling Promise");
const basicHandling = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("resovle in 3 second");
    },3000)
    setTimeout(()=>{
        reject("reject in 2 second");
    }, 2000)
})
console.log("Handleing is in Progress");
console.log("Pending ", basicHandling);
basicHandling
.then((ans)=>{
    console.log("Promoise Complete", ans);
})
.catch((e)=>{
    console.error("Promise failure", e);
})