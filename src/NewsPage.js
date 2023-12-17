import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import NewsCard from "./components/Newscard.js";


const NewsPage = () => {

    const[articles, setArticles] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const[query, setQuery] = useState("");
    const [serachInput, setSearchInput] = useState("");

    const handlePageChange = event => {
        setCurrentPage(event.selected);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setCurrentPage(0);
        setQuery(serachInput);
    }
    useEffect(() =>{
        setIsLoading(true);
        
        const fetchData = async () => {
            try {
                const {data} = await axios.get(
                    "http://hn.algolia.com/api/v1/search?",
                        {
                            params: {page: currentPage, query},
                        }
                    );
                const {hits, nbPages} = data;
                setArticles(hits);
                setTotalPages(nbPages);
            }catch(err){
                console.log(err);
            }finally{
                setIsLoading(false);
            }

        };
        fetchData();
    }, [currentPage, query])
    
    return (
        <div className = "container">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    placeholder="Search for news"
                    value={serachInput}
                    onChange = {event => setSearchInput(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className = "news-container">
                {
                    isLoading ? ( 
                        <p>Loading...</p> 
                    ) : (
                        articles.map( (article) => (
                            <NewsCard article={article} key = {article.objectID} />
                        ))
                )}
            </div>
            <ReactPaginate 
                nextLabel = ">>"
                previousLabel = "<<"
                breakLabel = "..."
                forcePage = {currentPage}
                pageCount = {totalPages}
                renderOnZeroPageCount={null}
                onPageChange={handlePageChange}
                className = "pagination"
                activeClassName="active-page"
                previousClassName="previous-page"
                nextClassName="next-page"
            />
        </div>
    );
};

export default NewsPage;