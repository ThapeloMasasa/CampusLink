// utils/profileUtils.ts
import { supabase } from '../../supabaseClient';
import { post, currentUser } from '../types/types';

export const loadUserProfileFromContext = (state: any): { profile: currentUser; posts: post[] } => {
  const userProfile = state.currentProfile;
  const allPosts = state.allPosts || [];

  if (!userProfile) throw new Error('User profile not found in context');

  const userPosts = allPosts
    .filter((p: { owner: any; }) => p.owner === userProfile.id)
    .sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return { profile: userProfile, posts: userPosts };
};

export const handleMyDayUpload = async (imageUri: string, userId: string | undefined): Promise<void> => {
  if (!userId) throw new Error('User ID is missing');

  const fileName = `myday-${Date.now()}.jpg`;

  const response = await fetch(imageUri);
  const blob = await response.blob();

  const { error: storageError } = await supabase.storage
    .from('mayday')
    .upload(fileName, blob, { contentType: 'image/jpeg' });

  if (storageError) throw storageError;

  const { data: publicUrlData } = supabase.storage.from('mayday').getPublicUrl(fileName);

  const publicUrl = publicUrlData.publicUrl;

  const { error: dbError } = await supabase.from('Myday').insert([{ image: publicUrl, owner: userId }]);

  if (dbError) throw dbError;
};
