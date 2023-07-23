const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync(`${__dirname}/../todo.proto`, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage_V1;

const server = new grpc.Server();
server.bind("0.0.0.0:40000",
    grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service,
    {
        "createTodo": createTodo,
        "readTodos": readTodos,
        "readTodosStream": readTodosStream
    });
server.start();

const todos = []

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