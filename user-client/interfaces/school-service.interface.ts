import { Observable } from "rxjs";
import {
  GetSchoolRequest,
  GetSchoolResponse,
  AddSchoolRequest,
  School,
} from "./school.interface";

export interface SchoolService {
  get(data: GetSchoolRequest): Observable<GetSchoolResponse>;
  add(data: AddSchoolRequest): Observable<School>;
}
