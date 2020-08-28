import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { IBoot, BOOT } from "@nestcloud/common";
import { Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const boot = app.get<IBoot>(BOOT);
  await app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${boot.get("service.port")}`,
      package: "school",
      protoPath: join(__dirname, "./school.proto"),
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(null);
}

bootstrap();
