import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

const prisma = new PrismaClient();

@Injectable()
export class PropertiesService {
  async create(createPropertyDto: CreatePropertyDto, hostId: string) {
    const { amenities, images, ...rest } = createPropertyDto;

    const property = await prisma.property.create({
      data: {
        ...rest,
        hostId,
        amenities: JSON.stringify(amenities),
        images: JSON.stringify(images),
        status: 'DRAFT',
      },
    });

    return this.formatProperty(property);
  }

  async findAll(filters?: { city?: string; country?: string; propertyType?: string }) {
    const where: any = { status: 'PUBLISHED' };

    if (filters?.city) where.city = filters.city;
    if (filters?.country) where.country = filters.country;
    if (filters?.propertyType) where.propertyType = filters.propertyType;

    const properties = await prisma.property.findMany({
      where,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return properties.map((p) => this.formatProperty(p));
  }

  async findOne(id: string) {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
          },
        },
        reviews: {
          include: {
            guest: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return this.formatProperty(property);
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto, userId: string) {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.hostId !== userId) {
      throw new ForbiddenException('You can only update your own properties');
    }

    const { amenities, images, ...rest } = updatePropertyDto;

    const updated = await prisma.property.update({
      where: { id },
      data: {
        ...rest,
        ...(amenities && { amenities: JSON.stringify(amenities) }),
        ...(images && { images: JSON.stringify(images) }),
      },
    });

    return this.formatProperty(updated);
  }

  async remove(id: string, userId: string) {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.hostId !== userId) {
      throw new ForbiddenException('You can only delete your own properties');
    }

    await prisma.property.delete({
      where: { id },
    });

    return { message: 'Property deleted successfully' };
  }

  async publish(id: string, userId: string) {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.hostId !== userId) {
      throw new ForbiddenException('You can only publish your own properties');
    }

    const updated = await prisma.property.update({
      where: { id },
      data: { status: 'PUBLISHED' },
    });

    return this.formatProperty(updated);
  }

  private formatProperty(property: any) {
    const { amenities, images, ...rest } = property;

    return {
      ...rest,
      amenities: JSON.parse(amenities || '[]'),
      images: JSON.parse(images || '[]'),
    };
  }
}