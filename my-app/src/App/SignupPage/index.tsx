import React from 'react';
import {useAppDispatch} from "../../hooks/hooks";
import {signup} from "../UserStore";

const SignupPage = () => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <button onClick={()=>dispatch(signup())}>тестовая регистрация</button>
        </div>
    );
};

export default SignupPage;