interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Card = ({ children, className = "", onClick }: CardProps) => (
    <div
        onClick={onClick}
        className={`bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100 active:scale-[0.99] transition-transform duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
        {children}
    </div>
);

export default Card;
