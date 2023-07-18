import { useEffect } from "react";

const useBooks = (bookQuery, currentTab, setBook) => {
    useEffect(() => {
        if (currentTab === 'Books') {
            const getDrive = async () => {
                let response;
                try{
                    response = await fetch(`https://www.server.syllabusx.live/drive/books/${bookQuery}`);
                }
                catch(error){
                    response = await fetch(`https://www.server.backup.syllabusx.live/drive/books/${bookQuery}`);
                }
                const json = await response.json();
                setBook(json);
            }
            getDrive();
        }
    }, [currentTab, bookQuery]);
    return;
}
 
export default useBooks;