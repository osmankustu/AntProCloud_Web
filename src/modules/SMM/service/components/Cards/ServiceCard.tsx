"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner/Spinner";
import { fadeVariants } from "@/core/constants/constants.animate";
import { useRequestAction } from "@/core/hooks/useRequestAction";

import { useServiceStore } from "../../store/useServiceStore";
import ServiceDetailIndicator from "../indicators/ServiceDetailIndicator";
import ServiceInfoCard from "./ServiceInfoCard";
import ServiceMetaCard from "./ServiceMetaCard";
import ServiceActivityTable from "@/modules/SMM/activity/components/table/ServiceActivityTable";
import { useCustomerStore } from "@/modules/CRM/customer/store/useCustomerStore";
import { ServiceModel } from "../../model/Service";
import { usePersonelStore } from "@/modules/WFM/employee/store/usePersonelStore";
import { useTeamStore } from "@/modules/WFM/team/store/useTeamStore";

const ServiceCard = ({ id }: { id: string }) => {
  const { service, fetchService } = useServiceStore();
  const { run } = useRequestAction();
  const [activeTab, setActiveTab] = useState("GeneralInfo");
  const { fetchPersonelOptions } = usePersonelStore();
  const { fetchTeamOptions } = useTeamStore();

  useEffect(() => {
    run(async () => {
      fetchPersonelOptions();
      fetchTeamOptions();
      fetchService(id);
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {service ? (
          <motion.div
            key="content"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ServiceDetailIndicator step={service?.status} />
            <ServiceMetaCard service={service} setActive={(value: string) => setActiveTab(value)} />

            {activeTab === "GeneralInfo" && (
              <>
                <ServiceInfoCard service={service} />
              </>
            )}

            {activeTab === "ServiceActivity" && (
              <div>
                <ServiceActivityTable service={service} />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="flex min-h-[300px] items-center justify-center"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceCard;
