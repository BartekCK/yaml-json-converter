import { Body, Controller, Post } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';
import { YamlService } from './yaml.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('converters')
@Controller()
export class YamlController {
  constructor(private readonly yamlService: YamlService) {}

  @Post('json/converter/yaml')
  convertToYaml(@Body() data: ConvertDto) {
    return this.yamlService.convertToYaml(data);
  }

  @Post('yaml/converter/json')
  convertToJson(@Body() data: ConvertDto) {
    return this.yamlService.convertToJson(data);
  }
}
