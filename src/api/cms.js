import api from './client';

export const fetchSiteContent = async () => {
  const response = await api.get('cms/site-content/');
  return response.data;
};

export const fetchClassPrograms = async () => {
  const response = await api.get('cms/class-programs/');
  return response.data;
};

export const fetchFAQCategories = async () => {
  const response = await api.get('cms/faq-categories/');
  return response.data;
};

export const createCMSItem = async (endpoint, payload, isMultipart = false) => {
  const headers = isMultipart ? { 'Content-Type': 'multipart/form-data' } : {};
  const response = await api.post(endpoint, payload, { headers });
  return response.data;
};

export const updateCMSItem = async (endpoint, payload, isMultipart = false) => {
  const headers = isMultipart ? { 'Content-Type': 'multipart/form-data' } : {};
  const response = await api.put(endpoint, payload, { headers });
  return response.data;
};

export const deleteCMSItem = async (endpoint) => {
  const response = await api.delete(endpoint);
  return response.data;
};

export const submitEnquiry = async (payload) => {
  const response = await api.post('cms/enquiries/', payload);
  return response.data;
};

export const fetchTransformations = async () => {
  const response = await api.get('cms/transformations/');
  return response.data;
};
