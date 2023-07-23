const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync(`${__dirname}/../todo.proto`, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage_V1;

const text = process.argv[2];

const client = new todoPackage.Todo("localhost:40000",
    grpc.credentials.createInsecure())

client.createTodo({
    id: -1,
    text: text
}, (err, response) => {

    console.log("Todo successfully created.", response)

})

client.readTodos(null, (err, response) => {
    console.log("Reading todos...")

    if (response.items) {
        response.items.forEach(a => console.log(a));
    }
})

/*


const call = client.ReadTodosStream();
call.on("data", item => {
    console.log("received item from server " + JSON.stringify(item))
})

call.on("end", () => console.log("server done!"))
 */