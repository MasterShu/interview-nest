import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetSchoolQuery } from "../impl";
import { School } from "school-server/interfaces/shcool.interface";

@QueryHandler(GetSchoolQuery)
export class GetSchoolHandler implements IQueryHandler<GetSchoolQuery> {
  private readonly schools: School[] = [{ id: 1, name: "Test University One" }];

  async execute(query: GetSchoolQuery): Promise<any> {
    const { schoolId } = query;
    // fake result
    const that = this;
    return new Promise((resolve) => {
      resolve({ school: that.schools.find(({ id }) => id === schoolId) });
    });
  }
}
