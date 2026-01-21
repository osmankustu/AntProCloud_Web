"use client";
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import CorporateCustomerTable from "@/modules/CRM/customer/corporate/components/tables/CorporateCustomerTable";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Kurumsal Müşteriler" />
      <div>
        <Suspense fallback={<Spinner />}>
          <CorporateCustomerTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
