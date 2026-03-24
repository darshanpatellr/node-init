//      1) Get all todos
// curl http://localhost:3000/todos

//      2) Create a new todo

// curl -X POST http://localhost:3000/todos \
//     -H "Content-Type: application/json" \
// -d '{"task":"New Task","completed":false}'

//      3) Update a todo
// curl -X PUT http://localhost:3000/todos/1 \
//     -H "Content-Type: application/json" \
// -d '{"task": "Task Random 1001", "completed":true}'

//      4) Delete a todo
// curl -X DELETE http://localhost:3000/todos/1


const http = require('http');
const {URL} = require('url');

// let todos = [
//     {id: 1, task: 'Task 1', completed: false},
//     {id: 2, task: 'Task 2', completed: false},
//     {id: 3, task: 'Task 3', completed: false},
// ];

let todos = [];

const server = http.createServer((request, resposne) => {
    const {method, url, headers} = request;
    const parsedUrl = new URL(url, `http://${headers.host}`);
    const pathName = parsedUrl.pathname;

    //  Set CORS headers (for development)
    resposne.setHeader('Access-Control-Allow-Origin', '*');
    resposne.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    resposne.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    //  Handle preflight request
    if (method === 'OPTIONS') {
        resposne.writeHead(204);
        resposne.end();
        return;
    }

    //  Route: GET /todos
    if (method === 'GET' && pathName === '/todos') {
        resposne.writeHead(200, {'Content-Type': 'application/json'});
        resposne.end(JSON.stringify({
            statusCode: 200,
            status: 'Success',
            message: 'Todos List get successfully',
            todoList: todos
        }, null, 2));
    }

    // Routes: POST /todos
    else if (method === 'POST' && pathName === '/todos') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const newTodo = JSON.parse(body);
                newTodo.id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
                todos.push(newTodo);
                resposne.writeHead(200, {'Content-Type': 'application/json'});
                resposne.end(JSON.stringify({
                    statusCode: 200,
                    status: 'Success',
                    message: 'Todo add successfully',
                    todoList: todos
                }));
            } catch (error) {
                resposne.writeHead(400, {'Content-Type': 'application/json'});
                resposne.end(JSON.stringify({
                    statusCode: 400,
                    status: 'Error',
                    message: error.message
                }, null, 2));
            }
        });

    }

    //   Route: PUT /todos/:id
    else if (method === 'PUT' && pathName.startsWith('/todos/')) {
        const id = parseInt(pathName.split('/')[2]);
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            try {
                const updatedTodo = JSON.parse(body);
                const index = todos.findIndex(t => t.id === id);

                if (index !== -1) {
                    todos[index] = {...todos[index], ...updatedTodo};
                    resposne.writeHead(200, {'Content-Type': 'application/json'});
                    resposne.end(JSON.stringify({
                        statusCode: 200,
                        status: 'Success',
                        message: 'Todo updated successfully',
                        todoList: todos
                    }));
                } else {
                    resposne.writeHead(404, {'Content-Type': 'application/json'});
                    resposne.end(JSON.stringify({
                        statusCode: 404,
                        status: 'Error',
                        message: 'Todo not found'
                    }, null, 2));
                }

            } catch (error) {
                resposne.writeHead(400, {'Content-Type': 'application/json'});
                resposne.end(JSON.stringify({
                    statusCode: 400,
                    status: 'Error',
                    message: error.message
                }, null, 2));
            }
        });
    }

    //  Route: DELETE /todos/:id
    else if (method === 'DELETE' && pathName.startsWith('/todos/')) {
        const id = parseInt(pathName.split('/')[2]);
        const index = todos.findIndex(t => t.id === id);

        if (index !== -1) {
            todos = todos.filter(t => t.id !== id);
            resposne.writeHead(200, {'Content-Type': 'application/json'});
            resposne.end(JSON.stringify({
                statusCode: 200,
                status: 'Success',
                message: 'Todo deleted successfully',
                todoList: todos
            }));
        } else {
            resposne.writeHead(404, {'Content-Type': 'application/json'});
            resposne.end(JSON.stringify({
                statusCode: 404,
                status: 'Error',
                message: 'Todo not found'
            }, null, 2));
        }
    }

    // 404 Not Found
    else {
        resposne.writeHead(404, {'Content-Type': 'application/json'});
        resposne.end(JSON.stringify({
            statusCode: 404,
            status: 'Error',
            message: `404 Not Found - ${pathName}`
        }, null, 2));
    }


});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});