import { BadRequestException, Injectable } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';
import { equals } from 'ramda';

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

  private createSpace = (num: number): string => {
    let space = '';
    for (let i = 0; i < num; i++) {
      space += '  ';
    }
    return space;
  };

  private inner = (
    value: any,
    ind: number,
    isArr = false,
    arrLevel = 0,
    parent?: any[],
  ) => {
    if (Array.isArray(value)) {
      value.forEach((el) => {
        this.inner(
          el,
          ind,
          true,
          Array.isArray(el) ? ++arrLevel : arrLevel,
          value,
        );
      });
    } else if (typeof value === 'object') {
      this.isObject(value, isArr ? ind : ++ind, isArr);
    } else {
      if (isArr) {
        const fistArrEl = parent[0];
        this.mainValue += `\n${this.createSpace(
          ind +
            (fistArrEl === value
              ? arrLevel > 0
                ? arrLevel - 1
                : 0
              : arrLevel),
        )}${equals(fistArrEl, value) && arrLevel > 0 ? '- ' : ''}- ${value}`;
      } else {
        this.mainValue += ` ${value}`;
      }
    }
  };

  private isObject = (
    json: Record<string, any>,
    ind: number,
    isArr = false,
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
