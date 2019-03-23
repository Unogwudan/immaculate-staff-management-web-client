export interface Department {
    id: number;
    name: string;
    dateAdded: Date;
    divisionId: {
        id: number;
        name: string;
    };
    hod: {
        id: string;
        firstName: string;
        lastName: string;
    }
    
}