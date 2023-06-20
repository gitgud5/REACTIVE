import React from 'react';
import { GoTrashcan } from 'react-icons/go';
import { useRemovePhotoMutation } from '../store';

function PhotosListItem({ photo }) {

  // We can use the results to show loading spinner and stuff
  // eslint-disable-next-line no-unused-vars
  const [removeFoto, results] = useRemovePhotoMutation()

  const handleRemovePhoto = () => {
    removeFoto(photo);
  }

  return (
    <div onClick={handleRemovePhoto} className='relative cursor-pointer m-2'>
      <img className='h-20 w-20' src={photo.url} alt="RANDOM PIC" />
      <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'>
        <GoTrashcan className='text-3xl' />
      </div>
    </div>
  )
}

export default PhotosListItem;