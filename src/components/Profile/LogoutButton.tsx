import { queryClient } from "../../api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/UserApi";
import { useBtnChanger } from "../hooks/useBtnChanger";
import { useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const {btnText, setBtnText} = useBtnChanger('Выйти из аккаунта');
    const dispatch = useDispatch()
    const navigate = useNavigate()

     const logoutMutation = useMutation({
        mutationFn: () => logoutUser(),
        onMutate(){
            setBtnText('Выполняется выход...')
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey : ['profile']})
            dispatch(logout())
            navigate('/')
        },
        onError(error) {
            console.error(error)
        }
    }, queryClient
    )

    const handleClick = () => {
        logoutMutation.mutate();
    }

    return (
         <button className="profile__card__btn" onClick={handleClick}>{btnText}</button>
    )
}

export default LogoutButton