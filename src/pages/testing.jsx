export default function Testing() {
    let number = 0;

    
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{number}</span>
        <div className="w-full flex justify-center">
            <button className="w-[100px] bg-blue-500 text-white rounded-xl p-2 cursor-pointer">+</button>
            <button className="w-[100px] bg-blue-500 text-white rounded-xl p-2 cursor-pointer">-</button>
        </div>

        </div>
    )
}