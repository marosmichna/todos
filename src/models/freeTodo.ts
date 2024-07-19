export type FreeTodo = {
    id: string,
    freeName: string,
    freeTodo: {
        priority?: string,
        endDate?: string,
        note?: string,
    }
}