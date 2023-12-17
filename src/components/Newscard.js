const NewsCard = ({article}) => {

    if(!article.title) return null;

    return(
        <div className = "news-card">
            <div>
                <h3>{article.title}</h3>
                <a href = {article.url}>Read More...</a>
            </div>
            <h4>Points:{article.points}</h4>
        </div>
    );
};

export default NewsCard;