/** @format */
"use client";
import React, {useCallback, useState} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import {TSafeUser} from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import {useRouter} from "next/navigation";

interface IProps {
	currentUser?: TSafeUser | null;
}

const UserMenu: React.FC<IProps> = ({currentUser}) => {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	const [isOpen, setIsOpen] = useState(false);

	const toggleOpenMenu = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);
	return (
		<div className='relative'>
			<div className='flex items-center gap-2 lg:gap-3'>
				<div
					onClick={() => {
						onRent();
					}}
					className='hidden md:block text-sm font-semibold py-3 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpenMenu}
					className='p-4 md:py-[2px] md:px-2 border-[1px] border-neutral-200 flex items-center gap-2 md:gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
					<AiOutlineMenu size={14} />
					<div className='hidden md:block'>
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className='absolute rounded-xl shadow-2xl w-[40vw] md:w-3/4 bg-white border-[1px] border-neutral-200 overflow-hidden right-0 top-12 text-sm'>
					<div className='flex flex-col cursor-pointer'>
						{currentUser ? (
							<>
								<MenuItem
									label='My trips'
									onClick={() => {
										router.push("/trips");
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label='My favorites'
									onClick={() => {
										router.push("/favorites");
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label='My reservations'
									onClick={() => {
										router.push("/reservations");
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label='My properties'
									onClick={() => {
										router.push("/properties");
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label='Airbnb my home'
									onClick={() => {
										rentModal.onOpen();
										setIsOpen(false);
									}}
								/>
								<hr />
								<MenuItem
									label='Logout'
									onClick={() => signOut()}
								/>
							</>
						) : (
							<>
								<MenuItem
									label='Login'
									onClick={() => {
										loginModal.onOpen();
										toggleOpenMenu();
									}}
								/>
								<MenuItem
									label='Sign up'
									onClick={() => {
										registerModal.onOpen();
										toggleOpenMenu();
									}}
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
