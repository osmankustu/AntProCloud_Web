// app/account/layout.tsx
"use client";

import { useState } from "react";
import AccountSidebar from "@/modules/IAM/account/components/custom/accountSidebar";
import AccountMetaCard from "@/modules/IAM/account/components/cards/AccountMetaCard";
import AccountInformationCard from "@/modules/IAM/account/components/cards/AccountInformationCard";
import AccountSettingsCard from "@/modules/IAM/account/components/cards/AuthenticatorSettingsCard";
import ActiveDeviceList from "@/modules/IAM/account/components/tables/activeDeviceList";
import AccountNotificationSettings from "@/modules/IAM/account/components/cards/AccountNotificationSettings";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

const menuItems = [
  { id: "profile", label: "Hesap Bilgileri" },
  { id: "security", label: "Güvenlik ve Gizlilik" },
  { id: "notifications", label: "Bildirim Ayarları" },
  { id: "sessions", label: "Oturumlar ve Cihazlar" },
];

export default function AccountLayout() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderPanel = () => {
    switch (activeTab) {
      case "profile":
        return <AccountInformationCard />;
      case "security":
        return <AccountSettingsCard />;
      case "notifications":
        return <AccountNotificationSettings />;
      case "sessions":
        return <ActiveDeviceList />;
      default:
        return <div>Panel bulunamadı</div>;
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Hesabım" />
      <div className="space-y-4 p-6">
        <AccountMetaCard />
        <div className="flex gap-4">
          <AccountSidebar items={menuItems} activeTab={activeTab} onSelect={setActiveTab} />
          <div className="flex-1 rounded-xl bg-white p-4 shadow">{renderPanel()}</div>
        </div>
      </div>
    </div>


  );
}
