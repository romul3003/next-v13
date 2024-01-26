import { authConfig } from '@/configs/auth';
import { getServerSession } from 'next-auth/next';

export default async function Profile() {
  const session = await getServerSession(authConfig);

  console.log('session', session);

  return (
    <div>
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && <img src={session?.user?.image} alt="" />}
    </div>
  );
}
