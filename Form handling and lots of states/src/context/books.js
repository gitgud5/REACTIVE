import { createContext, useCallback, useState } from "react";
import axios from 'axios';



const BooksContext = createContext();

function Provider({ children }) {

    const [books, setBooks] = useState([]);





    const fetchBooks = useCallback(async () => {
        try {
            //Destructuring because axios gives the fetched data in .data key;
            const { data } = await axios.get("http://localhost:3001/books");
            setBooks(data);
        } catch (error) {

        }
    }, [])

    const editBookByID = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, { title: newTitle });
        console.log(response);



        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                // We write ..response.data because we want to change all the different properties (that is make it to the latest updated stage)
                return { ...book, ...response.data };
            }
            return book;
        })
        setBooks(updatedBooks);
    }

    const deleteBookByID = async (id) => {

        axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });
        setBooks(updatedBooks);
    }

    const createBook = async (title) => {

        try {
            const response = await axios.post('http://localhost:3001/books', {
                title
            });
            const updatedBooks = [...books, response.data];
            setBooks(updatedBooks);
            console.log(response);

        } catch (error) {

        }
    }

    const valueToShare = {
        books,
        deleteBookByID,
        editBookByID,
        createBook,
        fetchBooks
    }




    return <BooksContext.Provider value={valueToShare}>
        {children}
    </BooksContext.Provider>

}


export { Provider };
export default BooksContext;