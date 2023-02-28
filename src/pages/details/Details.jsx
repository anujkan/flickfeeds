import React, { useEffect, useState } from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import CarouselPanel from "../../components/carouselPanel/CarouselPanel";
import { useSelector } from "react-redux";

const Details = () => {
  const [similar, setSimilar] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(
    `/${
      mediaType === "movies" || mediaType === "movie" ? "movie" : "tv"
    }/${id}/videos`
  );
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${
      mediaType === "movies" || mediaType === "movie" ? "movie" : "tv"
    }/${id}/credits`
  );

  const { similarMoviesData, recommendationsData } = useSelector(
    (state) => state.carouselData
  );

  const getCarouselData = (data) => {
    let carouselData = data?.find(
      (item) =>
        item.type ===
        (mediaType === "movies" || mediaType === "movie" ? "movies" : "tv")
    );

    const createFetchUrl = carouselData?.fetchUrl?.split("/");
    createFetchUrl?.splice(2, 1, id);
    const fetchUrl = createFetchUrl?.join("/");

    return [{ ...carouselData, fetchUrl }];
  };

  useEffect(() => {
    setSimilar(getCarouselData(similarMoviesData));
    setRecommended(getCarouselData(recommendationsData));
  }, []);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      {data?.results?.length > 0 && (
        <VideosSection data={data} loading={loading} />
      )}
      {similar?.length && (
        <CarouselPanel
          title={mediaType === "tv" ? "Similar Tv Shows" : "Similar Movies"}
          data={similar}
        />
      )}
      {recommended?.length && (
        <>
          <CarouselPanel title="Recommendations" data={recommended} />
        </>
      )}
    </div>
  );
};

export default Details;
