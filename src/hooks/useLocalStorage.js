import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // state gets value from localStorage, if it doesn't exist from initialValue
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }
    return initialValue;
  });

  //   whenever value changes, it is updated in local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
