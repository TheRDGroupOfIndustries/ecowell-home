'use client'
import React, { useState } from 'react';
import DeliveryOptions from './components/deliveryOptions';
import PackOptions from './components/packOptions';
import ProductGallery from './components/productGallery';
import { VariantGroup } from './components/productVariants';
import WellnessBenefits from './components/productBanefites';

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState('300mg');
    const [selectedFlavor, setSelectedFlavor] = useState('VANILLA');
    const [isExpanded, setIsExpanded] = useState(false);

    const fullText = `Meet the protein-ally that's here to rev up your protein intake! Neutral in taste and potent in content, this versatile supplement seamlessly blends into your daily routine. Whether you're mixing it into your morning smoothie, post-workout shake, or favorite recipes, it delivers a clean protein boost without compromising on taste. Perfect for athletes, fitness enthusiasts, or anyone looking to meet their daily protein goals with ease.`;

    const truncatedText = `${fullText.slice(0, 85)}...`;


    const sizes = [
        { id: '300mg', name: '300 mg' },
        { id: '1kg', name: '1 Kg' },
    ];

    const flavors = [
        { id: 'vanilla', name: 'VANILLA' },
        { id: 'chocolate', name: 'CHOCOLATE' },
        { id: 'peach', name: 'PEACH' },
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-[80px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProductGallery />

                <div>
                    <div className="flex items-center gap-2 mb-2 bg-off_white w-fit py-1 px-4 ">
                        <span className="text-charcoal_black">Heart</span>
                        <span className="text-charcoal_black">|</span>
                        <span className="text-charcoal_black">Longevity</span>
                    </div>

                    <h1 className="text-3xl font-bold mb-4 text-dark_jungle_green">DiabeVita</h1>

                    <div className="flex  gap-2 mb-6 flex-col">
                        <span className="text-2xl font-bold text-dark_jungle_green">₹ 1,400</span>
                        <span className="text-sm text-dark_jungle_green">Price inclusive GST</span>
                    </div>

                    <div className="bg-charcoal_black p-4  mb-6">
                        <div className="flex items-center gap-2 text-base text-gray-600">
                            <span className=" text-white">Extra 10% off auto-applied at checkout</span>
                        </div>
                    </div>

                    <div className=" rounded-lg mb-6">
                        <div className="flex items-center gap-2  text-gray-600">
                            <span className="font-medium text-xl text-charcoal_black">Earn 🪙 500 EcoCoins</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg text-dark_jungle_green font-semibold mb-2">Description</h2>
                        <p className="text-gray-600">
                            {isExpanded ? fullText : truncatedText}
                            <button
                                className="text-emerald-600 font-medium ml-1 hover:text-emerald-700 focus:outline-none"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? 'Read less' : 'Read more'}
                            </button>
                        </p>
                    </div>

                    <VariantGroup
                        title="Size"
                        variants={sizes.map(size => ({
                            id: size.id,
                            name: size.name,
                            isSelected: selectedSize === size.id,
                            onClick: () => setSelectedSize(size.id),
                        }))}
                    />

                    <VariantGroup
                        title="Flavor"
                        variants={flavors.map(flavor => ({
                            id: flavor.id,
                            name: flavor.name,
                            isSelected: selectedFlavor === flavor.id,
                            onClick: () => setSelectedFlavor(flavor.id),
                        }))}
                    />

                    <PackOptions />
                    <DeliveryOptions />
                    <WellnessBenefits/>
                </div>
            </div>

        </div>
    )
}
