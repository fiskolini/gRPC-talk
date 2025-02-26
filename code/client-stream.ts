import {credentials, ClientReadableStream} from '@grpc/grpc-js';
import {todoV1PackageDefinition} from "./lib/package-def/todo.v1";

async function main() {
    const client = new todoV1PackageDefinition('localhost:50051', credentials.createInsecure());
    const stream: ClientReadableStream<any> = client.ReadTodosStream({});

    stream.on('data', (todo: any) => {
        console.log('Streamed todo:', todo);
    });
    stream.on('end', () => {
        console.log('Stream ended');
    });
}

main();