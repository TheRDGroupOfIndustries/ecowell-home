import Image from "next/image";

const tempData = [
  {
    content:
      "I've been using their whey protein for 6 months now, and the results are incredible. Not only does it taste great, but it's also helped me achieve my fitness goals. The natural ingredients and eco-friendly packaging make it even better!",
    image: "/pfp.png",
    name: "Michael Chen",
    location: "California, USA",
  },
  {
    content:
      "As a fitness trainer, I'm very particular about what I recommend to my clients. This protein supplement has exceeded my expectations - clean ingredients, great digestibility, and fantastic results. The sustainable approach is a huge bonus!",
    image: "/pfp.png",
    name: "Sarah Miller",
    location: "Toronto, Canada",
  },
];

export default function TheStories({ stories = tempData }) {
  return (
    <div className="p-4 py-6 md:p-8 md:py-14 lg:p-10 lg:py-16">
      <div className=" mt-10 flex flex-col w-full gap-10">
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-4xl text-dark_jungle_green font-medium">
            The Stories
          </h2>
          <p className="text-dark_jungle_green text-4xl">
            The <span className="italic font-semibold font-serif">Inspire</span>{" "}
            Us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="h-[150px] relative  w-full overflow-hidden"
            >
              <div className="absolute size-[100px] bg-slate-500 rounded-lg left-0 bottom-[20px]">
                <Image
                  src={story.image}
                  alt={story.title}
                  width={110}
                  height={110}
                  className="w-full h-full object-cover"
                />
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
          ))}
        </div>
      </div>
    </div>
  );
}
