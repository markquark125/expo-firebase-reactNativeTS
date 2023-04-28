import React from 'react';
// import our created authentication hook
import { useAuthentication } from '../utils/hooks/useAuthentication';
// import the stacks we've created for two types of users: authenticated and not
import UserStack from './userStack';
import AuthStack from './authStack';

export default function RootNavigation() {
  // Destructuring assignment: const {a} = obj
  const { user } = useAuthentication();

  // Determine whether a logged-in user and loads one of two stacks
  return user ? <UserStack /> : <AuthStack />;
}
