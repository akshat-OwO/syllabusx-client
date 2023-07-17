import { useEffect } from "react";

const useNotes = (query, currentTab, setDrive) => {
    useEffect(() => {
        if (currentTab === 'Notes') {
            const getDrive = async () => {
                const response = await fetch(`https://www.server.syllabusx.live/drive/notes/${query}`);
                const json = await response.json();
                setDrive(json);
            }
            getDrive();
        }
    }, [currentTab, query]);
    return;
}
 
export default useNotes;
