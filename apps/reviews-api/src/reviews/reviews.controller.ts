import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsCountResponse, ReviewsResponse } from './reviews.types';

@Controller('reviews')
export class ReviewsController {
	constructor(private reviewsService: ReviewsService) {}

	@Get()
	async getReviews(): Promise<ReviewsResponse> {
		const allReviews = await this.reviewsService.getReviews();
		if (!allReviews || allReviews.length === 0) {
			throw new NotFoundException('reviews not found');
		}
		return { reviews: allReviews };
	}

	@Get('/count')
	async getReviewsCount(): Promise<ReviewsCountResponse> {
		const reviewsCount = await this.reviewsService.getReviewsCount();
		return { reviewsCount };
	}
}
