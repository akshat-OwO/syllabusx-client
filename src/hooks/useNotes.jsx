import { useEffect } from "react";

const useNotes = (query, currentTab, setDrive) => {
    useEffect(() => {
        if (currentTab === 'Notes') {
            const getDrive = async () => {
                let response;
                try{
                    response = await fetch(`https://www.server.syllabusx.live/drive/notes/${query}`);
                }
                catch(error){
                    response = await fetch(`https://www.server.backup.syllabusx.live/drive/notes/${query}`);
                }
                const json = await response.json();
                setDrive(json);
            }
            getDrive();
        }
    }, [currentTab, query]);
    return;
}
 
export default useNotes;
