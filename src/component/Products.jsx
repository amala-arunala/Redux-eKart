import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import ReactPaginate from "react-paginate";

const Products = () => {
  const searchRef = useRef();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data.slice(0, 50));
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  const cardsPerPage = 10;

  const visitedPage = count * cardsPerPage;

  const searchHandler = (event) => {
    event.preventDefault();
    const searchKey = searchRef.current.value;
    setSearch(searchKey);
    show ? setShow(false) : setShow(true);
  };

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const response = await fetch(
        "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
      );
      if (setIsLoading) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const Loading = () => {
    return <div>Loading........</div>;
  };

  const ShowProducts = () => {
    return (
      <>
        {data
          .filter((product) => {
            if (search === "") {
              return product;
            } else if (
              product.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return product;
            }
          })
          .slice(visitedPage, visitedPage + cardsPerPage)
          .map((product) => {
            return (
              <>
                <div className="col-md-3 mb-4">
                  <div className="card h-100 text-center p-4" key={product.id}>
                    <img
                      src={product.image_link}
                      alt={product.name}
                      height="200px"
                    />
                    <div className="card-body ">
                      <h5 className="card-title mb-0">{product.name}</h5>

                      <p className="card-text lead fw-bold bg-info my-3">
                        ${product.price}
                      </p>
                      <NavLink
                        to={`/products/${product.id}`}
                        className="btn btn-primary my-2"
                      >
                        View details
                      </NavLink>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </>
    );
  };

  const pageCount = Math.ceil(filter.length / cardsPerPage);
  const pageChange = ({ selected }) => {
    setCount(selected);
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="searchbox">
          <form onSubmit={searchHandler}>
            <input type="text" placeholder="Search Products" ref={searchRef} />
            <button type="submit"> Search</button>
          </form>
        </div>
        {!show && (
          <ReactPaginate
            previousLabel="<<"
            nextLabel=">>"
            pageCount={pageCount}
            onPageChange={pageChange}
            containerClassName={"pagination justify-content-center my-4"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        )}
        <div className="row justify-content-center">
          {isLoading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
