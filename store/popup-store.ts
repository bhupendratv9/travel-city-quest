import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

type PopupState = {
  isPopupOpen: boolean;
}

const initialState: PopupState = {
  isPopupOpen: false,
}

type PopupActions = {
  setPopup: (data:boolean) => void;
}

type PopupStore = PopupState & PopupActions;

const usePopupStore = create<PopupStore>()(immer((set) => ({
  ...initialState,
  setPopup: (data:boolean) => set((state) => { state.isPopupOpen = data; }),
})));

export default usePopupStore;