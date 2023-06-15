

export interface Subcategory {
    id: number
    name: string
    order: number
}


export interface SubcategoriesResponse {
    error: boolean
    message: string
    categories: Subcategory[]
}
