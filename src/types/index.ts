export type Form = {
  name: string;
  age: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string | null;
  acceptTerms: boolean;
  file: string | ArrayBuffer | null;
};
