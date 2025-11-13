"use client";
import React, { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";

// Generic HOC with props typing
const withAuth = <P extends object>(Component: ComponentType<P>) => {
    const AuthenticatedComponent = (props: P) => {
        const router = useRouter();
        const [isCheckingAuth, setIsCheckingAuth] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.replace("/login"); // use replace to prevent back nav
            } else {
                setIsCheckingAuth(false);
            }
        }, [router]); // ✅ Include router in dependencies

        if (isCheckingAuth) {
            return <div className="text-white" > Checking authentication...</div>;
        }

        return <Component {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
