import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Initializes an Auth instance with platform specific default dependencies.
// Syntax - getAuth(app?: FirebaseApp): Auth;
const auth = getAuth();
// Auth is an interface representing Firebase Auth service

export function useAuthentication() {
    // User interface - extends UserInfo.
    // UserInfo interface- User profile information, visible only to the Firebase project's apps.
    const [user, setUser] = React.useState<User>();

    React.useEffect(() => {
        // onAuthStateChanged - adds an observer for changes to the users sign-in state.
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user)=> {
            if (user) {
                // User signed in.
                setUser(user);
            } else {
                // User signed out.
                setUser(undefined);
            }
        });
        
        return unsubscribeFromAuthStateChanged;
    }, []); // Dependency: empty array, i.e., runs once after initial render.

    return {
        user
    };
}