import { useEffect } from "react";

const useBooks = (bookQuery, currentTab, setBook) => {
    useEffect(() => {
        if (currentTab === 'Books') {
            const getDrive = async () => {
                const response = await fetch(`https://www.server.drive.syllabusx.live/books/${bookQuery}`);
                const json = await response.json();
                setBook(json);
            }
            getDrive();
        }
    }, [currentTab, bookQuery]);
    return;
}
 
export default useBooks;