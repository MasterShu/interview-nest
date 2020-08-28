import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { addSchoolCommand } from "../impl/add-school.command";
import { School } from "school-server/interfaces/shcool.interface";

@CommandHandler(addSchoolCommand)
export class addSchoolHandler implements ICommandHandler<addSchoolCommand> {
  execute(command: addSchoolCommand): Promise<School> {
    const { schoolName } = command;
    // fake result
    const result: School = { id: 10, name: schoolName };
    return new Promise((resolve) => {
      resolve(result);
    });
  }
}
