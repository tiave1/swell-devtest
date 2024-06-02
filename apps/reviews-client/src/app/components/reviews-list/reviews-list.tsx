import { useEffect, useState } from 'react';
import axios from 'axios';
import './review-list.css';
import { Review, User, Company } from '@prisma/client';

interface Reviews extends Review {
	user: User;
	company: Company;
}
/* eslint-disable-next-line */
export interface ReviewsListProps {}

export function ReviewsList(props: ReviewsListProps) {
	const [reviews, setReviews] = useState<Reviews[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axios.get('/api/reviews');
				console.log('Reviews: ', response.data);
				setReviews(response.data.reviews);
				if (!response.data) {
					throw new Error("Can't find reviews");
				}
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		getData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<>
			{' '}
			{reviews !== null ? (
				<table className="Review-List">
					<thead>
						<th>Reviewer Name</th>
						<th>Company Name</th>
						<th>Date of Review</th>
						<th>Review Text</th>
						<th>Review Rating</th>
					</thead>
					<tbody>
						{reviews.map((review) => (
							<tr key={review.id}>
								<td>{review.user.firstName + ' ' + review.user.lastName}</td>
								<td>{review.company.name}</td>
								<td>{new Date(review.createdOn).toLocaleDateString()}</td>
								<td>{review.reviewText}</td>
								<td>{review.rating}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No Reviews Found</p>
			)}
		</>
	);
}

export default ReviewsList;
