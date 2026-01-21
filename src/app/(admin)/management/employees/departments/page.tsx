"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import DepartmentsTable from "@/modules/WFM/department/components/tables/departmentsTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Departmanlar" />
      <div>
        <Suspense fallback={<Spinner />}>
          <DepartmentsTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
