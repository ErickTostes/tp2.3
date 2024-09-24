import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './UserProfileEdit.css';

const UserProfileEdit = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${userId}`);
        const userData = response.data;

        
        setValue('name', userData.name);
        setValue('email', userData.email);
        setValue('age', userData.age);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      
      const response = await axios.put(`https://dummyjson.com/users/${userId}`, data);
      alert('Perfil atualizado com sucesso!'); 
      console.log(response.data);
    } catch (error) {
      alert('Erro ao atualizar perfil!');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edição de Perfil de Usuário</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Idade:</label>
          <input
            id="age"
            type="number"
            {...register('age', {
              required: 'Idade é obrigatória',
              min: { value: 0, message: 'Idade deve ser um número positivo' },
            })}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Atualizando...' : 'Atualizar Perfil'}
        </button>
      </form>
    </div>
  );
};

export default UserProfileEdit;
