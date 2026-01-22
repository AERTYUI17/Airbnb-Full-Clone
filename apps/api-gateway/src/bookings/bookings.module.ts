import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService],
})
export class BookingsModule {}