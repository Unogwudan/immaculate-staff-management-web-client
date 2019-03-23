export interface Team {
    id: number;
    name: string;
    dateAdded: Date;
    departmentId: {
        id: number;
        name: string;
    };
}