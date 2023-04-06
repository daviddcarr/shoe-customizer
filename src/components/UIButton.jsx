
export default function UIButton({ children, onClick, style, className, tooltip, parentClasses }) {
    return (
        <div className={`group relative flex justify-center ${ parentClasses }`}>
            <button className={className} onClick={onClick} style={style}>
                {children}
            </button>
            { tooltip &&
                <span className="absolute transition-all w-max bottom-[calc(100%+16px)] left-1/2 transform -translate-x-1/2 text-white bg-gray-800 text-sm rounded-lg p-2 scale-0 group-hover:scale-100">
                    { tooltip }
                </span>
            }
        </div>
    )
}