import { useEffect } from "react";

const usePracticals = (practicalQuery, currentTab, setPractical) => {
    useEffect(() => {
        if (currentTab === 'PracticalFile') {
            const getDrive = async () => {
                let response;
                try{
                    response = await fetch(`https://www.server.syllabusx.live/drive/practicalfile/${practicalQuery}`);
                }
                catch(error){
                    response = await fetch(`https://www.server.backup.syllabusx.live/drive/practicalfile/${practicalQuery}`);
                }
                const json = await response.json();
                setPractical(json);
            }
            getDrive();
        }
    }, [currentTab, practicalQuery]);
    return;
}
 
export default usePracticals;