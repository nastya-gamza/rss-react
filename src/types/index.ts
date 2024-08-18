export type BaseForm = {
  name: string;
  age: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string | null;
  acceptTerms: boolean;
};

export type FormWithFile = BaseForm & {
  file: File;
};

export type FormWithBase64File = BaseForm & {
  file: string | ArrayBuffer | null;
};
