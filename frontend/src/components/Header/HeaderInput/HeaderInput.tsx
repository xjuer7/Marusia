import { useSelector, useDispatch} from "react-redux";
import { useRef, useState, useEffect, LegacyRef} from "react";
import { basicUrl } from "../../../api/MoviesApi.ts";
import { Movies } from "../../../models/Movies.ts";
import { isSearchList, isButtonInp, isMobile, isWindowWidth,styleRemove, setInpValue, UISliceState} from "../../../store/UISlice.tsx";

import HeaderSearchList from "../HeaderSearchList/HeaderSearchList.tsx";
import { RefObject } from "react";

export type ListRefType = LegacyRef<HTMLUListElement>

const HeaderInput = () => {

    const dispatch = useDispatch();
    const inputRef: RefObject<HTMLInputElement> = useRef(null);
    const listRef = useRef<HTMLUListElement>(null);

    const searchListState = useSelector((state:UISliceState) => state.ui.searchList)
    const closeButtonState = useSelector((state:UISliceState) => state.ui.buttonInp)
    const vpMobileState = useSelector((state:UISliceState) => state.ui.vpMobile)
    const windowWidthState = useSelector((state:UISliceState) => state.ui.windowWidth)
    const removeSelector = useSelector((state:UISliceState) => state.ui.isRemove)
    const inputState = useSelector((state:UISliceState) => state.ui.inpValue)
    const [searchData, setSearchData] = useState<Movies | null>(null);

    
    const sendData = async (value: string) => {
        fetch(`${basicUrl}?title=${value}`)
        .then((response) => response.json())
        .then((json) => json.slice(0, 5))
        .then((data) => setSearchData(data));

        dispatch(isSearchList(true))
    };

    const handleOutsideClick = (e:MouseEvent) => {
        if(windowWidthState > 1023) {
            if (e.target instanceof HTMLElement && e.target.offsetParent !== listRef.current) closeList();
        } else {
            if (!(e.target instanceof HTMLElement) || !inputRef.current?.contains(e.target as HTMLElement)) closeList();
        }
    }
    

    const handleMobileClick = () => {
        dispatch(isMobile(true))
        dispatch(isButtonInp(true))
    }


    const handleSearchTitle = (value:string) => {
        dispatch(setInpValue(value))
        value ? sendData(value) : dispatch(isSearchList(false)); 
    }

     const closeList = () => {
        dispatch(styleRemove(true));
        dispatch(setInpValue(''))
    
        setTimeout(() => {
            dispatch(isMobile(false))
            dispatch(isSearchList(false))
            dispatch(styleRemove(false))
        }, 400)
      }

    useEffect(() => {
        const handleResize = () => {
            dispatch(isWindowWidth(window.innerWidth)) 
        }

        window.addEventListener('resize', handleResize)
        document.body.addEventListener("click", handleOutsideClick);

        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
            window.removeEventListener('resize', handleResize)
        }
    }, [vpMobileState]);


    return (
        <div className={`header__input_wrap ${removeSelector ? 'close' : ''} ${vpMobileState ? 'header__wrap-mobile' : ''}`}>

            <svg className={`header__icon_inp`}><use href="/icon/sprite.svg#icon-loop" /></svg>

            <input
                ref={inputRef}
                type="text"
                className={`header__input`}
                placeholder="Поиск"
                value={inputState}
                onChange={(e) => handleSearchTitle(e.target.value)}
                onClick={windowWidthState < 1023 ? handleMobileClick : undefined}
            />

            <button onClick={() => { closeList(); dispatch(setInpValue('')) }} 
                className={`header__btn_inp ${removeSelector ? 'header__btn_inp-close' : ''}`} >
            </button>
        
            {searchListState && <HeaderSearchList data={searchData} listRef={listRef} closeList={closeList}/>}
        </div>
    )
}

export default HeaderInput