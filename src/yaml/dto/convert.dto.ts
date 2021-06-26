import { ApiProperty } from '@nestjs/swagger';

export class ConvertDto {
  @ApiProperty()
  yamlOrJson: string;
}
