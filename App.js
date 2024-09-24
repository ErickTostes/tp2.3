import React from 'react';
import UserProfileEdit from './UserProfileEdit';

function App() {
  const userId = 1;

  return (
    <div>
      <h1>Editar Perfil de Usuário</h1>
      <UserProfileEdit userId={userId} />
    </div>
  );
}

export default App;
