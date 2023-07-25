const {client} = require('./lib/grpcClient')

const call = client.readTodosStream();

call.on("data", item => {
    console.log("Received item from server:", item)
})
call.on("end", () => console.log("server done!"));