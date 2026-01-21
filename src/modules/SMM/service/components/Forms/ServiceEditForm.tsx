import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Select from "react-select";

import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { priortyData } from "@/core/constants/constants.data";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { extractLocationFromMapUrl, getGoogleMapsLink } from "@/core/utils/formatter/mapsHelper";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import { useCorporateCustomerStore } from "@/modules/CRM/customer/corporate/store/useCorporateCustomerStore";
import { useIndividualCustomerStore } from "@/modules/CRM/customer/individual/store/useIndividualCustomerStore";
import { usePersonelStore } from "@/modules/WFM/employee/store/usePersonelStore";
import { useTeamStore } from "@/modules/WFM/team/store/useTeamStore";

import { UpdateService } from "../../service/ServiceService";
import { useServiceStore } from "../../store/useServiceStore";
import { AssignmentSelector } from "../custom/AssignmentsSelector";
import CityStateSelect from "../custom/CitySelector";
import { CustomerSelector } from "../custom/CustomerSelector";

const ServiceEditForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const { run, isLoading } = useRequestAction();
  const { errors, clearErrors } = useFormErrors();
  const { personelOptions, fetchPersonelOptions } = usePersonelStore();
  const { teamOptions, fetchTeamOptions } = useTeamStore();
  const { individualOptions, fetchIndividualOptions } = useIndividualCustomerStore();
  const { corporateOptions, fetchCorporateOptions } = useCorporateCustomerStore();
  const { service, updateFormData, fetchService, setUpdateFormData, setUpdateField } =
    useServiceStore();

  useEffect(() => {
    run(async () => {
      fetchIndividualOptions();
      fetchCorporateOptions();
      fetchPersonelOptions();
      fetchTeamOptions();
    });
  }, []);

  useEffect(() => {
    if (service) {
      setUpdateFormData({
        cityId: service.cityId,
        city: service.city,
        customerId: service.customerId,
        customerType: service.customerType,
        districtId: service.districtId,
        district: service.district,
        latitude: service.latitude!,
        longitude: service.longitude!,
        url: service.url,
        employeeId: service.employeeId,
        priority: service.priority,
        description: service.description,
        subject: service.subject,
        title: service.title,
        teamId: service.teamId,
        createdDate: service.createdDate,
        id: service.id,
        code: service.code,
      });
    }
    clearErrors();
  }, [isOpen]);

  const handleSave = async () => {
    console.log(updateFormData);
    run(async () => {
      const response = await UpdateService(updateFormData);
      if (response.status === 200) {
        clearErrors();
        onClose();
        showSuccess("Servis Kaydı Güncellendi.");
        fetchService(service!.id);
      }
    });
  };
  return (
    <>
      <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Servis Kaydı Güncelle
            </h4>
          </div>

          <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
            <div className="mb-4 flex flex-col">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Genel Bilgiler
                </h5>
                {corporateOptions && individualOptions ? (
                  <>
                    <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-1">
                      <Label>Müşteri Tipi</Label>
                      <CustomerSelector
                        corporateCustomers={corporateOptions.items}
                        individualCustomers={individualOptions.items}
                        defaultType={updateFormData.customerType}
                        defaultValueId={updateFormData.customerId}
                        error={!!errors.CustomerId}
                        hint={errors.CustomerId!}
                        onChange={(value, type) => {
                          if (type === "individual") {
                            console.log(type);
                            setUpdateField("customerType", type);
                            setUpdateField("customerId", value);
                          }
                          if (type === "corporate") {
                            console.log(type);
                            setUpdateField("customerType", type);
                            setUpdateField("customerId", value);
                          }
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Servis Başlığı</Label>
                    <Input
                      type="text"
                      name="title"
                      value={updateFormData.title}
                      error={!!errors.Title}
                      hint={errors.Title!}
                      onChange={e => setUpdateField("title", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Servis Konusu</Label>
                    <Input
                      type="text"
                      name="serviceSubject"
                      value={updateFormData.subject}
                      error={!!errors.Subject}
                      hint={errors.Subject!}
                      onChange={e => setUpdateField("subject", e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-1">
                  <div>
                    <Label>Servis Açıklaması</Label>
                    <TextArea
                      className="text-black dark:text-white"
                      error={!!errors.description}
                      hint={errors.description!}
                      value={updateFormData.description}
                      onChange={value => setUpdateField("description", value)}
                    />
                  </div>
                  <div>
                    <Label>Öncelik Durumu</Label>
                    <Select
                      id="y"
                      options={priortyData}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderColor: !!errors.Priority ? "red" : base.borderColor,
                        }),
                      }}
                      getOptionLabel={e => e.label}
                      getOptionValue={e => e.value}
                      value={priortyData.find(e => e.value === updateFormData.priority)}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(value: any) => setUpdateField("priority", value?.value)}
                      placeholder={"Öncelik Durumu Seçiniz"}
                    />
                    {!!errors.Priority && (
                      <p className="mt-1 text-sm text-red-500">{errors.Priority}</p>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1"></div>

                <div className="mt-4">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                    Servis Bölge Bilgileri
                  </h5>
                </div>

                {updateFormData ? (
                  <>
                    <CityStateSelect
                      className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"
                      defaultCityId={updateFormData.cityId}
                      defaultStateId={updateFormData.districtId}
                      onChange={data => {
                        setUpdateField("cityId", data.city?.id ?? "");
                        setUpdateField("city", data.city?.name ?? "");
                        setUpdateField("districtId", data.state?.id ?? "");
                        setUpdateField("district", data.state?.name ?? "");
                        setUpdateField("latitude", data.state?.lat ?? data.city?.lat ?? null);
                        setUpdateField("longitude", data.state?.lon ?? data.city?.lon ?? null);
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
                {updateFormData?.district ? (
                  <>
                    <Label>Açık Adres</Label>
                    <Input
                      type="text"
                      name="url"
                      value={extractLocationFromMapUrl(updateFormData.url)}
                      onChange={e => {
                        const adres = e.target.value;
                        const fullAdres = getGoogleMapsLink(
                          adres,
                          updateFormData.city!,
                          updateFormData.district!,
                        );
                        setUpdateField("url", fullAdres);
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
                <div></div>

                <div className="mt-4">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                    Ekip-Personel Atama Bilgileri
                  </h5>

                  <AssignmentSelector
                    teamList={teamOptions ? teamOptions.items : []}
                    personnelList={personelOptions ? personelOptions.items : []}
                    defaultType={
                      service?.employeeId ? "personel" : service?.teamId ? "team" : "none"
                    }
                    defaultId={
                      service?.employeeId
                        ? service.employeeId
                        : service?.teamId
                          ? service.teamId
                          : ""
                    }
                    onChange={(value, type) => {
                      if (type === "personel") {
                        setUpdateField("teamId", "");
                        setUpdateField("employeeId", value);
                      }
                      if (type === "team") {
                        setUpdateField("employeeId", "");
                        setUpdateField("teamId", value);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              Kapat
            </Button>
            <Button size="sm" onClick={handleSave}>
              Oluştur
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ServiceEditForm;
