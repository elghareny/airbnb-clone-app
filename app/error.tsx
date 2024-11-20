/** @format */

"use client";

import EmptyState from "./components/EmptyState";

interface IProps {
	error: Error;
}

const error: React.FC<IProps> = () => {
	return (
		<div className='w-full h-full flex flex-col justify-center items-center'>
			<EmptyState
				center
				title='Uh Oh'
				subtitle={"Something went wrong!"}
			/>
		</div>
	);
};

export default error;
