import {credentials} from '@grpc/grpc-js';
import {todoV1PackageDefinition} from "./lib/package-def/todo.v1";
import {promptQuestion} from "./lib/utils/prompt";

async function main() {
    const text = await promptQuestion('What is your todo?')

    const client = new todoV1PackageDefinition('localhost:50051', credentials.createInsecure());
    client.CreateTodo({text}, (err: any, response: any) => {
        if (err) {
            console.error('Error creating todo:', err);
        } else {
            console.log('Created todo:', response);
        }
    });
}

main();