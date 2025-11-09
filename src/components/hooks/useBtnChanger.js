import { useState } from "react";
export function useBtnChanger(initialText = '') {
    const [btnText, setBtnText] = useState(initialText);
    return { btnText, setBtnText };
}
