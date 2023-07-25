const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync(`${__dirname}/proto/todo.proto`, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage_V1;
const client = new todoPackage.Todo("localhost:40000",
    grpc.credentials.createInsecure())

client.readTodos(null, (err, response) => {
    console.log("Reading todos...")

    if (response && response.items) {
        response.items.forEach(a => console.log(a));
    }
})