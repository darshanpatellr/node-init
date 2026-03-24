// Promises in Node.js provide a cleaner way to handle asynchronous operations compared to traditional callbacks.
// Promises represent the completion (or failure) of an asynchronous operation and its result.

// Pending: Initial state, operation not completed
// Fulfilled: Operation completed successfully
// Rejected: Operation failed

function getUser(userId) {
    return new Promise((resolve, reject) => {
        // Simulating database call
        setTimeout(() => {
            resolve({id: userId, name: 'John'});
        }, 1000);
    });
}

function getUserPosts(user) {
    return new Promise((resolve, reject) => {
        // Simulating API call
        setTimeout(() => {
            resolve(['Post 1', 'Post 2', 'Post 3']);
        }, 1000);
    });
}

function getUserFollower(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`202K`);
        }, 1000);
    })
}

// Chain the promises
getUser(123)
    .then(user => {
        console.log('User:', user);
        return getUserPosts(user);
    })
    .then(posts => {
        console.log('Posts:', posts);
        return getUserFollower(posts);
    })
    .then(followers => {
        console.log('Followers:', followers);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        console.log('Operation completed!');
    });

