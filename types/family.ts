export interface FamilyMember {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  maiden_name?: string | null;
  birth_date?: string | null;
  death_date?: string | null;
  gender?: 'male' | 'female' | 'other' | null;
  photo_url?: string | null;
  bio?: string | null;
  birth_place?: string | null;
  death_place?: string | null;
  occupation?: string | null;
  created_at: string;
  updated_at: string;
  parents?: FamilyMember[];
  children?: FamilyMember[];
  spouse?: FamilyMember | null;
}

export interface Relationship {
  id: string;
  user_id: string;
  member_id: string;
  related_member_id: string;
  relationship_type: 'parent' | 'spouse' | 'sibling' | 'child';
  created_at: string;
}

export interface TreeNode {
  member: FamilyMember;
  children: TreeNode[];
  level: number;
}

