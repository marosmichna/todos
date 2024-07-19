import { JobTodo } from "../models/jobTodo";
import { HomeTodo } from "../models/homeTodo";
import { FreeTodo } from "../models/freeTodo";

// Fetch Data
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(`Request failed with status: ${response.status} message: ${errorMessage}`);
    }
}

/* Job Todo */

// Fetch job todo
export async function fetchJobTodos(): Promise<JobTodo []> {
    const response = await fetchData("https://658d975e7c48dce94739738c.mockapi.io/jobTodo", { method: "GET" });
    return response.json();
}

// Create job todo
export type JobTodoInput = {
    jobName: string,
    jobTodo: {
        priority?: string,
        endDate?: string,
        note?: string
    }
}

export async function createJobTodo(jobTodo: JobTodoInput): Promise<JobTodo> {
    const response = await fetchData("https://658d975e7c48dce94739738c.mockapi.io/jobTodo",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jobTodo)
    });
    return response.json();
}

// Update job todo
export async function updateJobTodo(jobTodoId: string, jobTodo:JobTodoInput): Promise<JobTodo>{
    const response = await fetchData(`https://658d975e7c48dce94739738c.mockapi.io/jobTodo/${jobTodoId}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jobTodo)
    });
    return response.json();
}

// Delete job todo
export async function deleteJobTodo(jobTodoId: string) {
    await fetchData(`https://658d975e7c48dce94739738c.mockapi.io/jobTodo/${jobTodoId}`, { method: "DELETE" });
}

// Fetch job todo (One todo)
export async function fetchJobTodo(jobTodoId: string) {
    const response = await fetchData(`https://658d975e7c48dce94739738c.mockapi.io/jobTodo/${jobTodoId}`, { method: "GET" });
    return response.json();
}




/* Home Todo */

// Fetch home todo
export async function fetchHomeTodos(): Promise<HomeTodo []> {
    const response = await fetchData("https://669a73af9ba098ed61ffb0f9.mockapi.io/homeTodo", { method: "GET" });
    return response.json();
}

// Create home todo
export type HomeTodoInput = {
    homeName: string,
    homeTodo: {
        priority?: string,
        endDate?: string,
        note?: string
    }
}

export async function createHomeTodo(homeTodo: HomeTodoInput): Promise<HomeTodo> {
    const response = await fetchData("https://669a73af9ba098ed61ffb0f9.mockapi.io/homeTodo",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(homeTodo)
    });
    return response.json();
}

// Update home todo
export async function updateHomeTodo(homeTodoId: string, homeTodo:HomeTodoInput): Promise<HomeTodo>{
    const response = await fetchData(`https://669a73af9ba098ed61ffb0f9.mockapi.io/homeTodo/${homeTodoId}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(homeTodo)
    });
    return response.json();
}

// Delete home todo
export async function deleteHomeTodo(homeTodoId: string) {
    await fetchData(`https://669a73af9ba098ed61ffb0f9.mockapi.io/homeTodo/${homeTodoId}`, { method: "DELETE" });
}

// Fetch home todo (One todo)
export async function fetchHomeTodo(homeTodoId: string) {
    const response = await fetchData(`https://669a73af9ba098ed61ffb0f9.mockapi.io/homeTodo/${homeTodoId}`, { method: "GET" });
    return response.json();
}




/* Free Time Todo */

// Fetch free todo
export async function fetchFreeTodos(): Promise<FreeTodo []> {
    const response = await fetchData("https://669a73af9ba098ed61ffb0f9.mockapi.io/freeTodo", { method: "GET" });
    return response.json();
}

// Create free todo
export type FreeTodoInput = {
    freeName: string,
    freeTodo: {
        priority?: string,
        endDate?: string,
        note?: string
    }
}

export async function createFreeTodo(freeTodo: FreeTodoInput): Promise<FreeTodo> {
    const response = await fetchData("https://669a73af9ba098ed61ffb0f9.mockapi.io/freeTodo",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(freeTodo)
    });
    return response.json();
}

// Update free todo
export async function updateFreeTodo(freeTodoId: string, freeTodo:FreeTodoInput): Promise<FreeTodo>{
    const response = await fetchData(`https://669a73af9ba098ed61ffb0f9.mockapi.io/freeTodo/${freeTodoId}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(freeTodo)
    });
    return response.json();
}

// Delete free todo
export async function deleteFreeTodo(freeTodoId: string) {
    await fetchData(`https://669a73af9ba098ed61ffb0f9.mockapi.io/freeTodo/${freeTodoId}`, { method: "DELETE" });
}

// Fetch home todo (One todo)
export async function fetchFreeTodo(freeTodoId: string) {
    const response = await fetchData(`https://669a73af9ba098ed61ffb0f9.mockapi.io/freeTodo/${freeTodoId}`, { method: "GET" });
    return response.json();
}