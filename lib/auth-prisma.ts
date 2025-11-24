'use server';

import { prisma } from './prisma';
import { supabase } from './supabase';

/**
 * Sincroniza un usuario de Supabase Auth con la tabla Profile de Prisma
 */
export async function syncUserProfile(userId: string, email: string, fullName?: string) {
    try {
        // Verifica si el perfil ya existe
        const existingProfile = await prisma.profile.findUnique({
            where: { id: userId },
        });

        if (existingProfile) {
            return { profile: existingProfile, error: null };
        }

        // Crea el perfil en Prisma
        const profile = await prisma.profile.create({
            data: {
                id: userId,
                email,
                fullName: fullName || null,
            },
        });

        return { profile, error: null };
    } catch (error) {
        console.error('Error syncing user profile:', error);
        return { profile: null, error };
    }
}

/**
 * Obtiene el perfil completo de un usuario desde Prisma
 */
export async function getUserProfile(userId: string) {
    try {
        const profile = await prisma.profile.findUnique({
            where: { id: userId },
            include: {
                familyMembers: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        return { profile, error: null };
    } catch (error) {
        console.error('Error getting user profile:', error);
        return { profile: null, error };
    }
}

/**
 * Actualiza el perfil de un usuario
 */
export async function updateUserProfile(
    userId: string,
    data: {
        fullName?: string;
        avatarUrl?: string;
    }
) {
    try {
        const profile = await prisma.profile.update({
            where: { id: userId },
            data: {
                fullName: data.fullName,
                avatarUrl: data.avatarUrl,
            },
        });

        return { profile, error: null };
    } catch (error) {
        console.error('Error updating user profile:', error);
        return { profile: null, error };
    }
}

/**
 * Elimina un perfil de usuario (cascada: elimina family members y relationships)
 */
export async function deleteUserProfile(userId: string) {
    try {
        await prisma.profile.delete({
            where: { id: userId },
        });

        return { error: null };
    } catch (error) {
        console.error('Error deleting user profile:', error);
        return { error };
    }
}
