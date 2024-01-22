import { useNavigate } from "react-router-dom";

function useNavigateWithScrollToTop() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigateWithScrollToTop = (to: string, options?: any) => {
    window.scrollTo(0, 0);
    navigate(to, options);
  };

  return navigateWithScrollToTop;
}

export default useNavigateWithScrollToTop;
