export type Member = {
  id: string;
  dateOfBirth: string;
  imageUrl?: string;
  displayName: string;
  created: string;
  lastActive: string;
  gender: string;
  description?: string;
  city: string;
  country: string;
};

export type Photo = {
  id: number;
  url: string;
  publicId?: string;
  memberId: string;
};

export type EditableMember = {
  displayName: string;
  description?: string;
  city: string;
  country: string;
};

export class MemberParams {
  gender?: string;
  pageNumber = 1;
  pageSize = 10;
  minAge = 18;
  maxAge = 99;
  orderBy = 'lastActive';
}
