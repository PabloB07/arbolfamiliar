'use client';

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  // 1. Crear usuario en Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  // 2. Si el registro fue exitoso, sincronizar con Prisma
  if (data.user && !error) {
    try {
      const response = await fetch('/api/auth/sync-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
          fullName,
        }),
      });

      if (!response.ok) {
        console.error('Error syncing profile with Prisma');
      }
    } catch (syncError) {
      console.error('Failed to sync profile:', syncError);
      // No fallar el registro si la sincronización falla
    }
  }

  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Family members helpers
export const getFamilyMembers = async (userId: string) => {
  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const createFamilyMember = async (
  memberData: any, // Using any type - update with proper types after Supabase setup
  userId: string
) => {
  const { data, error } = await (supabase
    .from('family_members')
    .insert({ ...memberData, user_id: userId }) as any)
    .select()
    .single();

  return { data, error };
};

export const updateFamilyMember = async (
  memberId: string,
  memberData: any // Using any type - update with proper types after Supabase setup
) => {
  const { data, error } = await (supabase as any)
    .from('family_members')
    .update(memberData)
    .eq('id', memberId)
    .select()
    .single();

  return { data, error };
};

export const deleteFamilyMember = async (memberId: string) => {
  const { error } = await supabase
    .from('family_members')
    .delete()
    .eq('id', memberId);

  return { error };
};

// Relationships helpers
export const getRelationships = async (userId: string) => {
  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .eq('user_id', userId);

  return { data, error };
};

export const createRelationship = async (
  userId: string,
  memberId: string,
  relatedMemberId: string,
  relationshipType: string
) => {
  const { data, error } = await (supabase as any)
    .from('relationships')
    .insert({
      user_id: userId,
      member_id: memberId,
      related_member_id: relatedMemberId,
      relationship_type: relationshipType,
    })
    .select()
    .single();

  return { data, error };
};

