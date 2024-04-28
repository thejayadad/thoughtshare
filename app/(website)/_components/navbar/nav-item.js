'use client'
import { usePathname } from "next/navigation";
import React from 'react';
import { Button } from "@nextui-org/react";
import Link from "next/link";

const NavItems = () => {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");
    const isUserPage = pathname?.includes("/post");

    return (
        <div className="ml-auto">
            {isAdminPage || isUserPage ? (
                <Button
                variant="light"
                onClick={() => window.location.href = '/'}>
                    Exit
                </Button>
            ) : (
                <Link href={'/admin/posts'}>
                    <Button
                    variant="light"
                    >
                        AdminView
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default NavItems;
