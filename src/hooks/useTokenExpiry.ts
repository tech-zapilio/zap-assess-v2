import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAppSelector } from "../App/hooks";
import { ActionType } from "../Store/action-types";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";

export function useExpiredJwtRedirect() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.app.user);

  function logout() {
    sessionStorage.removeItem("user");
    window.location.reload();
    dispatch({ type: ActionType.SIGN_OUT });
    googleLogout();
  }

  useEffect(() => {
    if (user?.token?.length > 0) {
      const token = user?.token;
      if (token) {
        const decodeToken: { exp: number } = jwtDecode(token);

        if (decodeToken.exp * 1000 < new Date().getTime()) {
          logout();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
}
