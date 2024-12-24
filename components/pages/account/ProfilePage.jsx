"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_AVATAR } from "@/constants/data";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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
      try {
        const response = await fetch("/api/profile");
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
          profile_image: userData.profile_image || DEFAULT_AVATAR,
        });
        setOriginalData({ ...userData });
      } catch (error) {
        toast.error("Failed to load user data");
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/profile/update", {
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

  return (
    <div className="min-h-screen mt-[120px] bg-white p-4 md:p-6">
      <Card className="max-w-full mx-auto text-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Detail</CardTitle>
          <Button
            variant="outline"
            onClick={() => router.push("/orders")}
            className="bg-primary-clr hover:bg-green-700 text-white transition-colors text-lg"
          >
            My Orders
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src={formData.profile_image || DEFAULT_AVATAR}
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
                disabled={true}
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
                disabled={!isEditing}
                placeholder="Add your phone number to receive call on delivery"
              />
            </div>
          </div>

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
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-primary-clr hover:bg-green-700 text-white transition-colors text-lg"
              >
                Edit
              </Button>
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
