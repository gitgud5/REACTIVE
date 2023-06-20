import React, {  useState } from 'react'
import BookEdit from './BookEdit';
import useBooksContext from '../hooks/use-books-context';
function BookShow({ book }) {
  const [showEdit, setShowEdit] = useState(false);

  const { deleteBookByID} = useBooksContext();

  const handleSubmit = () => {
    setShowEdit(!showEdit);

  }

  let content = <h3>{book.title}</h3>
  if (showEdit) {
    content = <BookEdit onSubmit={handleSubmit} book={book} />
  }



  return (
    <div className='book-show'>
      <img
        src='https://picsum.photos/300/200'
        alt='book '
      />
      {content}
      <div className='actions'>
        <button className='edit' onClick={() => { setShowEdit(!showEdit) }} >Edit</button>
        <button className='delete' onClick={() => { deleteBookByID(book.id) }}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default BookShow