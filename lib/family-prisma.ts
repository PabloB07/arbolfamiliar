'use server';

import { prisma } from './prisma';

/**
 * Obtiene todos los miembros de la familia de un usuario específico
 */
export async function getFamilyMembers(userId: string) {
    try {
        const members = await prisma.familyMember.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return { data: members, error: null };
    } catch (error) {
        console.error('Error getting family members:', error);
        return { data: null, error };
    }
}

/**
 * Crea un nuevo miembro de la familia
 */
export async function createFamilyMember(
    userId: string,
    memberData: {
        firstName: string;
        lastName: string;
        maidenName?: string;
        birthDate?: Date;
        deathDate?: Date;
        gender?: string;
        photoUrl?: string;
        bio?: string;
        birthPlace?: string;
        deathPlace?: string;
        occupation?: string;
    }
) {
    try {
        const member = await prisma.familyMember.create({
            data: {
                userId,
                ...memberData,
            },
        });

        return { data: member, error: null };
    } catch (error) {
        console.error('Error creating family member:', error);
        return { data: null, error };
    }
}

/**
 * Actualiza un miembro de la familia
 */
export async function updateFamilyMember(
    memberId: string,
    memberData: Partial<{
        firstName: string;
        lastName: string;
        maidenName?: string;
        birthDate?: Date;
        deathDate?: Date;
        gender?: string;
        photoUrl?: string;
        bio?: string;
        birthPlace?: string;
        deathPlace?: string;
        occupation?: string;
    }>
) {
    try {
        const member = await prisma.familyMember.update({
            where: { id: memberId },
            data: memberData,
        });

        return { data: member, error: null };
    } catch (error) {
        console.error('Error updating family member:', error);
        return { data: null, error };
    }
}

/**
 * Elimina un miembro de la familia
 */
export async function deleteFamilyMember(memberId: string) {
    try {
        await prisma.familyMember.delete({
            where: { id: memberId },
        });

        return { error: null };
    } catch (error) {
        console.error('Error deleting family member:', error);
        return { error };
    }
}

/**
 * Obtiene todas las relaciones de un usuario
 */
export async function getRelationships(userId: string) {
    try {
        const relationships = await prisma.relationship.findMany({
            where: { userId },
            include: {
                member: true,
                relatedMember: true,
            },
        });

        return { data: relationships, error: null };
    } catch (error) {
        console.error('Error getting relationships:', error);
        return { data: null, error };
    }
}

/**
 * Crea una nueva relación familiar
 */
export async function createRelationship(
    userId: string,
    memberId: string,
    relatedMemberId: string,
    relationshipType: 'parent' | 'spouse' | 'sibling' | 'child'
) {
    try {
        const relationship = await prisma.relationship.create({
            data: {
                userId,
                memberId,
                relatedMemberId,
                relationshipType,
            },
        });

        return { data: relationship, error: null };
    } catch (error) {
        console.error('Error creating relationship:', error);
        return { data: null, error };
    }
}

/**
 * Elimina una relación familiar
 */
export async function deleteRelationship(relationshipId: string) {
    try {
        await prisma.relationship.delete({
            where: { id: relationshipId },
        });

        return { error: null };
    } catch (error) {
        console.error('Error deleting relationship:', error);
        return { error };
    }
}
