interface HeaderBlobProps {
    color?: string;
}

const HeaderBlob = ({ color = "bg-indigo-100" }: HeaderBlobProps) => (
    <div className={`absolute top-0 right-0 w-64 h-64 ${color} rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4 pointer-events-none`} />
);

export default HeaderBlob;
