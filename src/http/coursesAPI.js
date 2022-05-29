import axios from "axios";
//import { $host } from "./index";

// export const fetchCourses = async () => {
//   const { data } = await $host.get();
//   return data;
// };

export const fetchCourses = async () => {
  const { data } = await axios.get(
    "https://v6.exchangerate-api.com/v6/e34528a7e4be8fd1b87e3fa0/latest/USD"
  );
  return data;
};
