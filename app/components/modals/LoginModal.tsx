/** @format */
"use client";
import React, {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [isLoading, setIsLoading] = useState(false);

	const {
		handleSubmit,
		register,
		formState: {errors},
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn("credentials", {...data, redirect: false}).then((callback) => {
			setIsLoading(false);
			if (callback?.ok) {
				toast.success("Logged in ");
				router.refresh();
				loginModal.onClose();
			}
			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);
	// RENDER

	const bodyContent = (
		<div className='flex flex-col gap-3'>
			<Heading
				title='Welcome back'
				subtitle='Login to your account!'
			/>
			<form
				className='flex flex-col gap-3'
				id='loginForm'
				onSubmit={handleSubmit(onSubmit)}>
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
					<div>First time using Airbnb?</div>
					<div
						className='text-neutral-800 cursor-pointer hover:underline'
						onClick={() => {
							toggle();
						}}>
						Create an account
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			formId='loginForm'
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
