import {
  createSlice,
} from "@reduxjs/toolkit";

export interface UIState {
    activeURL: string,
    searchList: boolean,
    buttonInp: boolean,
    vpMobile: boolean,
    windowWidth: number,
    isRemove: boolean,
    inpValue: string,
}

export interface UISliceState {
    ui: UIState
}

const UISlice = createSlice({
    name: 'ui',
    initialState: {
        activeURL: '/',
        searchList: false,
        buttonInp: false,
        vpMobile: false,
        windowWidth: window.innerWidth,
        isRemove: false,
        inpValue: '',
    },
    reducers: {
        changeActiveUrl(state, action) {
            state.activeURL = action.payload;
        },
        isSearchList(state, action) {
            state.searchList = action.payload;
        },
        isButtonInp(state, action) {
            state.buttonInp = action.payload;
        },
        isMobile(state, action) {
            state.vpMobile = action.payload;
        },
        isWindowWidth(state, action) {
            state.windowWidth = action.payload;
        },
        styleRemove(state, action) {
            state.isRemove = action.payload;
        },
        setInpValue(state, action) {
            state.inpValue = action.payload;
        }
    },
})

export const {changeActiveUrl, isSearchList, isButtonInp, isMobile, isWindowWidth, styleRemove, setInpValue} = UISlice.actions;
export default UISlice.reducer