import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly completed: boolean;
}