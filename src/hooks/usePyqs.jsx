import { useEffect } from "react";

const usePyqs = (pyqQuery, currentTab, setPyq) => {
    useEffect(() => {
        if (currentTab === 'PYQ') {
            const getDrive = async () => {
                const response = await fetch(`https://www.server.drive.syllabusx.live/pyq/${pyqQuery}`);
                const json = await response.json();
                setPyq(json);
            }
            getDrive();
        }
    }, [currentTab, pyqQuery]);
    return;
}
 
export default usePyqs;