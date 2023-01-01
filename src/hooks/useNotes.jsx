import { useEffect } from "react";

const useNotes = (query, currentTab, setDrive) => {
    useEffect(() => {
        if (currentTab === 'Notes') {
            const getDrive = async () => {
                const response = await fetch(`https://syllabusx-drive.cyclic.app/notes/${query}`);
                const json = await response.json();
                setDrive(json);
            }
            getDrive();
        }
    }, [currentTab, query]);
    return;
}
 
<<<<<<< HEAD:src/hooks/useNotes.jsx
export default useNotes;
=======
export default useDrive;
>>>>>>> main:src/hooks/useDrive.jsx
