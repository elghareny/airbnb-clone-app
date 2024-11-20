/** @format */
"use client";
import React from "react";

interface IProps {
	title: string;
	subtitle: string;
	center?: boolean;
}
const Heading: React.FC<IProps> = ({title, subtitle, center}) => {
	return (
		<div className={`${center ? "text-center" : "text-start"}`}>
			<div className='text-2xl font-bold'>{title}</div>
			<div className='font-light text-neutral-500'>{subtitle}</div>
		</div>
	);
};

export default Heading;
