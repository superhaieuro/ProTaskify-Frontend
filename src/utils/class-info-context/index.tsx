import { FC, ReactNode, createContext, useState } from "react"

type ClassInfoContextProps = {
    classId: string | null;
    setClassId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ClassInfoContext = createContext<ClassInfoContextProps | undefined>(undefined);

type ClassInfoProviderProps = {
    children: ReactNode;
}

const ClassInfoProvider: FC<ClassInfoProviderProps> = ({ children }) => {
    const [classId, setClassId] = useState<string | null>(null);

    return (
        <ClassInfoContext.Provider value={{
            classId: classId, setClassId
        }}>
            {children}
        </ClassInfoContext.Provider>
    )
}

export { ClassInfoContext, ClassInfoProvider };