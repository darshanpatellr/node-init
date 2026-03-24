// asynchronous operations let your program do other work while waiting for tasks
//     like file I/O or network requests to complete.


async function processUser(userId) {
    try {
        const user = await getUser(userId);
        const orders = await getOrders(user.id);
        await processOrders(orders);
        console.log('All done!');
    } catch (err) {
        handleError(err);
    }
}

async function readFiles() {
    try {
        console.log('1. Starting to read files...');
        const data1 = await fs.readFile('file1.txt', 'utf8');
        const data2 = await fs.readFile('file2.txt', 'utf8');
        console.log('2. Files read successfully!');
        return {data1, data2};
    } catch (error) {
        console.error('Error reading files:', error);
    }
}
