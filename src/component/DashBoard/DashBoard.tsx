"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { MenuOpen as MenuOpenIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AppDispatch } from "@/redux/store";
import { getUserSelector } from "@/redux/reducers/user/selectors";
import { signOut as authSignOut } from '@/auth/auth';
import { fetchUserRequest } from "@/redux/reducers/user/actions";
import { AppProvider, type Session, type Navigation, AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { parseCookies } from "nookies";
import { Grid } from "@mui/system";

const NAVIGATION: Navigation = [
    { kind: 'header', title: 'Main items' },
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon  fontSize="small" /> },
    { segment: 'order', title: 'Talk to QBot', icon: <ShoppingCartIcon fontSize="small" /> },
    { segment: 'chatbots', title: 'QBot', icon: <ChatIcon fontSize="small" /> },
    // { kind: 'divider' },
    // { kind: 'header', title: 'Talk analytics' },
    // {
    //     segment: 'reports', title: 'Reports', icon: <BarChartIcon  />, children: [
    //         { segment: 'sales', title: 'Sales', icon: <DescriptionIcon  /> },
    //         { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon  /> },
    //     ],
    // },
    // { segment: 'integrations', title: 'Integrations', icon: <LayersIcon  /> },
];

const useUserSession = () => {
    const { accessToken } = parseCookies();
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector(getUserSelector);
    const [session, setSession] = useState<Session | null>(currentUser);
    const router = useRouter();

    useEffect(() => {
        if (accessToken) dispatch(fetchUserRequest());
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (currentUser?.user?.data) {
            setSession({
                user: {
                    name: currentUser.user.data.username,
                    email: currentUser.user.data.email,
                    image: 'https://avatars.githubusercontent.com/u/19550456',
                },
            });
        }
    }, [currentUser]);

    const signIn = useCallback(() => {
        setSession({
            user: {
                name: currentUser?.user?.data?.username,
                email: currentUser?.user?.data?.email,
                image: 'https://avatars.githubusercontent.com/u/19550456',
            },
        });
    }, [currentUser]);

    const signOut = useCallback(async () => {
        await authSignOut();
        router.push('/');
    }, [router]);

    return { session, signIn, signOut };
};

const useMemoizedRouter = () => {
    const router = useRouter();
    const currentPath = usePathname();
    const searchParams = new URLSearchParams(window.location.search);

    return useMemo(() => ({
        pathname: currentPath,
        searchParams,
        navigate: (path: string | URL) => router.push(String(path)),
    }), [currentPath, router]);
};

const DashBoard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session, signIn, signOut } = useUserSession();
    const memoizedRouter = useMemoizedRouter();
    const lightTheme = useMemo(() => createTheme({ palette: { mode: 'light' } }), []);
    const authentication = useMemo(() => ({ signIn, signOut }), [signIn, signOut]);
    const currentPath = usePathname();

    const DashboardLayouts =
        currentPath === '/chatbot-details' || currentPath === '/order' ? (
            children
        ) : (
            <DashboardLayout
                defaultSidebarCollapsed
                collapsed={true}
            >
                <PageContainer
                    title=""
                    breadcrumbs={[]}
                >
                    {children}
                </PageContainer>
            </DashboardLayout>
        );

    return (
        <AppProvider
            session={session}
            theme={lightTheme}
            authentication={authentication}
            navigation={NAVIGATION}
            router={memoizedRouter}
            branding={{
                logo: <img src="/logo.png" alt="QBot logo" width="100" height={60} className="max-h-48" />,
                title: 'QBot',
            }}
        >
            {DashboardLayouts}
        </AppProvider>
    );
};

export default DashBoard;

