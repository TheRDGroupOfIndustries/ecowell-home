import { Star, StarHalf, User } from "lucide-react";
import Image from "next/image";

const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&q=80',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=200&q=80',
];

const COMMON_TAGS = [
    'Great Sound Quality',
    'Comfortable',
    'Excellent Battery',
    'Good Value',
    'Easy Setup',
    'Durable',
];

function CustomerReviews() {
    return (
        <div className="min-h-screen ">
            <div className="w-[80%] mx-auto px-4 py-12">
                <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">Customer Reviews</h1>
                <div className="border border-gray-100 rounded-lg p-6 ">
                    <div className="flex h-full ">

                        <RatingStats
                            totalRatings={8033}
                            averageRating={4.5}
                            ratingDistribution={{
                                5: 60,
                                4: 70,
                                3: 30,
                                2: 20,
                                1: 18,
                            }}
                        />

                        <div className="bg-white p-6 rounded-lg w-[50%]">
                            <div className="flex items-center gap-4">
                                <div className="flex justify-between w-full mr-6">
                                    <p className="text-xl font-medium  ">See all customer images</p>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-4 grid-rows-2  gap-2 ">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="h-[70px] bg-gray-200 overflow-hidden">
                                        
                                    </div>

                                ))}
                                
                            </div>
                        </div>




                    </div>

                    <CommonTags tags={COMMON_TAGS} />
                </div>



                <div className="lg:col-span-7">
                    <CustomerReview
                        author="Subhranil Maity"
                        rating={4.5}
                        timeAgo="3 Months Ago"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris adipiscing pretium faucibus commodo scelerisque metus augue aliquam id. Non quam interdum rhoncus quam nunc tempor tortor orci."
                        images={SAMPLE_IMAGES}
                        verified
                    />
                    <CustomerReview
                        author="Alex Johnson"
                        rating={5}
                        timeAgo="1 Week Ago"
                        content="Exceptional quality and comfort. These headphones exceeded my expectations in every way possible. The sound clarity is outstanding and the noise cancellation works perfectly."
                        verified
                    />
                    <CustomerReview
                        author="Sarah Chen"
                        rating={4}
                        timeAgo="2 Weeks Ago"
                        content="Very comfortable for long listening sessions. Battery life is impressive, lasting well over the advertised duration. The only minor issue is that the app could be more intuitive."
                        images={SAMPLE_IMAGES.slice(0, 2)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomerReviews;

function RatingStats({ totalRatings, averageRating, ratingDistribution }) {
    return (
        <div className="bg-white p-6 rounded-lg w-[50%]">
            <div className="flex items-center gap-4">
                <div className="flex justify-between w-full mr-6">
                    <p className="text-base  mt-1">{totalRatings} ratings</p>
                    <div className="flex items-center ml-auto gap-2">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.floor(averageRating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xl font-bold">{averageRating}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-2">
                {Object.entries(ratingDistribution)
                    .sort(([a], [b]) => Number(b) - Number(a))
                    .map(([rating, percentage]) => (
                        <div key={rating} className="flex items-center gap-2">
                            <div className="w-12 text-sm text-gray-600">{rating} star</div>
                            <div className="flex-1">
                                <div className="h-5  bg-gray-200">
                                    <div
                                        className="h-5  bg-yellow-400"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                            <div className="w-12 text-sm text-gray-600">{percentage}%</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

function CustomerReview({ author, rating, timeAgo, content, images, verified }) {
    return (
        <div className="border-b border-gray-100 py-6">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{author}</h3>
                        {verified && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Verified
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            {rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                        </div>
                        <span className="text-sm text-gray-500">• {timeAgo}</span>
                    </div>
                </div>
            </div>
            <p className="mt-4 text-gray-600">{content}</p>
            {images && images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            width={100}
                            height={100}
                            alt={`Review image ${index + 1}`}
                            className="rounded-lg object-cover w-full h-24"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


function CommonTags({ tags }) {
    return (
        <div className=" mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Commonly Used Words</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center px-4 py-3  text-sm bg-gray-100 text-gray-800"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}