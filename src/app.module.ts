import { Module } from '@nestjs/common';
import { YamlModule } from './yaml/yaml.module';

@Module({
  imports: [YamlModule],
})
export class AppModule {}
