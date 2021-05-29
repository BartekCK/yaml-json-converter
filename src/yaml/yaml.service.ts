import { BadRequestException, Injectable } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';

@Injectable()
export class YamlService {
  private indent = 0;
  private mainValue = '';

  convertToYaml(data: ConvertDto): string {
    const { yamlOrJson } = data;
    const jsonValue = { ...JSON.parse(yamlOrJson) };
    this.isObject(jsonValue, 0);
    console.log(this.mainValue);
    return '';
  }

  convertToJson(data: ConvertDto): string {
    return '';
  }

  createSpace = (num: number): string => {
    let space = '';
    for (let i = 0; i < num; i++) {
      space += '   ';
    }
    return space;
  };

  private isObject = (json: Object, ind: number) => {
    Object.entries(json).forEach(([key, value]) => {
      this.mainValue += '\n' + this.createSpace(ind) + key + ':';
      if (Array.isArray(value)) {
        value.forEach((el, index) => {
          console.log(el);
          this.isObject(el, ind);
        });
      } else if (typeof value === 'object') {
        this.isObject(value, ++ind);
      } else {
        this.mainValue += value;
      }
    });
  };

  private toYaml = (json: Object) => {
    // Object.entries(json).forEach(([key, value]) => {
    //   this.mainValue += '\n' + key + ':';
    //   if (typeof value === 'object') {
    //     this.indent++;
    //     Object.entries(json).forEach(([innerKey, innerValue]) => {
    //
    //     }
    //   })
    //   this.indent = 0;
    // });
  };
}
