import {loadPackageDefinition, status, Server, ServerCredentials, ServerWritableStream} from '@grpc/grpc-js';
import {loadSync} from '@grpc/proto-loader';
import {join} from 'path';
import {Todo, TodoRequest} from "./models/todo";

const PROTO_PATH = join(__dirname, '/proto/todo.proto');
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const todoProto = loadPackageDefinition(packageDefinition) as any;
const todos: { id: number; text: string }[] = [];
let nextId = 1;

const todoService = {
    CreateTodo: ({request}: { request: TodoRequest }, callback: any) => {
        const {text} = request;
        console.log(`Received request to create a todo: ${text}`)
        const todo = {id: nextId++, text};
        todos.push(todo);
        callback(null, todo);
    },

    ReadTodos: (_call: any, callback: any) => {
        callback(null, {items: todos});
    },

    ReadTodosStream: (call: ServerWritableStream<null, Todo>) => {
        todos.forEach((todo) => call.write(todo));
        call.end();
    },

    DeleteTodo: (call: any, callback: any) => {
        const index = todos.findIndex((t) => t.id === call.request.id);
        if (index === -1) {
            return callback({code: status.NOT_FOUND, message: 'Todo not found'});
        }
        const [deletedTodo] = todos.splice(index, 1);
        callback(null, deletedTodo);
    },
};

function startServer() {
    const server = new Server();
    server.addService(todoProto.todoPackage_V1.Todo.service, todoService);
    server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
        console.log('gRPC server running on port 50051');
    });
}

startServer();
