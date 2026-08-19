export type UserResponse = {
  id: number;
  name: string;
  email: string | null;
  mobile: string | null;
  country_code: string | null;
  gender: string | null;
  age: number | null;
  qualification: string | null;
  google_access_token: string | null;
  image: string | null;
  is_guest: boolean;
  is_active: boolean;
};