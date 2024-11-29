/* eslint-disable -- Disable ESLint for this file to allow flexible type definitions for next-auth */
import NextAuth from 'next-auth/next';
import type { DefaultSession, DefaultUser } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      accesstoken: string
      refreshtoken: string
      nickname: string
      role: string
      memberUUID: string
      failed: boolean
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accesstoken: string
    refreshtoken: string
    nickname: string
    role: string
    memberUUID: string
    failed: boolean
  }
}