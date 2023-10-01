import { FC, ReactNode, createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import NotificationBox from "../../components/atoms/notification-box";

type ToastContextProps = {
    errorMessage: string | null;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

type MyProviderProps = {
    children: ReactNode;
}

const MyProvider: FC<MyProviderProps> = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    useEffect(() => {
        if (errorMessage != null) (
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} drop-shadow`}>
                    <NotificationBox icon="error" message={errorMessage!} style="text-red-600 border-red-200 bg-red-50" />
                </div>
            )
            )
        )
        setErrorMessage(null);
    }, [errorMessage]);

    return (
        <ToastContext.Provider value={{ errorMessage: errorMessage, setErrorMessage: setErrorMessage }}>
            {children}
            <Toaster position="bottom-right" />
        </ToastContext.Provider>
    )
}

export { ToastContext, MyProvider };