import axiosInstance from "./axiosInstace";

/**
 * Set Authorization tokens.
 *
 * @param {string} authToken - Authorization token received from backend
 */
export const setAuthToken = (authToken?: string) => {
  if (authToken) {
    Object.assign(axiosInstance.defaults.headers.common, { Authorization: `Bearer ${authToken}` });
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};
