

export interface User {
    id: number
    username: string
    role: string
}


export interface UsersReponse {
    error: boolean
    message: string
    users: User[]
    pages: number
}