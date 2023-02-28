import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../lazyLoadImage/Img";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const [queryLengthErr, setQueryLengthErr] = useState(false);
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const backgroundPath =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(backgroundPath);
  }, [data]);

  const handleSearchQueryInput = (event) => {
    setQueryLengthErr(false);
    setQueryInput(event.target.value);
  };

  const searchQueryHandler = (event) => {
    event.preventDefault();
    if (queryInput.length >= 3) {
      navigate(`/search/${queryInput}`);
    } else {
      setQueryLengthErr(true);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && background && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of Movies, TV shows and people to discover. Explore now.
          </span>
          <form onSubmit={searchQueryHandler}>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a Movie or TV show"
                onChange={handleSearchQueryInput}
                value={queryInput}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          {queryLengthErr && (
            <div className="queryLengthError">
              Must be more than 2 characters
            </div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
