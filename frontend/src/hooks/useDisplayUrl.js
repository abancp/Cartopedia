import { useEffect, useState } from "react";
import collections from "../configurations/collections";

const useDisplayUrl = (url, id) => {
  const [displayUrl, setDisplayUrl] = useState(url);

  useEffect(() => {
    if (url !== "" && url !== undefined) {
      setDisplayUrl(url);
    } else {
      setDisplayUrl(`${collections.server_base}/product-displays/${id}.jpg`);
    }
  }, [url, id]);

  return [displayUrl];
};

export default useDisplayUrl;
