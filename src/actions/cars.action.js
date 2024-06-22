export const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const getCar = async () => {
  try {
    const res = await axios.get(`${base_url}/cars`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const postCar = async (payload) => {
  try {
    const res = await axios.post(`${base_url}/cars`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const updateCar = async (id, payload) => {
  try {
    const res = await axios.put(`${base_url}/cars/${id}`, payload, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const deleteCar = async (id) => {
  try {
    const res = await axios.delete(`${base_url}/cars/${id}`, {headers});
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const getCities = async () => {
  try {
    const res = await axios.get(`${base_url}/cities`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async() => {
  try {
      const res = await axios.get(`${base_url}/categories`)
      return res
  } catch (error) {
      console.log(error);
      
  }
}

export const getBrand = async () => {
  try {
    const res = await axios.get(`${base_url}/brands`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const getLocation = async () => {
  try {
    const res = await axios.get(`${base_url}/locations`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};

export const getModels = async () => {
  try {
    const res = await axios.get(`${base_url}/models`);
    return res?.data
  } catch (error) {
    console.log(error);
  }
};