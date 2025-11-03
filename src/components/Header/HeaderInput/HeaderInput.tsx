import { useSelector, useDispatch} from "react-redux";
import { useRef, useState, useEffect} from "react";
import { basicUrl } from "../../../api/MoviesApi";
import { Movies } from "../../../models/Movies";
import { isSearchList, isButtonInp, isMobile, isWindowWidth,styleRemove, setInpValue} from "../../../store/UISlice";

import HeaderSearchList from "../HeaderSearchList/HeaderSearchList";

const HeaderInput = () => {

    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>();
    const listRef = useRef<HTMLUListElement>();

    const searchListState = useSelector((state) => state.ui.searchList)
    const closeButtonState = useSelector((state) => state.ui.buttonInp)
    const vpMobileState = useSelector((state) => state.ui.vpMobile)
    const windowWidthState = useSelector((state) => state.ui.windowWidth)
    const removeSelector = useSelector((state) => state.ui.isRemove)
    const inputState = useSelector((state) => state.ui.inpValue)
    const [searchData, setSearchData] = useState<Movies | null>(null);

    
    const sendData = async (value: string) => {
        fetch(`${basicUrl}?title=${value}`)
        .then((response) => response.json())
        .then((json) => json.slice(0, 5))
        .then((data) => setSearchData(data));

        dispatch(isSearchList(true))
    };

    const handleOutsideClick = (e) => {
        if(windowWidthState > 1023) {
            if (e.target.offsetParent !== listRef.current) closeList();
        } else {
            if (!e.target.contains(inputRef.current)) closeList();
        }
    }
    

    const handleMobileClick = () => {
        dispatch(isMobile(true))
        dispatch(isButtonInp(true))
    }


    const handleSearchTitle = (value) => {
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