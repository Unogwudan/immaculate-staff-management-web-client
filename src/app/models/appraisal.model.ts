import { AppraisalInterface } from '../interfaces/appraisal.interface';

export class AppraisalModel {
  public appraisalId: number;
  public appraisedComments: String;
  public dateAppraised: any;
  public staffIdAppraised: AppraisalInterface;
  public appraisedByStaffId: AppraisalInterface;
  public appraisedStaffDept: string;
  constructor() {}
}
