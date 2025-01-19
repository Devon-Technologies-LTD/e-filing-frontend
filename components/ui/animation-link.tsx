'use client';

import Link from "next/link";
import React from "react";

type TransformingLineLinkProps = {
    href?: string;
    text?: string;
};

const TransformingLineLink: React.FC<TransformingLineLinkProps> = ({
    href = "/forgot",
    text = "CAN'T LOG IN?",
}) => {
    return (
        <div className="flex items-center justify-center">
            <div className="items-center text-app-primary group relative">
                <Link href={href} className="text-xs text-center font-bold text-app-primary mt-3 z-10">
                    {text}
                </Link>
                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-app-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-32 group-hover:bg-app-secondary"></div>
            </div>
        </div>
    );
};

export default TransformingLineLink;
