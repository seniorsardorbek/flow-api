import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FlowService } from './flow.service';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { QueryDto } from 'src/common/query.dto';

@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @Post()
  create(@Body() createFlowDto: CreateFlowDto) {
    return this.flowService.create(createFlowDto);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.flowService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flowService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlowDto: UpdateFlowDto) {
    return this.flowService.update(+id, updateFlowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flowService.remove(+id);
  }
}
