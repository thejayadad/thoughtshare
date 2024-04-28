import React from 'react';
import clsx from 'clsx';

const variants = {
    default: 'text-gray-500',
    success: 'text-green-500',
};

const sizes = {
    default: 'h-8 w-8',
    small: 'h-4 w-4',
};

const Badge = ({ icon: Icon, size = 'default', variant = 'default' }) => {
    return (
        <div
        className={clsx(
            'flex items-center justify-center rounded-full',
            'bg-primary', // Primary background color
            'p-2', // Stylish padding around the icon
            sizes[size],
            variants[variant]
        )}
    >
        {Icon && <Icon className="w-6 h-6" />}
    </div>
    );
};

export default Badge;
