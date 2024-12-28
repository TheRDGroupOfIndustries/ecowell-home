'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export default function WriteReview({ productId }) {
  const { data: session } = useSession()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!rating) {
      return toast.error('Please select a rating')
    }

    if (!review.trim()) {
      return toast.error('Please write a review')
    }

    try {
      const response = await fetch(`/api/products/reviews/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating,
          review_descr: review,
          username: `${session.user.first_name} ${session.user.last_name}`,
          user_avatar: session.user.profile_image,
          user_id: session.user._id
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setRating(0)
        setReview('')
        // Trigger a refresh of reviews if needed
        window.location.reload()
      } else {
        toast.error(data.error || 'Failed to submit review')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                (hoveredRating || rating) >= star
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-primary-clr focus:border-transparent"
        />
        <button 
          type="submit"
          className="bg-primary-clr text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          SUBMIT REVIEW
        </button>
      </form>
    </div>
  )
}