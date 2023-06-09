import { useState, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

const SearchBar = ({ subject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  const handleClearSearch = () => {
    searchRef.current.value = '';
    setSearchTerm('');
  };

  return (
    <div className='duration-300 w-1/2 mx-auto mb-10'>
      <div className='flex px-4 py-2 items-center gap-2 bg-gray-100 border duration-300 rounded-full shadow-sm focus-within:shadow-xl'>
        <AiOutlineSearch className='text-xl text-gray-600' />
        <input
          type='text'
          ref={searchRef}
          placeholder='Search for topics...'
          className='bg-transparent w-full py-1 text-lg text-gray-600 focus-within:outline-none'
          onChange={e => setSearchTerm(e.target.value)}
        />
        {searchTerm ? (
          <AiOutlineClose
            className='text-xl w-5 h-5 text-gray-500 cursor-pointer ml-auto'
            onClick={handleClearSearch}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
