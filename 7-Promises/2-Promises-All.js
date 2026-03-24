//      🔥 Key Concept (Important)

//      Function            |               Behavior
//      --------------------|------------------------------------------------------------
//      Promise.all         |               waits for ALL
//      Promise.race        |               returns FIRST resolved
//      Promise.any	        |               returns FIRST success (ignores reject)


function getUser(userId) {
    return new Promise((resolve, reject) => {
        // Simulating database call
        setTimeout(() => {
            resolve({id: userId, name: 'John'});
        }, 1000);
    });
}

function getUserPosts() {
    return new Promise((resolve, reject) => {
        // Simulating API call
        setTimeout(() => {
            resolve(['Post 1', 'Post 2', 'Post 3']);
        }, 1000);
    });
}

function getUserFollower() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`202K`);
        }, 1000);
    })
}

// Promise all
Promise.all([getUser(123), getUserPosts(), getUserFollower()])
    .then(result => {
        console.log(`Promise all Result: ${result}`);
        console.log(`Result 1: ${JSON.stringify(result[0])}`);
        console.log(`Result 2: ${result[1]}`);
        console.log(`Result 3: ${result[2]}`);
    })