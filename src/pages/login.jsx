import Image from 'next/image';
import loginImage from '/public/login.jpg';
import { FcGoogle } from 'react-icons/fc';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Login = () => {
  const supabase = useSupabaseClient();

  const handleGoogleSignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: '/' },
    });
  };

  return (
    <div className='h-screen flex items-center justify-center bg-teal-600'>
      <section className='mx-auto bg-slate-50 rounded-md w-[90%] sm:w-3/5 grid lg:grid-cols-2 '>
        <div className='left relative h-80 lg:h-full'>
          <Image
            src={loginImage}
            alt='Picture of woman writing in notepad'
            width={500}
            height={500}
            style={{ objectFit: 'cover' }}
            className='w-full h-full object-cover'
            priority
          />
        </div>

        <div className='right flex flex-col items-center justify-center mb-10'>
          <h1 className='text-teal-600 text-4xl font-bold p-4'>LessonCollab</h1>
          <p className='w-3/4 text-center text-gray-400 mb-10'>
            Improve your lesson plans with collaborative feedback from other
            educators.
          </p>

          <button
            type='button'
            className='w-3/4 border rounded-lg py-3 inline-flex items-center justify-center gap-2 text-gray-800 hover:shadow-lg duration-300'
            onClick={handleGoogleSignin}
          >
            <FcGoogle className='text-xl' />
            Continue with Google
          </button>
        </div>
      </section>
    </div>
  );
};

export default Login;
