import React from 'react'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';
const PageBtnContainer = () => {

  const {data: {numOfPages,currentPage}} = useAllJobsContext();

  const pages = Array.from({length: numOfPages},
    (_,index)=>index+1)

    const {search,pathname}=useLocation();
    const navigate = useNavigate();
    const handlePageChange=(pageNumber)=>{
      const searchParams = new URLSearchParams(search);
      searchParams.set('page',pageNumber)
      navigate(`${pathname}?${searchParams.toString()}`)
    }

    const addPageBtn = ({pageNumber,activeClass})=>{
      return <button className={
        `btn page-btn ${activeClass && 'active'}`
      }
      key={pageNumber}
      onClick={()=>handlePageChange(pageNumber)}>
        {pageNumber}
      </button>
    }

    const renderPageButtons = ()=>{
      const pageButtons=[];
      pageButtons.push(addPageBtn({
          pageNumber:1,
          activeClass: currentPage===1
        }))
        //dots
        if(currentPage>3){
          pageButtons.push(
              <span className='page-btn dots' key="dots-1">. . .</span>
              )
        }
        //previous of current page
        if(currentPage!==1 && currentPage!==2){
          pageButtons.push(addPageBtn({
            pageNumber:currentPage-1,
            activeClass: false
          }))
        }
      //current page
      if(currentPage!==1 && currentPage!==numOfPages){
        pageButtons.push(addPageBtn({
          pageNumber:currentPage,
          activeClass: true
        }))
      }
      //next button for current page button
      if(currentPage!==numOfPages && currentPage!==numOfPages-1){
        pageButtons.push(addPageBtn({
          pageNumber:currentPage+1,
          activeClass: false
        }))
      }
        //dots
        if(currentPage<numOfPages-2){
          pageButtons.push(
              <span className='page-btn dots' key="dots+1">. . .</span>
              )
        }
      pageButtons.push(addPageBtn({
        pageNumber:numOfPages,
        activeClass: currentPage===numOfPages
      }))
      return pageButtons
    }
  return (
    <Wrapper>
      <button className="btn prev-btn"
              onClick={()=>{
                let prevPage = currentPage-1;
                if(prevPage<1) prevPage = numOfPages;
                handlePageChange(prevPage)
              }}>
        <HiChevronDoubleLeft/>prev
      </button>
      <div className="pagebtn-container">
          {renderPageButtons()}
      </div>
      <button className="btn next-btn"
              onClick={()=>{
                let nextPage = currentPage+1;
                if( nextPage> numOfPages) nextPage = 1;
                handlePageChange(nextPage)
              }}>
                Next <HiChevronDoubleRight/>
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer