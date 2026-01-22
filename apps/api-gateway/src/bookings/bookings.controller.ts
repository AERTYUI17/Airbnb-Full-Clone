import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingsService.create(createBookingDto, req.user.userId);
  }

  @Get('my-bookings')
  findMyBookings(@Request() req) {
    return this.bookingsService.findAllByGuest(req.user.userId);
  }

  @Get('host-bookings')
  findHostBookings(@Request() req) {
    return this.bookingsService.findAllByHost(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.bookingsService.findOne(id, req.user.userId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Request() req) {
    return this.bookingsService.cancel(id, req.user.userId);
  }

  @Patch(':id/confirm')
  confirm(@Param('id') id: string, @Request() req) {
    return this.bookingsService.confirm(id, req.user.userId);
  }
}