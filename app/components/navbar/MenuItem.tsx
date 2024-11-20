/** @format */
"use client";
import React from "react";

interface IProps {
	onClick: () => void;
	label: string;
}
const MenuItem: React.FC<IProps> = ({label, onClick}) => {
	return (
		<div
			onClick={onClick}
			className='px-4 py-3 hover:bg-neutral-200 transition font-semibold'>
			{label}
		</div>
	);
};

export default MenuItem;
