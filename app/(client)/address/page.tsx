"use client";

import AddressForm from "@/components/address/address-form";
import AddressList from "@/components/address/address-list";
import { useState } from "react";

export default function Page() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <AddressList onAddNew={() => setIsOpenForm(true)} refresh={refresh} />
      {isOpenForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl mx-auto">
            <AddressForm
              setIsOpenForm={setIsOpenForm}
              onAddressAdded={() => setRefresh((r) => r + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
