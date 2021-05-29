import { BadRequestException, Injectable } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';
import { JsonToYamlConv } from './converters/JsonToYamlConv';

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

  private calculateInd = (value: string): number => {
    let ind = 0;
    while (value[ind] === ' ') {
      ind++;
    }
    return ind;
  };

  convertToJson(data: ConvertDto): string {
    const { yamlOrJson } = data;
    const arrOrLine: string[] = yamlOrJson.split('\n');
    console.log(this.calculateInd(arrOrLine[0]));
    console.log(arrOrLine[5]);

    return '';
  }
}
