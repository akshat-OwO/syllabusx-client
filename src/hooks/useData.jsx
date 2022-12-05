import { useEffect } from "react";

const useData = (setData, searching, sem, branch) => {
    useEffect(() => {
        const getData = async () => {
          const response = await fetch(`https://iboard-web-server.cyclic.app/${sem}/${branch}`);
          const json = await response.json();
          setData(json);
        }
        getData();
      }, [searching]);
    return
}
 
export default useData;