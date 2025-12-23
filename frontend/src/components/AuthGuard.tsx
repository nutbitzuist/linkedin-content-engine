import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { getCurrentUser, isAuthenticated } from '../lib/api';
import { useStore } from '../lib/store';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const location = useLocation();
    const { user, setUser } = useStore();
    const [isChecking, setIsChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            // If no token, redirect to login
            if (!isAuthenticated()) {
                setIsChecking(false);
                setIsValid(false);
                return;
            }

            // If we already have user in store, we're good
            if (user) {
                setIsChecking(false);
                setIsValid(true);
                return;
            }

            // Otherwise, verify token with backend
            try {
                const response = await getCurrentUser();
                if (response.success && response.data) {
                    setUser(response.data);
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            } catch {
                // Token is invalid
                setIsValid(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [user, setUser]);

    // Show loading spinner while checking
    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-success mb-4 animate-pulse">
                        <Sparkles className="w-8 h-8 text-dark-900" />
                    </div>
                    <p className="text-zinc-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isValid) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
