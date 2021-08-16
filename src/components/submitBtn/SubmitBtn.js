import React from 'react';
import './styles.scss'

const SubmitBtn = ({click}) => {
    return <button  type="submit" className="submit-btn" onClick={click}>Submit</button>
}

export default SubmitBtn;