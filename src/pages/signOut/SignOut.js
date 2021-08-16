import React from 'react';
import './styles.scss';

const SignOut = () => {
    const logout = () => {
        localStorage.clear();
        document.location.href = "/";
    }

    return(
        <div className="sign-out__wrapper">
            <div className="sign-out">
                <div className="sign-out__title">Are You Sure?</div>
                <div className="sign-out-btns__wrapper">
                    <button type="submit" className="sign-out-btn" onClick={e =>  logout()}>Yes</button>
                    <button type="submit" className="sign-out-btn" onClick={e =>  document.location.href = "/"}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default SignOut;