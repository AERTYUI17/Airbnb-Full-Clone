import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':propertyId')
  @UseGuards(JwtAuthGuard)
  addFavorite(@Param('propertyId') propertyId: string, @Request() req) {
    return this.favoritesService.addFavorite(propertyId, req.user.userId);
  }

  @Delete(':propertyId')
  @UseGuards(JwtAuthGuard)
  removeFavorite(@Param('propertyId') propertyId: string, @Request() req) {
    return this.favoritesService.removeFavorite(propertyId, req.user.userId);
  }

  @Post('toggle/:propertyId')
  @UseGuards(JwtAuthGuard)
  toggleFavorite(@Param('propertyId') propertyId: string, @Request() req) {
    return this.favoritesService.toggleFavorite(propertyId, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getFavorites(@Request() req) {
    return this.favoritesService.getFavorites(req.user.userId);
  }

  @Get('check/:propertyId')
  @UseGuards(JwtAuthGuard)
  checkIsFavorite(@Param('propertyId') propertyId: string, @Request() req) {
    return this.favoritesService.checkIsFavorite(propertyId, req.user.userId);
  }

  @Get('count/:propertyId')
  getFavoriteCount(@Param('propertyId') propertyId: string) {
    return this.favoritesService.getFavoriteCount(propertyId);
  }
}