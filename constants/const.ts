export interface ErrorResponse {
    success: boolean;
    message: string;
}
export interface LessonType {
    key: string;
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export interface StudentType {
    key: string;
    name: string;
    email: string;
    phone: string;
    createAt: string;
}
