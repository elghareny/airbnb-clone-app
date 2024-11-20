/** @format */
"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import React, {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const [isLoading, setIsLoading] = useState(false);

	const {
		handleSubmit,
		register,
		formState: {errors},
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		axios
			.post("/api/register", data)
			.then(() => {
				toast.success("Account created successfully!");
				registerModal.onClose();
				loginModal.onOpen();
			})
			.catch((error) => {
				toast.error(error.response.data + "Something went wrong!");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	// RENDER

	const bodyContent = (
		<div className='flex flex-col gap-3'>
			<Heading
				title='Welcome to Airbnb'
				subtitle='Create an account'
			/>
			<form
				id='registerForm'
				className='flex flex-col gap-3'
				onSubmit={handleSubmit(onSubmit)}>
				<Input
					id='name'
					label='Name'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Input
					id='email'
					label='Email'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Input
					id='password'
					label='Password'
					type='password'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</form>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-2 '>
			<hr />
			<Button
				outline
				label='Continue with Google'
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div className='text-neutral-500 text-center font-light'>
				<div className='justify-center flex flex-row items-center gap-2'>
					<div>Already have an account?</div>
					<div
						className='text-neutral-800 cursor-pointer hover:underline'
						onClick={() => {
							toggle();
						}}>
						Log in
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			formId='registerForm'
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
