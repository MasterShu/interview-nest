import { Module } from "@nestjs/common";
import { GrpcModule } from "@nestcloud/grpc";
import { BootModule } from "@nestcloud/boot";
import { resolve } from "path";
import { ConsulModule } from "@nestcloud/consul";
import { BOOT, CONSUL } from "@nestcloud/common";
import { ServiceModule } from "@nestcloud/service";
import { LoadbalanceModule } from "@nestcloud/loadbalance";
import { TerminusModule } from "@nestjs/terminus";
import { SchoolController } from "./school.controller";

@Module({
  imports: [
    GrpcModule.forRoot(),
    BootModule.forRoot({ filePath: resolve(__dirname, "config.yaml") }),
    ConsulModule.forRootAsync({ inject: [BOOT] }),
    ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
    TerminusModule.forRootAsync({
      useFactory: () => ({
        endpoints: [{ url: "/health", healthIndicators: [] }],
      }),
    }),
  ],
  controllers: [SchoolController],
})
export class AppModule {}
