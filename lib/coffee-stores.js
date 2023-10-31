import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeeStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
  });
  const unsplashResults = photos.response.results || [];

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "36.28495500078914,59.568285892103646",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  //"36.28495500078914,59.568285892103646"
  const response = await fetch(
    getUrlForCoffeeeStores(latLong, "coffee", limit),
    options
  );
  const data = await response.json();
  return data.results.map((result, idx) => {
    const neighborhood = result.location.formatted_address;
    return {
      id: result.fsq_id,
      address: result.location.address != null ? result.location.address : "",
      name: result.name,
      neighborhood: neighborhood.length > 0 ? neighborhood : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });

  // .catch((err) => console.error(err));
};
