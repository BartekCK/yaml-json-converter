import { BadRequestException, Injectable } from '@nestjs/common';
import { ConvertDto } from './dto/convert.dto';
import { json } from 'express';

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
      space += '  ';
    }
    return space;
  };

  private inner = (value: any, ind: number, isArr = false) => {
    if (Array.isArray(value)) {
      value.forEach((el) => {
        this.inner(el, ind, true);
      });
    } else if (typeof value === 'object') {
      this.isObject(value, isArr ? ind : ++ind, isArr);
    } else {
      this.mainValue += isArr
        ? `\n${this.createSpace(ind)}- ${value}`
        : ` ${value}`;
    }
  };

  private isObject = (json: Object, ind: number, isArr = false) => {
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
    } else {
      this.inner(json, ind);
    }
  };
}
