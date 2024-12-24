import Image from 'next/image';
import { useState } from 'react';

// interface ProductImage {
//   id: number;
//   src: string;
//   alt: string;
// }

const images = [
    { id: 1, src: '/p1.png', alt: 'Product view 1' },
    { id: 2, src: '/p2.png', alt: 'Product view 2' },
    { id: 3, src: '/p3.png', alt: 'Product view 3' },
    { id: 4, src: '/p4.png', alt: 'Product view 4' },
];

export default function ProductGallery() {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-2">
                {images.map((image) => (
                    <button
                        key={image.id}
                        onClick={() => setSelectedImage(image)}
                        className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${selectedImage.id === image.id ? 'border-emerald-500' : 'border-gray-200'
                            }`}
                    >
                        <Image width={500}
                            height={500} src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
            <div className="flex-1">
                <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto rounded-lg"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
}