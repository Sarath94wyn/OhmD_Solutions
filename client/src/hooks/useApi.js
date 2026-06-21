import { useState, useCallback } from 'react';
import api from '../utils/api';

export default function useApi(method = 'get', url = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (urlOrPayload, payload) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      const finalUrl = typeof urlOrPayload === 'string' ? urlOrPayload : url;
      const finalPayload = typeof urlOrPayload === 'string' ? payload : urlOrPayload;

      if (method === 'get' || method === 'delete') {
        response = await api[method](finalUrl, { params: finalPayload });
      } else {
        response = await api[method](finalUrl, finalPayload);
      }

      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [method, url]);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, loading, error, execute, reset };
}
