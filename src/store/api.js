import axios from "axios";
// const url = "https://jsonplaceholder.typicode.com/users";

const fetchGetUsers = () => {
  const callApi = axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
  return callApi;
};

export default fetchGetUsers;
