import { render, screen, waitFor } from '@testing-library/react';
import ReviewsList from './reviews-list';
import axios from 'axios';

//Mock Axios Module
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('ReviewsList', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsList />);
		expect(baseElement).toBeTruthy();
	});

	it('should render list of reviews', async () => {
		//mock data
		const reviews = [
			{
				id: 1,
				user: { firstName: 'Johnny', lastName: 'Cash' },
				company: { name: 'Banksy Inc' },
				createdOn: '1992-01-12',
				reviewText: 'Great product!',
				rating: 5,
			},
			{
				id: 2,
				user: { firstName: 'John', lastName: 'S' },
				company: { name: 'Beta Corp.' },
				createdOn: '2023-02-11',
				reviewText: '',
				rating: 4,
			},
		];
		//Mock Call for above array
		mockAxios.get.mockResolvedValue({ data: { reviews } });

		render(<ReviewsList />);
		await waitFor(() => {
			expect(screen.getByText('Reviewer Name')).toBeInTheDocument();
			expect(screen.getByText('Johnny Cash')).toBeInTheDocument();
			expect(screen.getByText('Beta Corp.')).toBeInTheDocument();
			expect(screen.getByText('Banksy Inc')).toBeInTheDocument();
			expect(screen.getByText('4')).toBeInTheDocument();
		});
	});

	it('should display the reviewList text if provided', async () => {
		//create a test object
		const reviews = [
			{
				id: 6,
				user: { firstName: 'John', lastName: 'Wick' },
				company: { name: 'The Continental' },
				createdOn: '2023-01-01',
				reviewText: 'Excommunicado',
				rating: 5,
			},
		];

		mockAxios.get.mockResolvedValue({ data: { reviews } });

		render(<ReviewsList />);
		//wait for the review text and see if it returns anything
		const reviewText = await waitFor(() => screen.getByText('Review Text'));
		expect(reviewText).toBeInTheDocument();
	});
	// Additional tests can be added as needed
});
