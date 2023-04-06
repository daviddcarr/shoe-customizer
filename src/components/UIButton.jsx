import { useRef, useState, useEffect } from 'react'

export default function UIButton({ children, onClick, style, className, tooltip, parentClasses }) {

    const buttonRef = useRef()

    const [position, setPosition] = useState("left-1/2 transform -translate-x-1/2")

    useEffect(() => {

        handleResize()

        window.addEventListener("resize", handleResize)

    }, [buttonRef])

    const handleResize = () => {
        if ( buttonRef.current ) {
            // get buttons position
            const buttonPosition = buttonRef.current.getBoundingClientRect()

            // get window width
            const windowWidth = window.innerWidth

            // get button width
            const buttonWidth = buttonPosition.width

            console.log(buttonPosition)

            if ( buttonPosition.x < 50 ) {
                setPosition("left-0")
            } else if ( buttonPosition.x + buttonWidth > windowWidth - 50 ) {
                setPosition("right-0")
            }
        }
    }

    return (
        <div ref={buttonRef} className={`group relative flex justify-center ${ parentClasses }`}>
            <button className={className} onClick={onClick} style={style} aria-label={`Button to ${ tooltip }`}>
                {children}
            </button>
            { tooltip &&
                <span className={`absolute z-1000 transition-all w-max bottom-[calc(100%+16px)] ${ position } text-white bg-gray-800 text-sm rounded-lg p-2 scale-0 group-hover:scale-100`}>
                    { tooltip }
                </span>
            }
        </div>
    )
}