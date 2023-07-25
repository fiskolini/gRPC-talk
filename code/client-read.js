const {client} = require('./lib/grpcClient')

client.readTodos(null, (err, response) => {
    console.log("Reading todos...")

    if (response && response.items) {
        response.items.forEach(a => console.log(a));
    }
})