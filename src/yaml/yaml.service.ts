import { BadRequestException, Injectable } from '@nestjs/common';
import { JsonToYamlConv } from './converters/JsonToYamlConv';
import { load } from 'js-yaml';

@Injectable()
export class YamlService {
  convertToYaml(data: string): string {
    const jsonToYamlConv = new JsonToYamlConv();
    try {
      return jsonToYamlConv.parse(JSON.parse(data));
    } catch (e) {
      throw new BadRequestException('String should be json');
    }
  }

  convertToJson(data: string) {
    try {
      return load(data);
    } catch (e) {
      throw new BadRequestException('String should be a yaml');
    }
  }
}
