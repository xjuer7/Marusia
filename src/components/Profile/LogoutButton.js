import { jsx as _jsx } from "react/jsx-runtime";
import { queryClient } from "../../api/queryClient.ts";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/UserApi.ts";
import { useBtnChanger } from "../hooks/useBtnChanger.tsx";
import { useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlice.tsx";
import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
    const { btnText, setBtnText } = useBtnChanger('Выйти из аккаунта');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutMutation = useMutation({
        mutationFn: () => logoutUser(),
        onMutate() {
            setBtnText('Выполняется выход...');
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            dispatch(logout());
            navigate('/');
        },
        onError(error) {
            console.error(error);
        }
    }, queryClient);
    const handleClick = () => {
        logoutMutation.mutate();
    };
    return (_jsx("button", { className: "profile__card__btn", onClick: handleClick, children: btnText }));
};
export default LogoutButton;
