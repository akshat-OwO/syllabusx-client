import { useEffect } from "react";

const useData = (setData, searching, sem, branch) => {
    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(`http://107.21.128.65:3000/${sem}/${branch}`);
            const json = await response.json();
            setData(json);
          } catch(error) {
            const response = await fetch(`https://syllabusx-web-server.onrender.com/${sem}/${branch}`);
            const json = await response.json();
            setData(json);
          }
        }
        getData();
      }, [searching, sem, branch]);
    return
}
 
export default useData;