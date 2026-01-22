import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPropertyDto: CreatePropertyDto, @Request() req) {
    return this.propertiesService.create(createPropertyDto, req.user.userId);
  }

  @Get()
  findAll(
    @Query('city') city?: string,
    @Query('country') country?: string,
    @Query('propertyType') propertyType?: string,
  ) {
    return this.propertiesService.findAll({ city, country, propertyType });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @Request() req,
  ) {
    return this.propertiesService.update(id, updatePropertyDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.propertiesService.remove(id, req.user.userId);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard)
  publish(@Param('id') id: string, @Request() req) {
    return this.propertiesService.publish(id, req.user.userId);
  }
}