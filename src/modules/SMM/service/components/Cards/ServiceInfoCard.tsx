import React from "react";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/core/hooks/useModal";
import { formatDate } from "@/core/utils/formatter/dateFormater";

import { ServiceModel } from "../../model/Service";
import ServiceEditForm from "../Forms/ServiceEditForm";
import PriortyStatusIndicator from "../indicators/PriortyStatusIndicator";
import ServiceStatusTableIndicator from "../indicators/ServiceStatusTableIndicator";
import CardUpdateButton from "@/components/ui/button/CardUpdateButton";
import { usePermission } from "@/core/hooks/auth/usePermission";
import servicePermissions from "../../constants/servicePermissions.const";
import { useCustomerStore } from "@/modules/CRM/customer/store/useCustomerStore";
import { usePersonelStore } from "@/modules/WFM/employee/store/usePersonelStore";
import { useTeamStore } from "@/modules/WFM/team/store/useTeamStore";

const ServiceInfoCard = ({ service }: { service: ServiceModel }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { hasPermission } = usePermission();
  const { customerOptions } = useCustomerStore();
  const { personelOptions } = usePersonelStore();
  const { teamOptions } = useTeamStore();
  return (
    <div>
      <div className="mt-5 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
              Servis Bilgileri
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-64">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {customerOptions?.items.find(c => c.id === service.customerId)?.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Öncelik Durumu
                  </p>
                  <PriortyStatusIndicator priorty={service?.priority} key={service?.id} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Servis Başlığı
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {service?.title}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Servis Açıklaması
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {service?.description}
                  </p>
                </div>
              </div>

              {/* Servis Durumu ve Öncelik */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Personel - Takım
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {service.employeeId !== null
                      ? personelOptions?.items.find(p => p.id === service.employeeId)?.fullName
                      : teamOptions?.items.find(t => t.id === service.teamId)?.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Servis Durumu
                  </p>
                  <ServiceStatusTableIndicator
                    id={service?.id}
                    serviceStatus={service?.status}
                    key={service?.id}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Servis Konusu
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {service?.subject}
                  </p>
                </div>
              </div>

              {/* Tarih Bilgileri */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Kayıt Tarihi
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(service?.createdDate || "")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Son Güncelleme
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(service?.updatedDate || "")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {hasPermission(servicePermissions.update) ||
          hasPermission(servicePermissions.allPermissions) ||
          hasPermission(servicePermissions.write) ? (
            <CardUpdateButton text="Düzenle" onClick={openModal} />
          ) : null}
        </div>
      </div>

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <ServiceEditForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default ServiceInfoCard;
