import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient.ts";
import { getProfileUser } from "../../api/UserApi.ts";
import '../Header/style.scss'
import AuthForm from "../AuthForm/AuthForm.tsx";
import { HeaderLoader } from "../Loader/HeaderLoader.tsx";
import { Link, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, authModalOpen, authModalClose } from "../../store/AuthSlice.tsx";
import { useState, useEffect } from "react";
import { isSearchList } from "../../store/UISlice.tsx";
import { UISliceState } from "../../store/UISlice.tsx";
import { AuthInitialState } from "../../store/AuthSlice.tsx";

export const Account = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const searchListState = useSelector((state:UISliceState) => state.ui.searchList)
    const isModal = useSelector((state:AuthInitialState) => state.auth.loginModalWindow);
    const pathname = useSelector((state:UISliceState) => state.ui.activeURL)


    const handleClickEnter = () => {
        if(searchListState) {
          dispatch(isSearchList(false))
        }
        dispatch(authModalOpen())
    }

    const handleCloseModal = () => {
      dispatch(authModalClose())
    }

    const meQuery = useQuery(
    {
      queryFn: () => getProfileUser(), 
      queryKey: ['profile'],
    },
    queryClient
  )

  useEffect (() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])


  if(meQuery.isLoading) {
    return <HeaderLoader /> ;
  }

  if(meQuery.isError   
  ) {
    return (
            <>
                <button className={`header__button`} onClick={handleClickEnter}>Войти</button>
                {isModal && <AuthForm handleCloseModal={handleCloseModal}/>}
            </>
          );
  }
  if(meQuery.isSuccess) {
    dispatch(loginSuccess(meQuery.data));
    dispatch(authModalClose());
    return <Link to='/profile' className={`header__button ${windowWidth > 600 && pathname === '/profile' ? `active` : ``}`}>{meQuery.data.name}</Link>
  }
}