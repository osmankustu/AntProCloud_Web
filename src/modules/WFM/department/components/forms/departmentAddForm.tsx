import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import { DepartmentAddModel } from "../../model/department";
import { AddDepartment } from "../../service/departmentService";

const DepartmentAddForm = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { errors, clearErrors } = useFormErrors();
    const { run } = useRequestAction();
    const [formData, setFormData] = useState<DepartmentAddModel | undefined>();
    const initialFormData: DepartmentAddModel = {
        name: "",
    };

    useEffect(() => {
        setFormData(initialFormData);
        clearErrors();
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev!, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        run(async () => {
            const response = await AddDepartment(formData!);
            if (response.status == 201) {
                onClose();
                showSuccess("Departman Eklendi");

            }
        });
    };
    return (
        <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900"
        >
            {/* Burası senin modal içeriğin */}
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Departman Oluştur
                </h4>
            </div>

            <div className="custom-scrollbar h-[200px] overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                    <div>
                        <Label>Departman Adı</Label>
                        <Input
                            placeholder="Departman Adı Giriniz"
                            type="text"
                            value={formData?.name}
                            name="name"
                            onChange={handleChange}
                            error={!!errors.FirstName}
                            hint={errors.FirstName!}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
                <Button size="sm" variant="outline" onClick={onClose}>
                    Kapat
                </Button>

                <Button size="sm" variant="outline" onClick={handleSave}>
                    Oluştur
                </Button>
            </div>
        </motion.div >
    );
};

export default DepartmentAddForm;
