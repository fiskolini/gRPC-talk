const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync(`${__dirname}/proto/todo.proto`, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage_V1;

const client = new todoPackage.Todo("localhost:40000",
    grpc.credentials.createInsecure())

const call = client.readTodosStream();
call.on("data", item => {
    console.log("Received item from server:", item)
})
call.on("end", () => console.log("server done!"));