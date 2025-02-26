import {credentials} from '@grpc/grpc-js';
import {todoV1PackageDefinition} from "./lib/package-def/todo.v1";

async function main() {
    const client = new todoV1PackageDefinition('localhost:50051', credentials.createInsecure());

    client.ReadTodos({}, (err: any, response: any) => {
        if (err) {
            console.error('Error reading todos:', err);
        } else {
            console.log('Todos:', response.items);
        }
    });
}

main();