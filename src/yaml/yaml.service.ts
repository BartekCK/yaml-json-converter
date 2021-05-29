import { Injectable } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';

@Injectable()
export class YamlService {
  convertToYaml(data: ConvertDto): string {
    return '';
  }

  convertToJson(data: ConvertDto): string {
    return '';
  }
}
