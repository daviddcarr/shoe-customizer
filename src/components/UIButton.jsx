import { useRef, useState, useEffect } from 'react'

export default function UIButton({ 
    children, 
    onClick, 
    style, 
    className, 
    tooltip, 
    parentClasses, 
    showTutorial, 
    tutorial,
    tutorialState,
    setTutorialState
}) {

    const buttonRef = useRef()

    const [position, setPosition] = useState("left-1/2 transform -translate-x-1/2")
    const [buttonClicked, setButtonClicked] = useState(false)

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

            if ( buttonPosition.x < 100 ) {
                setPosition("left-0")
            } else if ( buttonPosition.x + buttonWidth > windowWidth - 100 ) {
                setPosition("right-0")
            }
        }
    }

    return (
        <div ref={buttonRef} className={`group relative flex justify-center ${ parentClasses }`}>
            <button 
                className={className} 
                style={style} 
                aria-label={`Button to ${ tooltip }`}
                onClick={() => {
                    onClick()
                    if (!buttonClicked && showTutorial) {
                        setButtonClicked(true)
                        setTutorialState(tutorialState + 1)
                    }
                }} 
                >
                {children}
            </button>
            { tooltip && !showTutorial &&
                <span className={`absolute z-1000 transition-all w-max bottom-[calc(100%+16px)] ${ position } text-white bg-gray-800 text-sm rounded-lg p-2 scale-0 group-hover:scale-100`}>
                    { tooltip }
                </span>
            }
            { showTutorial && !buttonClicked &&
                <div className={`absolute z-1000 transition-all w-max max-w-[200px] bottom-[calc(100%+16px)] ${ position } text-white bg-gray-800 text-sm rounded-lg p-2`}>
                    <strong>TIP:</strong> { tutorial }
                    <div className={`absolute top-full w-[calc(100%-1rem)]`}>
                        <div class={`relative w-[16px] ${ position } border-solid border-t-gray-800 border-t-8 border-x-transparent border-x-8 border-b-0`}/>
                    </div>
                </div>
            }
        </div>
    )
}