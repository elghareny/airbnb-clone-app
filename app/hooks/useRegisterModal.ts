/** @format */
import {create} from "zustand";

interface IState {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useRegisterModal = create<IState>((set) => ({
	isOpen: false,
	onOpen: () => {
		set({isOpen: true});
	},
	onClose: () => {
		set({isOpen: false});
	},
}));

export default useRegisterModal;
