"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import dynamic from "next/dynamic";

const DocumentViewer = dynamic(
  () => import("@/modules/SMM/document/components/cards/documentViewer"),
  { ssr: false },
);

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Döküman Görüntüleyici" />
      <DocumentViewer />
    </div>
  );
}
