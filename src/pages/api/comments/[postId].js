import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
  const { method } = req;
  const { postId } = req.query;
  const supabase = createServerSupabaseClient({ req, res });

  const { userId, comment } = req.body;

  if (method !== 'GET' && method !== 'POST')
    return res.status(405).json('Method not allowed.');

  switch (method) {
    case 'GET':
      const { data } = await supabase
        .from('comments')
        .select(`*, users(id, avatar, name)`)
        .eq('post_id', postId);
      res.status(200).json(data);
      break;

    case 'POST':
      const { error } = await supabase
        .from('comments')
        .insert({ post_id: postId, user_id: userId, text: comment });
      if (!error)
        res.status(200).json({ message: 'successfully added new comment' });
      break;
  }
}
