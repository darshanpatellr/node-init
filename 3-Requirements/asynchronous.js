// 1. Callbacks (traditional)

function fetchData(callback) {
    setTimeout(() => {
        callback("Data Retrieved!");
    }, 1000);
}

// fetchData((data) => {
//     console.log(data);
// });


// 2. Promises (ES6+)

const fetchDataPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Response Data Promise!");
        });
    });
};

// 3. Async/Await (ES8+)

async function getData() {
    const response = await fetchDataPromise();
    console.log(response);
}

getData().then(r => {
        console.log("getData Finished!");
    }
);




