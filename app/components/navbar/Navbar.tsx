/** @format */
"use client";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import {TSafeUser} from "@/app/types";

interface IProps {
	currentUser?: TSafeUser | null;
}

const Navbar: React.FC<IProps> = ({currentUser}) => {
	return (
		<div className=' fixed w-full bg-white z-[99]  shadow-sm '>
			<div className='py-3 border-b-[1px]'>
				<Container>
					{" "}
					<div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
			<Categories />
		</div>
	);
};

export default Navbar;
