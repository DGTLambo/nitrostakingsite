import React, {createContext, useContext, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertContext = createContext(null);

export default function AlertProvider(props){
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    const alertError = (msg) => {
        alert(msg, "error")
    }

    const alert = (msg, severity) => {
        setOpen(true);
        setSeverity(severity)
        setMessage(msg);
    }

    const alertWarning = (msg) => {
        alert(msg, "warning");
    }

    const alertInfo = (msg) => {
        alert(msg, "info");
    }

    const alertSuccess = (msg) => {
        alert(msg, "success");
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <AlertContext.Provider value={{
            alertError,
            alertWarning,
            alertInfo,
            alertSuccess,
        }}>
            {props.children}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>

    );
}

export const useAlerts = ()=> {
    return useContext(AlertContext);
}
