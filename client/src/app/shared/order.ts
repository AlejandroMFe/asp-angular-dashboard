import { Customer } from './customer';

export interface Order {
    id: number;
    customer: Customer;
    total: number;
    placed: Date;
    completed: Date;
    status: string;
}

export const SAMPLE_ORDERS: Order[] = [
    {
        id: 1,
        customer:
        {
            id: 1,
            name: "John Doe",
            email: "johnDoe@gmail.com",
            state: "CO"
        },
        total: 230,
        placed: new Date(2022, 15, 3),
        completed: new Date(2022, 15, 2),
        status: "Complete"
    },
    {
        id: 2, customer:
            { id: 1, name: "John Doe", email: "johnDoe@gmail.com", state: "CO" }, total: 230, placed: new Date(2022, 15, 3), completed: new Date(2022, 15, 2), status: "Complete"
    },
    {
        id: 3, customer:
            { id: 1, name: "John Doe", email: "johnDoe@gmail.com", state: "CO" }, total: 230, placed: new Date(2022, 15, 3), completed: new Date(2022, 15, 2), status: "Complete"
    },
    {
        id: 4, customer:
            { id: 1, name: "John Doe", email: "johnDoe@gmail.com", state: "CO" }, total: 230, placed: new Date(2022, 15, 3), completed: new Date(2022, 15, 2), status: "Complete"
    },
    {
        id: 5, customer:
            { id: 1, name: "John Doe", email: "johnDoe@gmail.com", state: "CO" }, total: 230, placed: new Date(2022, 15, 3), completed: new Date(2022, 15, 2), status: "Complete"
    }
  ]