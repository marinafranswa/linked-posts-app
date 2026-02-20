import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { tokenContext } from "../../../Context/tokenContext";

export default function AuthProtectedRoute({ children }) {
  let { userToken } = useContext(tokenContext)

  if (!userToken) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}
