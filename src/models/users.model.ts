

export interface User {
    id: number
    username: string
    role_id: number
}


export interface UsersReponse {
    error: boolean
    message: string
    users: User[]
    pages: number
}


export interface RegisterResponse {
    error: boolean
    message: string
    user: User
}