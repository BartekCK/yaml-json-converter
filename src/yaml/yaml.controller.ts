import { Controller, Header, Post } from '@nestjs/common';
import * as JSON_EXAMPLE from '../core/data/jsonExample.json';
import { YamlService } from './yaml.service';
import { ApiBody, ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { PlainBody } from '../core/decorator/plain-body.decorator';
import { yamlInString } from '../core/data/yamlExmaple';

@ApiTags('converters')
@Controller()
export class YamlController {
  constructor(private readonly yamlService: YamlService) {}

  @ApiProduces('text/html')
  @ApiConsumes('text/html')
  @ApiBody({ type: String, required: true, schema: { example: JSON_EXAMPLE } })
  @Post('json/converter/yaml')
  async convertToYaml(@PlainBody() body: string) {
    return this.yamlService.convertToYaml(body);
  }

  @ApiProduces('application/json')
  @ApiConsumes('text/html')
  @Header('content-type', 'application/json')
  @ApiBody({ type: String, required: true, schema: { example: yamlInString } })
  @Post('yaml/converter/json')
  convertToJson(@PlainBody() body: string) {
    return this.yamlService.convertToJson(body);
  }
}
