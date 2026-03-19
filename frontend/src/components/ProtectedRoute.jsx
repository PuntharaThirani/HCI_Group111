import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/login');

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setRedirectPath(requiredRole === 'admin' ? '/designer-login' : '/login');
        setAllowed(false);
        setLoading(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error || !profile) {
        setRedirectPath(requiredRole === 'admin' ? '/designer-login' : '/login');
        setAllowed(false);
        setLoading(false);
        return;
      }

      if (requiredRole) {
        const hasAccess = profile.role === requiredRole;
        setAllowed(hasAccess);

        if (!hasAccess) {
          setRedirectPath(profile.role === 'admin' ? '/admin' : '/workspace');
        }
      } else {
        setAllowed(true);
      }

      setLoading(false);
    };

    checkAccess();
  }, [requiredRole]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Checking access...
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;