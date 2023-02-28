import React, { useEffect, useState } from "react";
import Carousel from "../carousel/Carousel";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import SwitchTabs from "../switchTabs/SwitchTabs";
import useFetch from "../../hooks/useFetch";
import "./style.scss";

const CarouselPanel = ({ data, title }) => {
  const initialUrl = data?.find((item) => item.active === true);

  const [endPoint, setEndPoint] = useState(initialUrl);
  const [carouselEndpoint, setCarouselEndpoint] = useState("");
  const { data: carouselData, loading } = useFetch(endPoint?.fetchUrl);

  const onTabChange = (tab) => {
    let findActiveTab = data.find((item) => item.displayName === tab);
    setEndPoint(findActiveTab);
  };

  const getEndPoint = () => {
    const getPoint = endPoint?.displayName?.toLowerCase();
    return getPoint === "tv shows" ? "tv" : "movie";
  };

  useEffect(() => {
    const activeTab = data?.find((item) => item.active === true) || initialUrl;
    setEndPoint(activeTab);
    setCarouselEndpoint(getEndPoint());
  }, [endPoint]);

  return (
    <>
      {carouselData?.results?.length > 0 && (
        <div className="carouselSection">
          <ContentWrapper>
            <span className="carouselTitle">{title}</span>
            {data?.find((item) => item.showTabs === true) && (
              <SwitchTabs
                data={data.map((item) => item.displayName)}
                activeTabData={data.find((item) => item.active === true)}
                onTabChange={onTabChange}
              />
            )}
          </ContentWrapper>

          <Carousel
            data={carouselData?.results}
            endPoint={carouselEndpoint}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};

export default CarouselPanel;
