import { Module } from '@nestjs/common';
import { YamlController } from './yaml.controller';
import { YamlService } from './yaml.service';

@Module({
  controllers: [YamlController],
  providers: [YamlService],
})
export class YamlModule {}
