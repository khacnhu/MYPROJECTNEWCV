import React from "react";
import { MDBPagination, MDBPaginationItem, MDBBtn } from "mdb-react-ui-kit";
import "./pagination.css"

const Pagination = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;
    if (currentPage === 1) {
      return (
        <MDBPagination center className="mb-3">
          <MDBPaginationItem>
            <p className="fw-bold mt-1">1</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="buttonPagination"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <MDBPagination center className="mb-3">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="buttonPagination"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
          <MDBBtn
              rounded
              className="buttonPagination"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              {currentPage-1}
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
          <MDBBtn
              rounded
              className="buttonActive"
              onClick={() => dispatch(setCurrentPage(currentPage))}
            >
              {currentPage}
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
          <MDBBtn
              rounded
              className="buttonPagination"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              {currentPage+1}
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="buttonPagination"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="mb-3">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="buttonPagination"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return <div className="mt-4">{renderPagination()}</div>;
};

export default Pagination;