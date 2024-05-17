import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Demand = () => {
  const [drugName, setDrugName] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getDrugByName = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/drugs/by-name/?name=${drugName}`);
      return result.data;
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const { isLoading, error } = useQuery({
    queryKey: ['drug', drugName],
    queryFn: getDrugByName,
    onSuccess: (data) => {
      if (data.length > 0) {
        navigate('/data', { state: { list: data } });
      } else {
        navigate('/wrong_search');
      }
    },
    enabled: !!drugName,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: getDrugByName,
    onSuccess: (data) => {
      if (data.length > 0) {
        navigate('/data', { state: { list: data } });
      } else {
        navigate('/wrong_search');
      }
    },
  });

  return (
    <div className="demand-container">
      <h1> Запит на пошук ліків </h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Введіть назву товару:</label>
        <input
          type="text"
          name="drug_name"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
        />
        <button type="submit">Пошук</button>
      </form>
    </div>
  );
};

export default Demand;