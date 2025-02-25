import { ServerUnaryCall, sendUnaryData, ServerWritableStream } from "@grpc/grpc-js";
import {TodoDeleteRequest, TodoListResponse, TodoRequest, TodoResponse} from "../models/todo";

export interface TodoServiceHandlers {
    createTodo: (call: ServerUnaryCall<TodoRequest, TodoResponse>, callback: sendUnaryData<TodoResponse>) => void;
    readTodos: (call: ServerUnaryCall<{}, TodoListResponse>, callback: sendUnaryData<TodoListResponse>) => void;
    readTodosStream: (call: ServerWritableStream<{}, TodoResponse>) => void;
    deleteTodo: (call: ServerUnaryCall<TodoDeleteRequest, {}>, callback: sendUnaryData<{}>) => void;
}
