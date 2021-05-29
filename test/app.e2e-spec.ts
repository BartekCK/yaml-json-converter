import { Test, TestingModule } from '@nestjs/testing';
import { YamlService } from '../src/yaml/yaml.service';
import * as JSON_EXAMPLE from './__mock__/jsonExample.json';

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
    expect(result).toEqual('');
  });
});
