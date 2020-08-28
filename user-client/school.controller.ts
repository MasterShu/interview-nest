import { Controller, Get, Param, Post } from "@nestjs/common";
import { RpcClient, GrpcClient, Service } from "@nestcloud/grpc";
import { join } from "path";
import { SchoolService } from "./interfaces/school-service.interface";
import { School } from "school-server/interfaces/shcool.interface";

@Controller("/schools")
export class SchoolController {
  @RpcClient({
    service: "rpc-service",
    package: "school",
    protoPath: join(__dirname, "./interfaces/school-service.proto"),
  })
  private readonly client: GrpcClient;

  @Service("SchoolService", {
    service: "rpc-server",
    package: "school",
    protoPath: join(__dirname, "./interfaces/school-service.proto"),
  })
  private schoolService: SchoolService;

  @Get("/:schoolId")
  async get(@Param("schoolId") schoolId: number): Promise<any> {
    const data = await this.schoolService.get({ id: schoolId });
    return data;
  }

  @Get("/addSchool/:schoolName")
  async add(@Param("schoolName") schoolName: string): Promise<any> {
    const data = await this.schoolService.add({ schoolName: schoolName });
    return data;
  }
}
