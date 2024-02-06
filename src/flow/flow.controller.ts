import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { QueryDto } from 'src/common/query.dto';
import { IsLoggedIn } from 'src/users/auth/is-loggin.guard';
import { CreateFlowDto } from './dto/create-flow.dto';
import { FlowService } from './flow.service';

@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}
  
  @Post()
  create(@Body() createFlowDto: CreateFlowDto) {
    return this.flowService.create(createFlowDto);
  }
  
  @UseGuards(IsLoggedIn)
  @Get()
  findAll(@Query() query: QueryDto) {
    return this.flowService.findAll(query);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowService.remove(+id);
  }
}
