const {client} = require('./lib/grpcClient')

const id = process.argv[2];

client.deleteTodo({id},
    (err, todo) => {
        if (err) throw err;
        console.log(`Todo (${id}) successfully deleted.`, todo)
    }
);