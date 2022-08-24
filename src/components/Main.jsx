import React, { useState, useMemo } from 'react';
import Scroll from './Scroll';
import DataList from './DataList';
import Pagination from '../Pagination';

function Main({ details }) {
  
  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(details.length);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setTotalCount(details.length);
    return details.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  
  const [searchField, setSearchField] = useState("");

  const filteredPersons = currentTableData.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .email
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
    //setTotalCount(filteredPersons.length);
  };

  function searchList() {
    return (
      <div>
        <DataList filteredPersons={filteredPersons} />
         <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      </div>
    )
  }

  return (
    <>
    <section className="garamond">
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search People" 
          onChange = {handleChange}
        />
      </div>
      {searchList()}
    </section>
    
    </>
  );
}

export default Main;