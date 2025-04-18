import { Company, User } from '@prisma/client';
import { render } from '@testing-library/react';
import { ReviewProps } from '../review/review';
import ReviewsList from './reviews-list';

describe('ReviewsList', () => {
	const user1Id = 'user-1';
	const user2Id = 'user-2';
	const company1Id = 'company-1';
	const company2Id = 'company-2';
	const user1: User = {
		firstName: 'Jake',
		lastName: 'Lamb',
		email: 'my@email.com',
		id: user1Id,
	};
	const user2: User = {
		firstName: 'Jacob',
		lastName: 'Lambino',
		email: 'mymail@email.com',
		id: user2Id,
	};
	const company1: Company = {
		name: 'one',
		id: company1Id,
	};
	const company2: Company = {
		name: 'two',
		id: company2Id,
	};

	const reviews: ReviewProps[] = [
		{
			id: '1',
			reviewerId: user1Id,
			companyId: company1Id,
			reviewText: 'this was great',
			rating: 1,
			createdOn: '2020-01-01T00:00:00.000Z',
			user: user1,
			company: company1,
		},
		{
			id: '3',
			reviewerId: user2Id,
			companyId: company1Id,
			reviewText: '',
			rating: 1,
			createdOn: '2022-01-01T00:00:00.000Z',
			user: user2,
			company: company2,
		},
		{
			id: '2',
			reviewerId: user2Id,
			companyId: company2Id,
			reviewText: '',
			rating: 1,
			createdOn: '2021-01-01T00:00:00.000Z',
			user: user2,
			company: company2,
		},
	];

	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsList reviews={[]} />);
		expect(baseElement).toBeTruthy();
	});

	it('should render list of reviews', () => {
		const { getAllByTestId } = render(<ReviewsList reviews={reviews} />);
		expect(getAllByTestId('reviewCard').length).toBe(3);
	});

	it('should display message if no reviews are found', () => {
		const { queryByText } = render(<ReviewsList reviews={[]} />);
		expect(queryByText(/No reviews found/i)).toBeTruthy();
	});

	/**
	 * moving this test to the tests for the ReviewCard
	 *
	 *	it('should display the review text if provided', () => {
	 *		const { queryByText, getAllByTestId } = render(<ReviewsList reviews={reviews} />);
	 *		expect(getAllByTestId("reviewCard")).toBeTruthy();
	 *		expect(queryByText(reviews[0].reviewText as string)).toBeTruthy();
	 *	});
	 */

	// Feel free to add any additional tests you think are necessary
});
