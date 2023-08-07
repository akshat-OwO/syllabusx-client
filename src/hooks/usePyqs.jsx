import { useEffect } from "react";

const usePyqs = (pyqQuery, currentTab, setPyq) => {
    useEffect(() => {
        if (currentTab === 'PYQ') {
            const getDrive = async () => {
                let response;
                try{
                    response = await fetch(`https://www.server.syllabusx.live/drive/pyq/${pyqQuery}`);
                }
                catch(error){
                    response = await fetch(`https://www.server.backup.syllabusx.live/drive/pyq/${pyqQuery}`);
                }
                const json = await response.json();
                setPyq(json);
            }
            getDrive();
        }
    }, [currentTab, pyqQuery]);
    return;
}
 
export default usePyqs;