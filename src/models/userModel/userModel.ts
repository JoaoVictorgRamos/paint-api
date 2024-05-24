export interface modelUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  token: Token;
}

export interface Token {
  access_token: string;
  type: string;
  expires: string;
}
