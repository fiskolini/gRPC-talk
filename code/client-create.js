const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync(`${__dirname}/proto/todo.proto`, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage_V1;

const text = process.argv[2];

const client = new todoPackage.Todo("localhost:40000",
    grpc.credentials.createInsecure())

client.createTodo({
    id: -1,
    text: text
}, (err, response) => {
    const {id} = response;

    console.log(`Todo (${id}) successfully created.`)
});