import { Test, TestingModule } from '@nestjs/testing';
import { YamlService } from '../src/yaml/yaml.service';
import * as JSON_EXAMPLE from './__mock__/jsonExample.json';
import { BadRequestException } from '@nestjs/common';
import { yamlInString } from './__mock__/results';

describe('AppController (e2e)', () => {
  let yamlService: YamlService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [YamlService],
    }).compile();

    yamlService = moduleFixture.get<YamlService>(YamlService);
  });

  it('should create yaml', () => {
    const result: string = yamlService.convertToYaml({
      yamlOrJson: JSON.stringify(JSON_EXAMPLE),
    });
    console.log(result);
    expect(result).toEqual(yamlInString);
  });

  it('should throw error because of incorrect json', () => {
    const mock = JSON.stringify(JSON_EXAMPLE).slice(100);
    expect(() => yamlService.convertToYaml({ yamlOrJson: mock })).toThrow(
      BadRequestException,
    );
  });

  it('should create json', () => {
    // const mock = 'glossary:\n' + '  title: example glossary\n';
    const mock = yamlInString;
    yamlService.convertToJson({ yamlOrJson: mock });
  });
});
