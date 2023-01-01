import { useEffect } from "react";

const usePracticals = (practicalQuery, currentTab, setPractical) => {
    useEffect(() => {
        if (currentTab === 'PracticalFile') {
            const getDrive = async () => {
                const response = await fetch(`https://syllabusx-drive.cyclic.app/practicalfile/${practicalQuery}`);
                const json = await response.json();
                setPractical(json);
            }
            getDrive();
        }
    }, [currentTab, practicalQuery]);
    return;
}
 
export default usePracticals;