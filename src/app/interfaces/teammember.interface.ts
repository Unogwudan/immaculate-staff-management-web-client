export interface TeamMember {
    id: number;
    name: string;
    dateAdded: Date;
    staffId: {
        id: number;
        firstName: string;
        lastName: string;
    };
    teamId: {
        id: number;
        name: string;
    };
}