"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_AVATAR } from "@/constants/data";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [registrationMethod, setRegistrationMethod] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    flat_plot: "",
    address: "",
    country: "India",
    region_state: "",
    city: "",
    zip_code: "",
    profile_image: "",
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/account");
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();

        setFormData({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || "",
          phone_number: userData.phone_number || "",
          flat_plot: userData.flat_plot || "",
          address: userData.address || "",
          country: userData.country || "India",
          region_state: userData.region_state || "",
          city: userData.city || "",
          zip_code: userData.zip_code || "",
          profile_image: userData.profile_image || "https://i.pinimg.com/1200x/b5/12/68/b5126803cf115b044849b64ca565a4a7.jpg",
        });
        setOriginalData({ ...userData });
        setIsPhoneVerified(userData.is_phone_verified || false);
        if (userData.phone_number) {
          setRegistrationMethod('phone');
        } else if (session?.user?.authUser?.provider === 'google' || userData.googleId) {
          setRegistrationMethod('google');
        } else {
          setRegistrationMethod('email');
        }
      } catch (error) {
        toast.error("Failed to load user data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const base64Image = await convertToBase64(file);
      setFormData((prev) => ({ ...prev, profile_image: base64Image }));
    } catch (error) {
      toast.error("Failed to process image");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((registrationMethod === 'email' && name === 'email') ||
        (registrationMethod === 'google' && name === 'email')) {
      return; // Do not update locked fields
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
    setShowOtpInput(false);
    setOtp('');
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch("/api/account/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: formData.phone_number }),
      });

      if (!response.ok) throw new Error("Failed to send OTP");

      setShowOtpInput(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("/api/account/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: formData.phone_number, otp }),
      });

      if (!response.ok) throw new Error("Failed to verify OTP");

      setIsPhoneVerified(true);
      toast.success("Phone number verified successfully");
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
  };

  const handleSubmit = async () => {
    if (formData.phone_number !== originalData.phone_number && !isPhoneVerified) {
      toast.error("Please verify your new phone number before saving");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/account/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");

      const updatedUser = await response.json();
      setOriginalData({ ...formData });
      setIsEditing(false);
      setShowOtpInput(false);
      setOtp('');
      toast.success("Profile updated successfully");

      // Update the session with new user data
      await update({
        ...session,
        user: updatedUser,
      });
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/sign-in');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen mt-[120px] bg-white p-4 md:p-6">
        <Card className="max-w-full mx-auto text-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-10 w-[120px]" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-6">
              <Skeleton className="w-[200px] h-[200px] rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-8 w-[150px]" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex justify-end gap-4">
              <Skeleton className="h-10 w-[100px]" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[120px] bg-white p-4 md:p-6">
      <Card className="max-w-full mx-auto text-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Detail</CardTitle>
          <Button
            onClick={() => router.push("/account/orders")}
            effect="gooeyLeft"
            className="bg-primary-clr text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            My Orders
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src={formData.profile_image || "https://i.pinimg.com/1200x/b5/12/68/b5126803cf115b044849b64ca565a4a7.jpg"}
                alt="Profile"
                width={200}
                height={200}
                className="rounded-full object-cover w-[200px] h-[200px]"
                unoptimized={formData.profile_image?.startsWith("data:")}
              />
              {isEditing && (
                <Label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-primary-clr hover:bg-green-700 text-white p-4 rounded-full cursor-pointer transition-colors"
                >
                  Edit
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-lg">
                First Name
              </Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name" className="text-lg">
                Last Name
              </Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={registrationMethod === 'email' || registrationMethod === 'google' || !isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number" className="text-lg">
                Phone Number
              </Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Add your phone number to receive call on delivery"
                disabled={!isEditing}
              />
              {isEditing && formData.phone_number !== originalData.phone_number && !isPhoneVerified && (
                <Button onClick={handleSendOtp} className="mt-2">
                  Verify Phone Number
                </Button>
              )}
            </div>
          </div>

          {showOtpInput && (
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-lg">
                OTP
              </Label>
              <Input
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <Button onClick={handleVerifyOtp} className="mt-2">
                Verify OTP
              </Button>
            </div>
          )}

          <CardTitle className="pt-4">Shipping Address</CardTitle>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-lg">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flat_plot" className="text-lg">
                Flat / Plot
              </Label>
              <Input
                id="flat_plot"
                name="flat_plot"
                value={formData.flat_plot}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter Flat/Plot"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-lg">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region_state" className="text-lg">
                Region/State
              </Label>
              <Input
                id="region_state"
                name="region_state"
                value={formData.region_state}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-lg">
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip_code" className="text-lg">
                Zip Code
              </Label>
              <Input
                id="zip_code"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {!isEditing ? (
              <>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary-clr hover:bg-green-700 text-white transition-colors text-lg"
                >
                  Edit
                </Button>
                <Button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-700 text-white transition-colors text-lg"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="text-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-primary-clr hover:bg-green-700 text-white transition-colors text-lg"
                >
                  {loading ? "Saving..." : "Save Settings"}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}