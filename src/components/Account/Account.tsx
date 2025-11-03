import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { getProfileUser } from "../../api/UserApi";
import '../Header/style.scss'
import AuthForm from "../AuthForm/AuthForm";
import { HeaderLoader } from "../Loader/HeaderLoader";
import { Link, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, authModalOpen, authModalClose } from "../../store/AuthSlice";
import { useState, useEffect } from "react";
import { isSearchList } from "../../store/UISlice";

export const Account = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const searchListState = useSelector((state) => state.ui.searchList)
    const isModal = useSelector((state) => state.auth.loginModalWindow);
    const pathname = useSelector((state) => state.ui.activeURL)


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