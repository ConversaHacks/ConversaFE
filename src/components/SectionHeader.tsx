import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
    title: string;
    icon?: LucideIcon | null;
}

const SectionHeader = ({ title, icon: Icon }: SectionHeaderProps) => (
    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
        {Icon && <Icon size={14} />}
        {title}
    </h3>
);

export default SectionHeader;
