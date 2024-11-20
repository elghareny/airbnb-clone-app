/** @format */

"use client";
import React, {useCallback} from "react";
import {CldUploadWidget, CloudinaryUploadWidgetResults} from "next-cloudinary";
import {TbPhotoPlus} from "react-icons/tb";
import Image from "next/image";

interface IProps {
	value: string;
	onChange: (value: string) => void;
}
const ImageUpload: React.FC<IProps> = ({value, onChange}) => {
	const handelUpload = useCallback(
		(results: CloudinaryUploadWidgetResults) => {
			//@ts-expect-error secure_url is a url of image as it is a string
			onChange(results?.info?.secure_url as string);
		},
		[onChange],
	);
	return (
		<CldUploadWidget
			onSuccess={(results) => {
				handelUpload(results);
			}}
			uploadPreset='yivupmks'
			options={{
				maxFiles: 1,
			}}>
			{({open}) => (
				<div
					onClick={() => open?.()}
					className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600 p-20'>
					<TbPhotoPlus size={50} />
					<div className='font-semibold text-lg'>Click to upload</div>
					{value && (
						<div className='absolute inset-0 w-full h-full'>
							<Image
								alt='Upload'
								fill
								src={value}
								className='object-cover w-full h-full'
							/>
						</div>
					)}
				</div>
			)}
		</CldUploadWidget>
	);
};

export default ImageUpload;
