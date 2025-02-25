export interface Todo {
    id: number;
    text: string;
}

export interface TodoRequest {
    text: string;
}

export interface TodoResponse {
    id: number;
    text: string;
}

export interface TodoListResponse {
    items: TodoResponse[];
}

export interface TodoDeleteRequest {
    id: number;
}
