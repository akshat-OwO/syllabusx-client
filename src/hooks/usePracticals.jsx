import { useEffect } from "react";

const usePracticals = (practicalQuery, currentTab, setPractical) => {
    useEffect(() => {
        if (currentTab === 'PracticalFile') {
            const getDrive = async () => {
                const response = await fetch(`https://www.server.drive.syllabusx.live/practicalfile/${practicalQuery}`);
                const json = await response.json();
                setPractical(json);
            }
            getDrive();
        }
    }, [currentTab, practicalQuery]);
    return;
}
 
export default usePracticals;