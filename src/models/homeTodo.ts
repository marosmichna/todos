export type HomeTodo = {
    id: string,
    homeName: string,
    homeTodo: {
        priority?: string,
        endDate?: string,
        note?: string,
    }
}