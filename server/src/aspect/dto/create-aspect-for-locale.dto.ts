import { PartialType } from '@nestjs/mapped-types';
import { LocalizedAspectDto } from './localized-aspect.dto'
export class CreateAspectForLocaleDto extends PartialType(LocalizedAspectDto) {}