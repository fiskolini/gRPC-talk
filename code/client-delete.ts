import {credentials} from '@grpc/grpc-js';
import {todoV1PackageDefinition} from "./lib/package-def/todo.v1";
import {promptQuestion} from "./lib/utils/prompt";

async function main() {
    const id = await promptQuestion('ID of todo to delete?')

    const client = new todoV1PackageDefinition('localhost:50051', credentials.createInsecure());
    client.DeleteTodo({id: Number(id)}, (err: any, response: any) => {
        if (err) {
            console.error('Error deleting todo:', err);
        } else {
            console.log('Deleted todo:', response);
        }
    });
}

main();