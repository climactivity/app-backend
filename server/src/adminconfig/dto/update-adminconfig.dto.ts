import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminconfigDto } from './create-adminconfig.dto';

export class UpdateAdminconfigDto extends PartialType(CreateAdminconfigDto) {}
