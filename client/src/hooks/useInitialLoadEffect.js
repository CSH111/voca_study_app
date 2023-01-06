import { useState, useEffect } from "react";

const useInitialLoadEffect = (callback, initialLoad, depArr) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) return;
    if (!initialLoad) return;
    callback();
    setCount((c) => c + 1);
  }, [...depArr]);
};

export default useInitialLoadEffect;
