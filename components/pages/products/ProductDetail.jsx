"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FrequentlyBoughtTogether } from "./components/BroughtTogether";
import RelatedProduct from "./components/RelatedProduct";
import ProductDiscover from "./components/ProductDiscover";
import TheStories from "./components/TheStories";
import PurposeAndTrust from "./components/PurposeAndTrust";
import FrequentlyAskedQuestions from "./components/FrequentlyAskedQuestions";
import CustomerReviews from "./components/CustomerReviews";
import SkeletonLoader from './components/SkeletonLoader';

const ProductDetail = ({ productSku }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productSku}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setSelectedVariant(data.variants[0]); // Set the first variant as default
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSku]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <section className="w-full h-full space-y-8 p-4 md:px-8 lg:px-10 xl:px-14 md:pt-28">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 md:gap-6 lg:gap-8">
          <ImageGallery images={selectedVariant.images} />
          <Details product={product} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
        </div>
        <FrequentlyBoughtTogether/>
        <RelatedProduct category={product.category.title}/>
        <ProductDiscover/>
        <TheStories/>
        <PurposeAndTrust/>
        <FrequentlyAskedQuestions faqs={product.faqs}/>
        <CustomerReviews productId={product._id}/>
      </section>
    </>
  );
};

export default ProductDetail;

const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollUp = () => {
    setScrollPosition(Math.max(scrollPosition - 1, 0));
  };

  const scrollDown = () => {
    setScrollPosition(Math.min(scrollPosition + 1, images.length - 1));
  };

  useEffect(() => {
    setActiveImage(images[0]);
    setScrollPosition(0);
  }, [images]);

  return (
    <>
      <div
        id="image-section"
        className="relative lg:sticky top-28 z-10 w-full h-fit space-y-4 overflow-hidden"
      >
        <div
          id="images-gallery"
          className="w-full h-fit lg:h-[65vh] flex gap-4 select-none overflow-hidden"
        >
          <div
            id="images"
            className="w-[20%] h-full relative overflow-hidden"
          >
            <button onClick={scrollUp} className="absolute top-0 left-0 w-full bg-gray-200 z-10">▲</button>
            <div className="h-full overflow-y-scroll mt-6">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`image ${index + 1}`}
                  width={200}
                  height={200}
                  className={`w-full h-auto cursor-pointer transition-all mb-2 ${activeImage === image ? 'border-2 border-primary-clr shadow-xl' : ''}`}
                  onClick={() => setActiveImage(image)}
                  style={{ transform: `translateY(-${scrollPosition * 100}%)` }}
                />
              ))}
            </div>
            <button onClick={scrollDown} className="absolute bottom-0 left-0 w-full bg-gray-200 z-10">▼</button>
          </div>
          <div id="active-image" className="w-[80%] h-full">
            <Image
              src={activeImage}
              alt="Active product image"
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div
          id="certified-by-logos"
          className="w-full h-16 lg:h-20 flex-center flex-wrap gap-6 bg-[#F9F6F0] rounded-lg py-2 px-4 md:px-6 lg:px-8 overflow-hidden"
        >
          <i className="w-fit font-semibold font-serif text-primary-clr overflow-hidden">
            Certified By
          </i>
          <div className="w-full h-full flex-1 flex gap-6 overflow-x-scroll overflow-y-hidden">
            {["/c1.png", "/c2.png", "/c3.png", "/c4.png", "/c5.png"].map(
              (c, index) => (
                <Image
                  key={index}
                  src={c}
                  alt={`certificate ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-fit h-full"
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Details = ({ product, selectedVariant, setSelectedVariant }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const description = product.description;
  const shortDescription = description.split('.').slice(0, 2).join('.');

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <>
      <div
        id="product-details-section"
        className="w-full h-fit flex-1 space-y-4 overflow-hidden"
      >
        <div className="w-fit bg-[#F9F6F0] text-xs py-1 px-4 overflow-hidden">
          {product.category.title}
        </div>
        <div className="space-y-1">
          <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-primary-clr font-semibold">
            {product.title}
          </div>
          <div className="space-y-1 text-primary-clr">
            <div className="text-md md:text-lg lg:text-2xl xl:text-3xl font-semibold">
              ₹{product.price.toFixed(2)}/-
            </div>
            <div className="text-xs">Price include GST</div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm md:text-md lg:text-lg xl:text-xl">
            Description
          </div>
          <p className="text-xs md:text-sm">
            {showFullDescription ? description : shortDescription}
            {description.length > shortDescription.length && (
              <Button
                variant="link"
                size="sm"
                className="w-fit p-0 text-xs md:text-sm ml-3"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Read less' : 'Read more'}
              </Button>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.variants.map((variant, index) => (
            <div
              key={index}
              className={`text-sm text-primary-clr border border-gray-300 p-1 px-3 cursor-pointer`}
            >
              {variant.netQuantity}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {product.variants.map((variant, index) => (
            <div
              key={index}
              className={`text-sm text-primary-clr border border-gray-300 p-1 px-3 cursor-pointer ${
                selectedVariant.flavor === variant.flavor ? 'bg-primary-clr text-white' : ''
              }`}
              onClick={() => handleVariantChange(variant)}
            >
              {variant.flavor.toUpperCase()}
            </div>
          ))}
        </div>
        <hr className="border border-gray-300" />
        <div className="grid grid-cols-3 gap-4 overflow-hidden">
          {[
            { img: "/assets/emi.png", lable: "EMI Available" },
            { img: "/assets/cod.png", lable: "Cash on Delivery Available" },
            {
              img: "/assets/freeShipping.png",
              lable: "Free Shipping On Orders Above ₹999",
            },
          ].map((s, index) => (
            <div key={index} className="flex-center flex-col gap-2 text-center">
              <Image
                src={s.img}
                alt={s.lable}
                width={400}
                height={400}
                className="w-fit h-fit"
              />
              <span>{s.lable}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="text-md md:text-lg lg:text-xl xl:text-2xl">
            How this Formula supports your wellness
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex-center flex-col gap-1 text-center border border-secondary-clr rounded-xl p-2 px-4 md:px-6 overflow-hidden"
              >
                <Image
                  src="/assets/biceps.png"
                  alt={benefit}
                  width={400}
                  height={400}
                  className="w-fit h-fit"
                />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};