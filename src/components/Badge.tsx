interface BadgeProps {
    children: React.ReactNode;
    color?: string;
}

const Badge = ({ children, color = "bg-slate-100 text-slate-600" }: BadgeProps) => (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
        {children}
    </span>
);

export default Badge;
