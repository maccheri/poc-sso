import useAuth from '../hooks/useAuth';

export default function Home() {
  const { user, signin } = useAuth();
  console.log('🚀 ~ file: index.js ~ line 5 ~ Home ~ user', user);

  return (
    <div>
      Teste build app
      <button onClick={() => signin()}>Entrar com google</button>
    </div>
  );
}
