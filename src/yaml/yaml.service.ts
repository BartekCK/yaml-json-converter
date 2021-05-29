import { BadRequestException, Injectable } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';

@Injectable()
export class YamlService {
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
      space += '  ';
    }
    return space;
  };

  createDashForArr = (val: number): string => {
    let dash = '';
    for (let i = 0; i < val; i++) {
      dash += '- ';
    }
    return dash;
  };

  private inner = (
    value: any,
    ind: number,
    isArr = false,
    arrLevel = 0,
    fistArrEl?: any,
  ) => {
    if (Array.isArray(value)) {
      value.forEach((el) => {
        this.inner(
          el,
          ind,
          true,
          Array.isArray(el) ? ++arrLevel : arrLevel,
          fistArrEl ? fistArrEl : Array.isArray(el) ? el[0] : undefined,
        );
      });
    } else if (typeof value === 'object') {
      this.isObject(value, isArr ? ind : ++ind, isArr, arrLevel);
    } else {
      if (isArr) {
        this.mainValue += `\n${this.createSpace(
          ind + (fistArrEl === value ? 0 : arrLevel),
        )}${
          fistArrEl === value ? this.createDashForArr(arrLevel) : ''
        }- ${value}`;
      } else {
        this.mainValue += ` ${value}`;
      }
    }
  };

  private isObject = (
    json: Object,
    ind: number,
    isArr = false,
    arrLevel = 0,
  ) => {
    if (typeof json === 'object') {
      Object.entries(json).forEach(([key, value]) => {
        if (isArr) {
          const firstKeyIObjectInsideArr: string = Object.keys(json)[0];
          this.mainValue += `\n${this.createSpace(ind)}${
            firstKeyIObjectInsideArr === key ? `- ${key}` : `  ${key}`
          }:`;
          this.inner(value, typeof value === 'object' ? ++ind : ind);
        } else {
          this.mainValue += '\n' + this.createSpace(ind) + key + ':';
          this.inner(value, ind);
        }
      });
    }
  };
}
