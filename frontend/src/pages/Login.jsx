import { useState } from 'react';
import api, { setAuthToken } from '../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, senha });
      setAuthToken(res.data.token);
      localStorage.setItem('usuario', JSON.stringify(res.data));
      alert('Login bem-sucedido!');
      // redirecionamento futuro
    } catch (err) {
      setErro('Credenciais inválidas');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded mb-2 w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="p-2 border rounded mb-2 w-64"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-64"
      >
        Entrar
      </button>
      {erro && <p className="text-red-500 mt-2">{erro}</p>}
    </div>
  );
}
