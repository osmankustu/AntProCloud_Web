"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner/Spinner";
import DocumentViewer from "@/modules/SMM/document/components/cards/documentViewer";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <div>
        <PageBreadcrumb pageTitle="Döküman Görüntüleyici" />
        <DocumentViewer />
      </div>
    </Suspense>
  );
}
