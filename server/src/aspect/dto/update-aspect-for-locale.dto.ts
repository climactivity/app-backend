import { PartialType } from '@nestjs/mapped-types';
import { CreateAspectForLocaleDto } from './create-aspect-for-locale.dto';

export class UpdateAspectForLocaleDto extends PartialType(CreateAspectForLocaleDto) {}
