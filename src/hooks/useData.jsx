import { useEffect } from "react";

const useData = (setData, searching, sem, branch) => {
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://www.server.syllabusx.live/${sem}/${branch}`);
            const json = await response.json();
            setData(json);
        }
        getData();
      }, [searching, sem, branch]);
    return
}
 
export default useData;