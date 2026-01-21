"use client";
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import DepartmentCard from "@/modules/WFM/department/components/cards/departmentCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);
    return (
        <div>
            <PageBreadcrumb pageTitle="Departman Bilgileri" />
            <div>
                <Suspense fallback={<Spinner />}>
                    <DepartmentCard id={id} />
                </Suspense>
            </div>
        </div>
    );
};

export default page;
