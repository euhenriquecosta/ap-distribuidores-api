export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IDeleteUser {
  id: number;
}

export interface IFindUser {
  id: number;
}

export interface IFindUserByEmail {
  email: string;
}

export interface IFindUserByName {
  firstName: string;
}

export interface IFindUserByLastName {
  lastName: string;
}

export interface IFindUserByEmailAndPassword {
  email: string;
  password: string;
}

export interface IFindUserByEmailAndPasswordHash {
  email: string;
  passwordHash: string;
}

export interface IComparePassword {
  password: string;
  passwordHash: string;
}

export interface IGenerateToken {
  id: number;
  email: string;
}

export interface IListUser {
  users: IUser[];
}

export interface ICreateUserService {
  data: ICreateUser;
}

export interface IUpdateUserService {
  id: number;
  data: IUpdateUser;
}

export interface IDeleteUserService {
  id: number;
}

export interface IFindUserService {
  id: number;
}

export interface IFindUserByEmailService {
  email: string;
}

export interface IFindUserByNameService {
  firstName: string;
}

export interface IFindUserByLastNameService {
  lastName: string;
}

export interface IFindUserByEmailAndPasswordService {
  email: string;
  password: string;
}

export interface IFindUserByEmailAndPasswordHashService {
  email: string;
  passwordHash: string;
}

export interface IComparePasswordService {
  password: string;
  passwordHash: string;
}

export interface IGenerateTokenService {
  id: number;
  email: string;
}

