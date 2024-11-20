/** @format */
"use client";
import React from "react";
import {IconType} from "react-icons";

interface IProps {
	label: string;
	icon: IconType;
	selected?: boolean;
	onClick: (value: string) => void;
}
const CategoryInput: React.FC<IProps> = ({
	label,
	icon: Icon,
	selected,
	onClick,
}) => {
	return (
		<div
			className={`rounded-xl border-2 p-3 flex flex-col gap-2 cursor-pointer transition hover:border-black ${
				selected ? "border-black" : "border-neutral-200"
			}`}
			onClick={() => {
				onClick(label);
			}}>
			<Icon size={25} />
			<div className=' text-sm font-semibold'>{label}</div>
		</div>
	);
};

export default CategoryInput;
