import { useEffect } from "react";

const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title || "Zapilio- SkillZap";
  }, [title]);

  const setPageTitle = (newTitle: string) => {
    document.title = newTitle;
  };

  return setPageTitle;
};

export default usePageTitle;
