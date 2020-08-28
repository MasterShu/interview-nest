import { Module } from "@nestjs/common";
import { BootModule } from "@nestcloud/boot";
import { resolve } from "path";
import { ConsulModule } from "@nestcloud/consul";
import { BOOT, CONSUL } from "@nestcloud/common";
import { ServiceModule } from "@nestcloud/service";
import { LoadbalanceModule } from "@nestcloud/loadbalance";
import { SchoolController } from "./school.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { QueryHandlers } from "./queries/handlers";
import { CommandHandlers } from "./commands/handlers";

@Module({
  imports: [
    BootModule.forRoot({ filePath: resolve(__dirname, "config.yaml") }),
    ConsulModule.forRootAsync({ inject: [BOOT] }),
    ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
    CqrsModule,
  ],
  controllers: [SchoolController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class AppModule {}
