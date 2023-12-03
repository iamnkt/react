export type Errs = {
  [key: string]: string;
};

export type ErrsState = {
  name?: string;
  age?: string;
  email?: string;
  gender?: string;
  password?: string;
  password2?: string;
  country?: string;
  terms?: string;
  image?: string;
};

export type ErrorMsgProps = {
  msg: string;
};

export type FormData = {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  password2: string;
  country: string;
  terms?: boolean | undefined;
  image?: FileList | undefined;
};
