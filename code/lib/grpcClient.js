const grpc = require("grpc");
const {todoPackage} = require("./todoPackage");

const client = new todoPackage.Todo("localhost:50051",
    grpc.credentials.createInsecure())

module.exports = {client};