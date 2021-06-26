import { BadRequestException, Injectable } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';
import { JsonToYamlConv } from './converters/JsonToYamlConv';
import { load } from 'js-yaml';

@Injectable()
export class YamlService {
  convertToYaml(data: ConvertDto): string {
    const { yamlOrJson } = data;
    const jsonToYamlConv = new JsonToYamlConv();
    try {
      return jsonToYamlConv.parse(JSON.parse(yamlOrJson));
    } catch (e) {
      throw new BadRequestException('String should be json');
    }
  }

  convertToJson(data: ConvertDto) {
    const { yamlOrJson } = data;
    try {
      return load(yamlOrJson);
    } catch (e) {
      throw new BadRequestException('String should be a yaml');
    }
  }
}
