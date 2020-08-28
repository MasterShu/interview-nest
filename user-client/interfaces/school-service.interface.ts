import { Observable } from "rxjs";
import { GetSchoolRequest, GetSchoolResponse } from "./school.interface";

export interface SchoolService {
  get(data: GetSchoolRequest): Observable<GetSchoolResponse>;
}
