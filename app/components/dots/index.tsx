export async function Dots() {
    return (
        <>
            <div className="absolute w-[300px]  z-1 h-[100px] lg:w-[300px] lg:h-[300px] bottom-0 right-[-50px] lg:top-2/4 lg:left-3/4 rounded-full  bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 lg:opacity-30 blur-3xl">
            </div>
            <div className="absolute w-[300px] z-1 h-[100px] lg:w-[300px] lg:h-[300px] bottom-0 left-[-50px]  lg:top-20 lg:right-20 rounded-full  bg-gradient-to-r from-purple-200 to-blue-500  opacity-50 lg:opacity-30 blur-3xl">
            </div>
        </>
    )
}