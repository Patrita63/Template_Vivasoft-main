import { LookupsProvider } from "../context/LookupsContext";

const IntranetLayout = ({ children }) => (
    <LookupsProvider>
        {children}
    </LookupsProvider>
);

export default IntranetLayout;
