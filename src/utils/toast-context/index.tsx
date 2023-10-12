import { FC, ReactNode, createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import NotificationBox from "../../components/atoms/notification-box";

type ToastContextProps = {
    successMessage: string | null;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;

    errorMessage: string | null;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

type ToastProviderProps = {
    children: ReactNode;
}

const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    useEffect(() => {
        if (errorMessage != null) (
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} shadow`}>
                    <NotificationBox icon="error" message={errorMessage!} style="text-red-600 border-red-200 bg-red-50" />
                </div>
            )
            )
        )
        setErrorMessage(null);
    }, [errorMessage]);

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    useEffect(() => {
        if (successMessage != null) (
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} shadow`}>
                    <NotificationBox icon="check_circle" message={successMessage!} style="text-green-600 border-green-200 bg-green-50" />
                </div>
            )
            )
        )
        setSuccessMessage(null);
    }, [successMessage]);

    return (
        <ToastContext.Provider value={{
            successMessage: successMessage, setSuccessMessage: setSuccessMessage,
            errorMessage: errorMessage, setErrorMessage: setErrorMessage
        }}>
            {children}
            <Toaster />
        </ToastContext.Provider>
    )
}

export { ToastContext, ToastProvider };