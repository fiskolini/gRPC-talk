import {loadPackageDefinition, credentials, ClientReadableStream} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '/proto/todo.proto');
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const todoProto = loadPackageDefinition(packageDefinition) as any;
const client = new todoProto.todoPackage_V1.Todo('localhost:50051', credentials.createInsecure());

// Create a new todo
client.CreateTodo({ text: 'Buy groceries' }, (err: any, response: any) => {
    if (err) {
        console.error('Error creating todo:', err);
    } else {
        console.log('Created todo:', response);
    }
});

// Read all todos
client.ReadTodos({}, (err: any, response: any) => {
    if (err) {
        console.error('Error reading todos:', err);
    } else {
        console.log('Todos:', response.items);
    }
});

// Read todos as a stream
const stream: ClientReadableStream<any> = client.ReadTodosStream({});
stream.on('data', (todo: any) => {
    console.log('Streamed todo:', todo);
});
stream.on('end', () => {
    console.log('Stream ended');
});

// Delete a todo
client.DeleteTodo({ id: 1 }, (err: any, response: any) => {
    if (err) {
        console.error('Error deleting todo:', err);
    } else {
        console.log('Deleted todo:', response);
    }
});
