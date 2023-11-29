import { useEffect, useState } from "react";

export const useSetup = () => {
  const [windowId] = useState(Math.random().toString(32).substring(2));

  useEffect(() => {
    console.log(windowId);
  }, []);
};
