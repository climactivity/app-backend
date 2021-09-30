import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateAdminconfigDto } from './dto/create-adminconfig.dto';
import { UpdateAdminconfigDto } from './dto/update-adminconfig.dto';
import { Adminconfig } from './entities/adminconfig.entity';

@Controller('admin/config')
export class AdminconfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  find() {
    return {
      "nk_server_host": this.configService.get("nk_server_host"),
      "nk_server_key": this.configService.get("nk_server_key")
    }
  }
}
