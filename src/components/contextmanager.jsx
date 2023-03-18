import {UserProvider} from "@auth0/nextjs-auth0/client";

export function ContextManager({children}) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
}