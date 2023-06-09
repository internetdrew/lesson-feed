import { useState } from 'react';
import { Layout, Comments } from '@/src/components';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import moment from 'moment';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import OutsideClickHandler from 'react-outside-click-handler';

const PostDetails = ({ post }) => {
  const [showPostMenu, setShowPostMenu] = useState(false);
  const router = useRouter();
  const user = useUser();

  const currentUserIsPostOwner = user?.id === post?.users?.id;

  const handleDelete = async () => {
    if (!currentUserIsPostOwner) return;
    await axios.delete(`/api/posts/${post.id}`);
    router.push('/');
  };

  return (
    <Layout>
      <div className='overflow-hidden rounded-lg bg-white shadow'>
        <div className='px-4 py-6 sm:px-6 flex items-center gap-2'>
          <span className='inline-flex overflow-hidden shrink-0 h-10 w-10 items-center justify-center rounded-full bg-gray-500'>
            {post?.users?.avatar ? (
              <Image
                src={post?.users?.avatar}
                alt='user image'
                width={48}
                height={48}
                style={{ objectFit: 'cover' }}
              />
            ) : null}
          </span>
          <div className='flex flex-col'>
            <Link href={`/profile/${post?.users?.id}`} className='font-medium'>
              {post?.users?.name}
            </Link>
            <span className='text-gray-500 text-sm'>
              Posted {moment(post?.created_at).calendar()}
            </span>
          </div>
          {currentUserIsPostOwner ? (
            <div className='ml-auto relative w-44 flex flex-col items-end'>
              <button onClick={() => setShowPostMenu(prev => !prev)}>
                <EllipsisVerticalIcon className='w-6 h-6 text-gray-500 mb-2 my-auto' />
              </button>
              {showPostMenu ? (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setShowPostMenu(false);
                  }}
                >
                  <div className='absolute top-8 right-2 duration-500 bg-white w-full border border-slate-200 rounded-md shadow-lg py-2'>
                    <Link
                      href={`/create?edit=${post?.id}`}
                      className='block px-4 py-2 hover:bg-gray-100 duration-300'
                    >
                      Edit post
                    </Link>
                    <button
                      className='w-full px-4 py-2 text-left hover:bg-gray-100 duration-300'
                      onClick={handleDelete}
                    >
                      Delete post
                    </button>
                  </div>
                </OutsideClickHandler>
              ) : null}
            </div>
          ) : null}
          {/* Post menu button */}
        </div>
        <div className='px-4 py-5 sm:p-6'>
          {/* Content goes here */}
          <h1 className='text-xl font-semibold mb-2'>{post?.title}</h1>
          <p className='mb-4 text-justify'>{post?.desc}</p>

          <Link
            href={`/posts/${post?.id}/lesson-plan`}
            className='bg-teal-600 block rounded-md text-white font-semibold mt-10 px-4 py-2 w-full mx-auto duration-300 text-center sm:w-1/2 hover:bg-teal-500 hover:shadow-lg'
            target='_blank'
          >
            View the Lesson Plan
          </Link>

          <div className='hidden gap-2 text-gray-400'>
            <span>#topic</span>
            <span>#topic</span>
            <span>#topic</span>
            <span>#topic</span>
            <span>#topic</span>
          </div>
        </div>
        <div className='px-4 py-4 sm:px-6'>
          <Comments postId={post?.id} />
        </div>
      </div>
    </Layout>
  );
};

export default PostDetails;

export const getServerSideProps = async ({ query }) => {
  try {
    const { postId } = query;

    const { data: postData } = await axios.get(
      `${process.env.SITE_URL}/api/posts/${postId}`
    );

    return { props: { post: postData[0] } };
  } catch (error) {
    console.error(error);
  }
};
