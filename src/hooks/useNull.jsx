import { useEffect } from "react";

const useNull = (setNullData, data) => {
        useEffect(() => {
            if(data.length === 0) {
              setNullData(true);
            } 
            if(data.length > 0) {
              setNullData(false);
            }
          }, [data]);
    return;
}
 
export default useNull;