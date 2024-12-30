import React from 'react';

const IconShield = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
  
  export const IconLock = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fdf4f0] p-8 ">
      <div className="max-w-3xl mt-28 mx-auto">
        <div className="mb-2 text-[#b47d56]">Privacy Policy</div>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#d4a373]">PRIVACY POLICY OF ECOWELL</h1>
          <button className="text-[#d4a373] hover:underline flex items-center gap-2">
            <span>Copy link</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        <div className="bg-[#fff5eb] border border-[#d4a373] rounded-lg p-4 mb-8">
          <p className="text-[#b47d56]">Effective Date: January 1, 2025</p>
        </div>

        <div className="space-y-8">
          <div>
            <p className="mb-4">Welcome to Ecowell!</p>
            <p className="text-gray-700">
              At Ecowell, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#d4a373] mb-4">
              <IconShield className="w-6 h-6" />
              INFORMATION WE COLLECT
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-[#b47d56] font-medium">Personal Information:</span>
                <span className="text-gray-700">Includes name, email, phone number, address, and payment details.</span>
              </div>
              <div>
                <span className="text-[#b47d56] font-medium">Non-Personal Information:</span>
                <span className="text-gray-700">Such as browser type, IP address, and pages visited on our website.</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#d4a373] mb-4">
              <IconLock className="w-6 h-6" />
              HOW WE USE YOUR INFORMATION
            </h2>
            <p className="text-gray-700 mb-2">The information we collect is used to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Process orders and deliver products</li>
              <li>Send promotional emails with your consent</li>
              <li>Improve our services and user experience</li>
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#d4a373] mb-4">
              <IconShield className="w-6 h-6" />
              YOUR PRIVACY RIGHTS
            </h2>
            <p className="text-gray-700 mb-2">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access, update, or delete your personal data</li>
              <li>Opt out of promotional communications</li>
              <li>Restrict the processing of your data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;