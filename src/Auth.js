import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useState } from 'react';

const Auth = () => {

    const [ showLogin, setShowLogin ] = useState(true);

    if(showLogin) {
        return <SignIn setShowLogin={setShowLogin} />;
    } else {
        return <SignUp setShowLogin={setShowLogin} />;
    } 
}

export default Auth;