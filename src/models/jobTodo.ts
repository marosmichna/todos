export type JobTodo = {
    id: string,
    jobName: string,
    jobTodo: {
        priority?: string,
        endDate?: string,
        note?: string,
    }
}