import CopyLink from '@/components/ui/copyLink';
import React from 'react';

export const IconShield = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const IconLock = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const TermsAndConditions = () => {
    
    return (
        <div className="min-h-screen bg-[#fdf4f0] p-8">
            <div className="max-w-3xl mx-auto mt-24">
                <div className="mb-2 text-[#b47d56]">Terms and Conditions</div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[#d4a373]">TERMS AND CONDITIONS OF USE</h1>
                    <CopyLink />
                </div>

                <div className="bg-[#fff5eb] border border-[#d4a373] rounded-lg p-4 mb-8">
                    <p className="text-[#b47d56]">Effective Date: January 1, 2025</p>
                </div>

                <div className="space-y-8">
                    <div>
                        <p className="mb-4">Welcome to Ecowell!</p>
                        <p className="text-gray-700">
                            These Terms and Conditions of Use (or &quot;Terms&quot;) govern your use of the Ecowell website and services (the &quot;Service&quot;).
                            By accessing or using Ecowell, you agree to comply with these Terms.
                        </p>
                    </div>

                    <div>
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-[#d4a373] mb-4">
                            <IconShield className="w-6 h-6" />
                            THE ECOWELL SERVICE
                        </h2>
                        <p className="text-gray-700 mb-4">
                            We are committed to providing a platform dedicated to helping you discover and purchase premium supplements and
                            wellness products. Our Service includes:
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-[#b47d56] font-medium mb-2">Personalized Wellness Solutions</h3>
                                <p className="text-gray-700">
                                    We offer tailored recommendations to help you discover products suited to your individual health and wellness goals.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-[#b47d56] font-medium mb-2">A Safe and Inclusive Community</h3>
                                <p className="text-gray-700">
                                    We aim to create a positive and secure space for all users. This includes using advanced tools and resources to
                                    prevent misuse, fraud, or violations of these Terms.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-[#d4a373] mb-4">
                            <IconLock className="w-6 h-6" />
                            YOUR COMMITMENTS
                        </h2>
                        <p className="text-gray-700 mb-4">To ensure a safe and secure environment, users must:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Be at least 13 years old or meet the minimum legal age in their country.</li>
                            <li>Provide accurate and up-to-date information when creating an account.</li>
                            <li>Use the Service lawfully and respectfully, avoiding any fraudulent, misleading, or unauthorized activities.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;