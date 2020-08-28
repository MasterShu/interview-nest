import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
  GetSchoolRequest,
  GetSchoolResponse,
  AddSchoolRequest,
} from "./interfaces/shcool.interface";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { GetSchoolQuery } from "./queries/impl";
import { addSchoolCommand } from "./commands/impl/add-school.command";

@Controller()
export class SchoolController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod("SchoolService")
  add(data: AddSchoolRequest): Promise<GetSchoolResponse> {
    return this.commandBus.execute(new addSchoolCommand(data.schoolName));
  }

  @GrpcMethod("SchoolService")
  get(data: GetSchoolRequest): Promise<GetSchoolResponse> {
    console.log("school service get invoked");
    return this.queryBus.execute(new GetSchoolQuery(data.id));
  }
}
