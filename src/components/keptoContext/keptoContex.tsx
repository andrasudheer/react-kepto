import { createContext, useEffect, useState } from "react";

export const KeptoContext = createContext<any>({});

export const KeptoProvider = ({children}:any) => {
    const [rolesType, setRolesType] = useState<any>([]);
    
    return (
        <KeptoContext.Provider value={{
            rolesType, setRolesType
        }}>
            {children}
        </KeptoContext.Provider>
    )
}


