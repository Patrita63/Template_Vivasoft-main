import { createContext, useContext, useState } from "react";

const LookupsContext = createContext(null); // Ensure it's not undefined

export const LookupsProvider = ({ children }) => {
    const [lookups, setLookups] = useState(null); // Initialize as null to avoid errors

    return (
        <LookupsContext.Provider value={{ lookups, setLookups }}>
            {children}
        </LookupsContext.Provider>
    );
};

export const useLookups = () => {
    const context = useContext(LookupsContext);
    if (!context) {
        throw new Error("❌ useLookups must be used within a <LookupsProvider>. Make sure your component is wrapped in <IntranetLayout>.");
    }
    return context;
};
