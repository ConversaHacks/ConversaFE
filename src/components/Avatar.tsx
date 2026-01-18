interface AvatarProps {
    name: string;
    color: string;
    size?: 'sm' | 'md' | 'lg';
}

const Avatar = ({ name, color, size = "md" }: AvatarProps) => {
    const sizes = {
        sm: "w-8 h-8 text-xs",
        md: "w-12 h-12 text-sm",
        lg: "w-20 h-20 text-xl"
    };

    return (
        <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-slate-700 font-semibold shrink-0`}>
            {name.split(' ').map(n => n[0]).join('')}
        </div>
    );
};

export default Avatar;
