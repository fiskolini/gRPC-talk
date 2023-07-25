const {client} = require('./lib/grpcClient')

const text = process.argv[2];

client.createTodo({
    id: -1,
    text: text
}, (err, response) => {
    const {id} = response;

    console.log(`Todo (${id}) successfully created.`)
});