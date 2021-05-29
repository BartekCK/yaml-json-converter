import { Body, Controller, Post } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';
import { YamlService } from './yaml.service';

@Controller()
export class YamlController {
  constructor(private readonly yamlService: YamlService) {}

  @Post('yaml')
  convertToYaml(@Body() data: ConvertDto) {
    return this.yamlService.convertToYaml(data);
  }

  @Post('json')
  convertToJson(@Body() data: ConvertDto) {
    return this.yamlService.convertToJson(data);
  }
}
