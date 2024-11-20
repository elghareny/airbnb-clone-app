/** @format */

"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React from "react";

const Logo = () => {
	const router = useRouter();
	return (
		<Image
			onClick={() => router.push("/")}
			className='hidden md:block cursor-pointer'
			alt='Logo'
			height='90'
			width='90'
			src={"/images/airbnb-logo.png"}
		/>
	);
};

export default Logo;
