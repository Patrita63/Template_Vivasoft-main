import { createContext, useContext, useState, useEffect } from "react";

const LookupsContext = createContext(null);

export const LookupsProvider = ({ children }) => {
    const [lookups, setLookups] = useState(null);
    const [loading, setLoading] = useState(true);  // ✅ Add loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLookups = async () => {
            try {
                const response = await fetch("/api/agenda/retrieveaccessorytables");
                if (!response.ok) throw new Error("Failed to fetch lookups");
                const data = await response.json();
                setLookups(data.lookups);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLookups();
    }, []);

    return (
        <LookupsContext.Provider value={{ lookups, loading, error, setLookups }}>
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
