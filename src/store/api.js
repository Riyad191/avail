import axios from "axios";
const url = "";

const fetchGetUsers = () => {
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export default fetchGetUsers;
