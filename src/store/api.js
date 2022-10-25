import BASE_URL from "../utils/base_url";
const url = "/walmart";

const fetchGetUsers = () => {
  const fetchApi = BASE_URL(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
  return fetchApi;
};

export default fetchGetUsers;
