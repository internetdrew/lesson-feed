import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userAtom';

const NavProfile = () => {
  const user = useRecoilValue(userState);
  console.log(user);
  return (
    <div className='flex items-center'>
      <Link href={'/profile/user'}>
        <span className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-500'>
          <span className='font-medium leading-none text-white'>TU</span>
        </span>
      </Link>
      <div className='ml-4'>
        <p className='text-lg font-medium text-gray-700 group-hover:text-gray-900'>
          {user?.user_metadata?.full_name}
        </p>
        <Link href='/profile/user'>
          <p className='text-md font-medium text-blue-500 group-hover:text-gray-700'>
            View profile
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
