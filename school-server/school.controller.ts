import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
  GetSchoolRequest,
  GetSchoolResponse,
  School,
} from "./interfaces/shcool.interface";

@Controller()
export class SchoolController {
  private readonly schools: School[] = [{ id: 1, name: "Test University One" }];

  @GrpcMethod("SchoolService")
  get(data: GetSchoolRequest): GetSchoolResponse {
    console.log("school service get invoked");
    return {
      school: this.schools.find(({ id }) => id === data.id),
    };
  }
}
