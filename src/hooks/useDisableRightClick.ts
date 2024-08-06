import { useEffect } from "react";

export const useDisableRightClick = () => {
  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);
};
