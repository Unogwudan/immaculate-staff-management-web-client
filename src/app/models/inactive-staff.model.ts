import { Employee } from "../interfaces/employee.interface";

export class InactiveStaff {
    constructor(
        public inactiveStaffId: Employee,
        public reason: string,
        public dateMadeInactive: Date     
    ){}
}
