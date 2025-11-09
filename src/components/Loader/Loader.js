import { jsx as _jsx } from "react/jsx-runtime";
import './loader.scss';
export const Loader = () => {
    return (_jsx("div", { className: 'content', children: _jsx("span", { className: "loader" }) }));
};
