const getUrlForCoffeeeStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };
  const response = await fetch(
    getUrlForCoffeeeStores(
      "36.31594158076385,59.508994534824716",
      "coffee",
      "8"
    ),
    options
  );
  const data = await response.json();
  return data.results;

  // .catch((err) => console.error(err));
};
