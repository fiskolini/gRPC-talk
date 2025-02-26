import path from "path";
import {loadSync} from "@grpc/proto-loader";
import {loadPackageDefinition} from "@grpc/grpc-js";

const PROTO_PATH = path.join(__dirname, '../../proto/todo/v1/todo.proto');
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

export const todoV1PackageDefinition = (loadPackageDefinition(packageDefinition) as any).todoPackage.v1.Todo;