import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, guestId: string) {
    const { propertyId, checkIn, checkOut, guests } = createBookingDto;

    // Validar fechas
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const now = new Date();

    if (checkInDate < now) {
      throw new BadRequestException('Check-in date must be in the future');
    }

    if (checkOutDate <= checkInDate) {
      throw new BadRequestException('Check-out date must be after check-in date');
    }

    // Verificar que la propiedad existe y está publicada
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.status !== 'PUBLISHED') {
      throw new BadRequestException('Property is not available for booking');
    }

    if (guests > property.maxGuests) {
      throw new BadRequestException(
        `Property allows maximum ${property.maxGuests} guests`,
      );
    }

    // Verificar disponibilidad (no hay reservas confirmadas en esas fechas)
    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        propertyId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [
          {
            checkIn: { lte: checkOutDate },
            checkOut: { gte: checkInDate },
          },
        ],
      },
    });

    if (conflictingBooking) {
      throw new BadRequestException('Property is not available for selected dates');
    }

    // Calcular precio total
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalPrice = property.price * nights;

    // Crear la reserva
    const booking = await this.prisma.booking.create({
      data: {
        propertyId,
        guestId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        totalPrice,
        status: 'PENDING',
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            country: true,
            images: true,
          },
        },
        guest: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    return this.formatBooking(booking);
  }

  async findAllByGuest(guestId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { guestId },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            country: true,
            images: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return bookings.map((b) => this.formatBooking(b));
  }

  async findAllByHost(hostId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        property: {
          hostId,
        },
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            country: true,
            images: true,
          },
        },
        guest: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return bookings.map((b) => this.formatBooking(b));
  }

  async findOne(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            host: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        guest: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        payment: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Verificar que el usuario es el guest o el host
    if (booking.guestId !== userId && booking.property.hostId !== userId) {
      throw new ForbiddenException('You can only view your own bookings');
    }

    return this.formatBooking(booking);
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        property: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Solo el guest o el host pueden cancelar
    if (booking.guestId !== userId && booking.property.hostId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Booking is already cancelled');
    }

    if (booking.status === 'COMPLETED') {
      throw new BadRequestException('Cannot cancel completed booking');
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: {
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return this.formatBooking(updated);
  }

  async confirm(id: string, hostId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        property: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.property.hostId !== hostId) {
      throw new ForbiddenException('Only the property host can confirm bookings');
    }

    if (booking.status !== 'PENDING') {
      throw new BadRequestException('Only pending bookings can be confirmed');
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: 'CONFIRMED' },
    });

    return this.formatBooking(updated);
  }

  private formatBooking(booking: any) {
    const { property, ...rest } = booking;

    return {
      ...rest,
      property: property
        ? {
            ...property,
            images: JSON.parse(property.images || '[]'),
          }
        : undefined,
    };
  }
}