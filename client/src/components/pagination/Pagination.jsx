import { useState } from 'react';
import './pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

  const pageNumber = [];
  // const [isActive, setIsActive] = useState(false);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className='pagination'>
      <ul>
        {pageNumber.map(num => (
          <li key={num}>
            <a
              onClick={(e) => {
                paginate(num);
                e.preventDefault();
              }}
              href='!#'>
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination