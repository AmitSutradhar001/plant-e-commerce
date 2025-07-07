"use client";

import { useState } from "react";
import { createAddress } from "@/lib/actions/address.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  User,
  Phone,
  Home,
  Globe,
  Building,
  Mail,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";

const initialForm = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  landmark: "",
  phone: "",
};

type FormType = typeof initialForm;

export default function AddressForm({
  setIsOpenForm,
  onAddressAdded,
}: {
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  onAddressAdded: () => void;
}) {
  const [form, setForm] = useState<FormType>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.set(key, value);
      });

      const add = await createAddress(formData);

      if (add.success) {
        toast.success(add.message);
        setForm(initialForm);
        onAddressAdded();
      } else {
        toast.error(add.error ?? "Failed to save address");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false); // ✅ Always stop loading
      setIsOpenForm((prev) => !prev);
    }
  };
  const handleState = () => {
    setIsOpenForm((prev) => !prev);
  };
  return (
    <div className="max-w-7xl mx-auto mt-10">
      {/* Address Form */}
      <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm max-w-2xl mx-auto lg:max-w-none">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Home className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
            Address Details
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
            Fill in your complete address information
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {/* Desktop Layout - 2 columns */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                {/* Street Address */}
                <div className="space-y-2">
                  <Label
                    htmlFor="street"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Street Address *
                  </Label>
                  <Input
                    id="street"
                    name="street"
                    type="text"
                    value={form.street}
                    onChange={handleInputChange}
                    placeholder="Enter your street address"
                    className="h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                    >
                      <Building className="w-4 h-4" />
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="state"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                    >
                      <Building className="w-4 h-4" />
                      State *
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      value={form.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                      className="h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                {/* Postal Code and Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="postalCode"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Postal Code *
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={form.postalCode}
                      onChange={handleInputChange}
                      placeholder="Enter postal code"
                      className="h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Country *
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      value={form.country}
                      onChange={handleInputChange}
                      placeholder="Enter your country"
                      className="h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                {/* Landmark */}
                <div className="space-y-2">
                  <Label
                    htmlFor="landmark"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Landmark (Optional)
                  </Label>
                  <Input
                    id="landmark"
                    name="landmark"
                    type="text"
                    value={form.landmark}
                    onChange={handleInputChange}
                    placeholder="Enter nearby landmark for easy identification"
                    className="h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                {/* Phone Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="h-11 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Mobile/Tablet Layout - Single column */}
            <div className="lg:hidden space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="fullNameMobile"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="fullNameMobile"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              {/* Street Address */}
              <div className="space-y-2">
                <Label
                  htmlFor="streetMobile"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Street Address *
                </Label>
                <Input
                  id="streetMobile"
                  name="street"
                  type="text"
                  value={form.street}
                  onChange={handleInputChange}
                  placeholder="Enter your street address"
                  className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              {/* City and State Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="cityMobile"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Building className="w-4 h-4" />
                    City *
                  </Label>
                  <Input
                    id="cityMobile"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="stateMobile"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Building className="w-4 h-4" />
                    State/Province *
                  </Label>
                  <Input
                    id="stateMobile"
                    name="state"
                    type="text"
                    value={form.state}
                    onChange={handleInputChange}
                    placeholder="Enter your state"
                    className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              {/* Postal Code and Country Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="postalCodeMobile"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Postal Code *
                  </Label>
                  <Input
                    id="postalCodeMobile"
                    name="postalCode"
                    type="text"
                    value={form.postalCode}
                    onChange={handleInputChange}
                    placeholder="Enter postal code"
                    className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="countryMobile"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Country *
                  </Label>
                  <Input
                    id="countryMobile"
                    name="country"
                    type="text"
                    value={form.country}
                    onChange={handleInputChange}
                    placeholder="Enter your country"
                    className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              {/* Landmark */}
              <div className="space-y-2">
                <Label
                  htmlFor="landmarkMobile"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Landmark (Optional)
                </Label>
                <Input
                  id="landmarkMobile"
                  name="landmark"
                  type="text"
                  value={form.landmark}
                  onChange={handleInputChange}
                  placeholder="Enter nearby landmark for easy identification"
                  className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {/* Phone Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="phoneMobile"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phoneMobile"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="h-12 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>
            {/* Submit Button */}
            <div className="pt-4 flex justify-end gap-5 items-center">
              <Button
                type="button"
                onClick={handleState}
                disabled={isLoading}
                className="w-1/3 h-12 border-2 border-red-600/70 bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:border-none text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Cancle
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-1/3 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving Address...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Save Address
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          * Required fields
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Your address information is securely stored and only used for delivery
          purposes
        </p>
      </div>
    </div>
  );
}
