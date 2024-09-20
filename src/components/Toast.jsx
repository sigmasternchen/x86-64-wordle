import React, {useEffect, useState} from 'react';

export const Toast = ({message}) => {
    const [oldMessage, setOldMessage] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message && message !== oldMessage) {
            setOldMessage(message);
            setShow(true);
            setTimeout(() => setShow(false), 2000);
        }
    });

    return <div className={"toast " + (show ? "show" : "")}>
        {message}
    </div>
}

