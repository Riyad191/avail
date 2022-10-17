import BASE_URL from "../utils/base_url";
const url = "/availability/5";

const fetchGetUsers = () => {
  const fetchApi = BASE_URL.get(url)
    .then((response) => {
      console.log("utilsApi:", response);
      return response;
    })
    .catch((error) => {
      throw error;
    });
  return fetchApi;
};

export default fetchGetUsers;
