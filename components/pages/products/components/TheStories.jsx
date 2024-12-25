import Image from "next/image";

const tempData = [
    {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione perferendis quod, deleniti nihil illum eligendi minus nobis cupiditate, sed, corporis impedit nisi eius reiciendis molestias possimus corrupti animi placeat. Aliquid?",
        image: "/p1.png",
        name: "John Doe",
        location: "New York, USA"
    },
    {
        content: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione perferendis quod, deleniti nihil illum eligendi minus nobis cupiditate, sed, corporis impedit nisi eius reiciendis molestias possimus corrupti animi placeat. Aliquid?",
        image: "/p1.png",
        name: "John Doe",
        location: "New York, USA"
    },
]


export default function TheStories({ stories = tempData }) {
    return (
        <div className="py-14">
            <div className=" mt-10 flex flex-col w-full gap-10">
                <div className=" flex flex-col justify-center items-center">
                    <h2 className="text-4xl text-dark_jungle_green font-medium">The Stories</h2>
                    <p className="text-dark_jungle_green text-4xl">The <span className="italic font-semibold">Inspire </span>Us</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {
                        stories.map((story, index) => (
                            <div key={index} className="h-[150px] relative  w-full overflow-hidden">
                                <div className="absolute size-[100px] bg-slate-500 rounded-lg left-0 bottom-[20px]">
                                    <Image src={story.image} alt={story.title} width={110} height={110} className="w-full h-full object-cover" />
                                </div>
                                <div className="w-[90%] ml-auto h-full bg-off_white flex flex-col justify-center pl-[80px]">
                                    <p className="text-dark_jungle_green text-lg font-semibold line-clamp-3">
                                        {story.content}
                                    </p>
                                    <p className="text-dark_jungle_green text-lg font-medium line-clamp-3">
                                        — {story.name}, {story.location}

                                    </p>
                                </div>
                            </div>
                        ))
                    }




                </div>
            </div>
        </div>

    )
}
