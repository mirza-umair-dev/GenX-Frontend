import { useContext } from "react";
import AppContext from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user,loading} = useContext(AppContext);
    if(loading) return <div>Loading...</div>
    if(user) return children;
    return <Navigate to='/'/>
}
export default ProtectedRoute;