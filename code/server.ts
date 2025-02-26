import {status, Server, ServerCredentials, ServerWritableStream} from '@grpc/grpc-js';
import {TodoItem} from "./generated/todo/v1/todo";
import {todoV1PackageDefinition} from "./lib/package-def/todo.v1";

const todos: TodoItem[] = [];
let lastTodoId = 0;

const todoService = {
    CreateTodo: ({request}: { request: TodoItem }, callback: any) => {
        const {text} = request;
        lastTodoId++;
        console.log(`Received request to create a todo: ${text}`)

        const todo = {id: lastTodoId, text};
        todos.push(todo);
        console.log(`Todo ID ${lastTodoId} created successfully.`)
        callback(null, todo);
    },

    ReadTodos: (_call: any, callback: any) => {
        callback(null, {items: todos});
    },

    ReadTodosStream: (call: ServerWritableStream<null, TodoItem>) => {
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
    server.addService(todoV1PackageDefinition.service, todoService);
    server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
        console.log('gRPC server running on port 50051');
    });
}

startServer();
