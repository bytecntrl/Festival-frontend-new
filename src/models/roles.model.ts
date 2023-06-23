

export interface Role {
    id: number
    name: string
    permissions: string
}


export interface RolesReponse {
    error: boolean
    message: string
    roles: Role[]
    pages: number
}

export interface RolesNameReponse {
    error: boolean
    message: string
    roles: Record<number, string>
}
