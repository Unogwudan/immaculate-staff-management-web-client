export class AttendanceInterface {
  public attendanceClockIn: any;
  public attendanceClockOut: any;
  public attendanceComments: string;
  public attendanceDate: any;
  public attendanceStaffId: { firstName: string, lastName: string };
  public staffId: string ;
  public firstName: string;
  public lastName: string;
  public department: string;
  constructor() {}
}
