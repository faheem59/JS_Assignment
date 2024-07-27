//using aync/await
function download(url) {
    return new Promise((resolve, reject) => {
        console.log("Starting to download data from", url);
        setTimeout(function down() {
            console.log("Downloading completed");
            const content = "ABCDEF";
            resolve(content);
        }, 10000);
    })
}
function writeFile(data) {
    return new Promise((resolve, reject) => {
        console.log("Started writing a file with", data);
        setTimeout(function wrtie() {
            console.log("Completed writing the data in a file");
            const filename = "file.txt";
            resolve
            resolve(filename);
        }, 5000);
    })
}
function upload(url, file) {
    return new Promise((resolve, reject) => {
        console.log("Started uploading", file, "on", url);
        setTimeout(function up() {
            console.log("upload completed");
            const response = "SUCCESS";
            resolve(response);
        }, 2000);
    })
}
async function downloadProcessUpload() {
    try {
        const content = await download("www.xyz.com");
        console.log("We are now going to process the downloaded data");
        const filename = await writeFile(content);
        console.log("We have downloaded and written the file, now will upload");
        const response = await upload("www.upload.com", filename);
        console.log("We have uploaded with", response);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}
downloadProcessUpload();