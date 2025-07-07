"use client";

import { useEffect, useState } from "react";
import { getUserAddresses } from "@/lib/actions/address.action";
import {
  MapPin,
  Home,
  Phone,
  Navigation,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FullScreenLoader from "@/app/loading";
import { useCartStore, AddressType } from "@/store/cartStore";
import Link from "next/link";

export default function AddressList({
  onAddNew,
  refresh,
}: {
  onAddNew: () => void;
  refresh: number;
}) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { defaultAddress, setDefaultAddress } = useCartStore();

  useEffect(() => {
    async function fetchAddresses() {
      setLoading(true);
      const res = await getUserAddresses();
      setAddresses(res.addresses || []);
      setLoading(false);
    }
    fetchAddresses();
  }, [refresh]);

  const handleAddressSelect = (address: any) => {
    const selectedAddress: AddressType = {
      _id: address.id || address._id,
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      landmark: address.landmark,
      phone: address.phone,
      userId: address.userId,
    };
    setDefaultAddress(selectedAddress);
  };

  const isAddressSelected = (address: any) => {
    return defaultAddress?._id === (address._id || address._id);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-2 sm:px-4">
      <div className="flex justify-between items-center mb-6 mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Addresses
        </h2>
        <Button
          onClick={onAddNew}
          className="bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-200 dark:to-gray-400 text-white dark:text-gray-900 font-semibold px-6 py-2 rounded-lg shadow hover:from-gray-900 hover:to-black dark:hover:from-gray-300 dark:hover:to-gray-500 transition-all"
        >
          + Add New Address
        </Button>
      </div>
      {loading ? (
        <FullScreenLoader />
      ) : addresses.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          No addresses found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {addresses.map((address, idx) => (
              <div
                key={address._id || idx}
                onClick={() => handleAddressSelect(address)}
                className={`bg-white dark:bg-gray-900/80 border-2 rounded-xl shadow p-6 flex flex-col gap-2 transition-all cursor-pointer hover:shadow-lg ${
                  isAddressSelected(address)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-blue-200 dark:shadow-blue-800"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">
                      {address.fullName}
                    </span>
                  </div>
                  {isAddressSelected(address) && (
                    <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Home className="w-4 h-4" />
                  <span>
                    {address.street}, {address.city}, {address.state}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {address.postalCode}, {address.country}
                  </span>
                </div>
                {address.landmark && (
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Navigation className="w-4 h-4" />
                    <span>{address.landmark}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{address.phone}</span>
                </div>
                {isAddressSelected(address) && (
                  <div className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                    ✓ Selected address
                  </div>
                )}
              </div>
            ))}
          </div>

          {defaultAddress && (
            <Link href="/payment" className="flex justify-center ">
              <Button className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                Continue with Selected Address
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
