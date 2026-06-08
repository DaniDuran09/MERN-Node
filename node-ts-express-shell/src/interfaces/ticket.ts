

export interface Ticket {
    id: string;
    number: number;
    createdAt: Date;
    handleAtDesk?: string; // desk 1
    handleAt?: Date;
    done: boolean;
}