const grpc = require("grpc");
const {todoPackage} = require('./lib/todoPackage')

const server = new grpc.Server();
server.bind("0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure());

let todos = [];

server.addService(todoPackage.Todo.service, {
    createTodo: createTodo,
    readTodos: readTodos,
    readTodosStream: readTodosStream,
    deleteTodo: deleteTodo,
});
server.start();


function createTodo(call, callback) {
    const todoItem = {
        id: todos.length + 1,
        text: call.request.text
    }
    console.log('New todo item added.', todoItem)
    todos.push(todoItem)
    callback(null, todoItem);
}

function readTodosStream(call) {
    console.log('Reading Todos stream...');
    todos.forEach(t => call.write(t));
    call.end();
}

function readTodos(call, callback) {
    console.log('Reading Todos...');
    callback(null, {"items": todos})
}


function deleteTodo(call, callback) {
    const todoId = call.request.id;
    const deletedTodo = todos.filter(({id}) => id === todoId);
    todos = todos.filter(({id}) => id !== todoId);

    callback(null, {});

    console.log('Todo deleted', deletedTodo)
}