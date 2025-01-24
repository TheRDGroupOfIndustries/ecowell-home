"use client";

import { useState, useEffect } from "react";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";

function CustomerReviews({ productId }) {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commonTags, setCommonTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/products/reviews/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);

        // Extract common words from reviews
        const words = data.reviews.flatMap((review) =>
          review.review_descr.toLowerCase().split(/\s+/)
        );
        const wordCounts = words.reduce((acc, word) => {
          acc[word] = (acc[word] || 0) + 1;
          return acc;
        }, {});
        const sortedWords = Object.entries(wordCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([word]) => word);
        setCommonTags(sortedWords);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const filteredReviews = selectedTag
    ? reviews.reviews.filter((review) =>
        review.review_descr.toLowerCase().includes(selectedTag.toLowerCase())
      )
    : reviews?.reviews;

  if (loading) {
    return <ReviewsSkeleton />;
  }

  if (!reviews || reviews.reviews.length === 0) {
    return (
      <div className="flex-center p-4 md:py-6 lg:py-8 xl:py-10">
        No reviews available for this product.
      </div>
    );
  }

  const totalRatings = reviews.reviews.length;
  const averageRating =
    reviews.reviews.reduce((acc, review) => acc + review.rating, 0) /
    totalRatings;
  const ratingDistribution = reviews.reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      <div className="w-full md:w-[80%] mx-auto px-4 py-12">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-8">
          Customer Reviews
        </h1>
        <div className="border border-gray-100 rounded-lg p-6 ">
          <div className="flex h-full text-nowrap ">
            <RatingStats
              totalRatings={totalRatings}
              averageRating={averageRating}
              ratingDistribution={ratingDistribution}
            />
          </div>

          <CommonTags
            tags={commonTags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        </div>

        <div className="lg:col-span-7">
          {filteredReviews.map((review, index) => (
            <CustomerReview
              key={index}
              author={review.username}
              rating={review.rating}
              timeAgo={new Date(review.createdAt).toLocaleDateString()}
              content={review.review_descr}
              verified={true}
              profileImage={review.user_avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RatingStats({ totalRatings, averageRating, ratingDistribution }) {
  return (
    <div className="bg-white p-6 rounded-lg w-[50%]">
      <div className="flex items-center gap-4">
        <div className="flex justify-between gap-3 w-full mr-6">
          <p className="text-base  mt-1">{totalRatings} ratings</p>
          <div className="flex items-center ml-auto gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-bold">
              {averageRating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {Object.entries(ratingDistribution)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([rating, count]) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="w-12 text-sm text-gray-600">{rating} star</div>
              <div className="flex-1">
                <div className="h-5  bg-gray-200">
                  <div
                    className="h-5  bg-yellow-400"
                    style={{ width: `${(count / totalRatings) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-sm text-gray-600">
                {((count / totalRatings) * 100).toFixed(0)}%
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function CustomerReview({
  author,
  rating,
  timeAgo,
  content,
  verified,
  profileImage,
}) {
  return (
    <div className="border-b border-gray-100 py-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <Image
            src={profileImage}
            alt={`${author}'s profile`}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
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
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              {rating % 1 !== 0 && (
                <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              )}
            </div>
            <span className="text-sm text-gray-500">• {timeAgo}</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{content}</p>
    </div>
  );
}

function CommonTags({ tags, selectedTag, setSelectedTag }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Common Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`inline-flex items-center px-4 py-3 text-sm ${
              selectedTag === tag
                ? "bg-primary-clr text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="w-[80%] mx-auto px-4 py-12">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
        <div className="border border-gray-100 rounded-lg p-6">
          <div className="flex h-full">
            <div className="bg-gray-200 h-40 w-1/2 rounded"></div>
            <div className="bg-gray-200 h-40 w-1/2 rounded ml-6"></div>
          </div>
          <div className="mt-8">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-8 bg-gray-200 rounded w-24"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border-b border-gray-100 py-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="mt-4 h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerReviews;
