"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import FilterTableButton from "@/components/ui/button/TableFilterButton";
import TableButton from "@/components/ui/button/TableAddButton";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { rowVariant } from "@/core/constants/constants.animate";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { PageRequest } from "@/core/models/requests/PageRequest";
import { formatDate } from "@/core/utils/formatter/dateFormater";
import { QueryParserForPageRequest } from "@/core/utils/formatter/queryParser";

import { usePermission } from "@/core/hooks/auth/usePermission";
import personelPermissions from "../../../constants/personelPermission.const";
import { FcSearch } from "react-icons/fc";
import { useDepartmentStore } from "../../store/useDepartmentStore";
import DepartmentAddForm from "../forms/departmentAddForm";

const DepartmentsTable = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageRequest: PageRequest = QueryParserForPageRequest(searchParams!);
    const { isOpen, openModal, closeModal } = useModal();
    const [visible, setVisible] = useState<boolean>(false);
    const { isLoading, departments, fetchDepartments } = useDepartmentStore();
    const { run } = useRequestAction();
    const { hasPermission } = usePermission();

    const handleChangeSearchBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    };

    useEffect(() => {
        run(async () => {
            fetchDepartments(pageRequest.pageIndex, pageRequest.pageSize);
        });
    }, [pageRequest.pageIndex, pageRequest.pageSize]);

    return (
        // toDo next time refactoring for queryfilter card data scheme
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-50">
                        <FilterTableButton
                            text={!visible ? "Filtrele" : "Filtre Arayüzünü Gizle"}
                            onClick={() => setVisible(!visible)}
                        />
                        <div className="relative">
                            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                                <FcSearch size={25} />
                            </span>
                            <input
                                onChange={handleChangeSearchBox}
                                type="text"
                                placeholder="Departman Ara..."
                                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
                            />

                            <button className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                                <span> ⌘ </span>
                                <span> K </span>
                            </button>
                        </div>
                    </div>
                    {hasPermission(personelPermissions.create) ||
                        hasPermission(personelPermissions.allPermissions) ? (
                        <TableButton
                            text={"Departman Oluştur"}
                            onClick={() => {
                                openModal();
                            }}
                        />
                    ) : null}
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-y border-gray-100 dark:border-gray-800">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                >
                                    ID
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                >
                                    Departman Adı
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                >
                                    Çalışan Sayısı
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                >
                                    Tarih
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                >
                                    Son Güncelleme
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                                >
                                    İşlemler
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <TableBody key="loading">
                                    <TableRow>
                                        <TableCell colSpan={10}>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.4 }}
                                                className="flex items-center justify-center py-10"
                                            >
                                                <Spinner />
                                            </motion.div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : !departments?.items ? (
                                <TableBody key="data">
                                    <TableRow>
                                        <TableCell colSpan={10}>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.4 }}
                                                className="flex items-center justify-center py-10"
                                            >
                                                <p className="text-theme-md font-medium text-gray-800 dark:text-white/90">
                                                    Departman bulunamadı. Lütfen filtreleri kontrol edin veya yeni bir departman
                                                    ekleyin.
                                                </p>
                                            </motion.div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <motion.tbody
                                    key="data"
                                    //variants={tableFadeVariant}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="divide-y divide-gray-100 dark:divide-gray-800"
                                >
                                    {departments?.items.map((department, index) => (
                                        <motion.tr
                                            key={department.id}
                                            custom={index}
                                            variants={rowVariant}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            className="divide-y divide-gray-100 transition-all duration-300 dark:divide-gray-800"
                                        >
                                            <TableCell className="py-3">
                                                <div className="flex items-center gap-3">
                                                    <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                                                        {department.id}
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                                {department.name}
                                            </TableCell>
                                            <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                                {department.employeeCount}
                                            </TableCell>
                                            <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                                {formatDate(department.createdDate)}
                                            </TableCell>
                                            <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                                {formatDate(department.updatedDate)}
                                            </TableCell>
                                            <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                                <Button
                                                    key={department.id}
                                                    size="sm"
                                                    onClick={() =>
                                                        router.push("/management/employees/departments/" + department.id)
                                                    }
                                                >
                                                    Detay
                                                </Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            )}
                        </AnimatePresence>
                    </Table>
                </div>
            </div>

            {departments ? (
                <>
                    <Pagination
                        items={departments.count}
                        pageSize={departments.size}
                        pageSizes={[20, 50]}
                        onChangeSize={(size: number) =>
                            router.push(
                                `/management/employees/departments?pageIndex=${pageRequest.pageIndex}&pageSize=${size}`,
                            )
                        }
                        currentPage={departments!.index + 1}
                        onBack={() =>
                            router.push(
                                `/management/employees/departments/?pageIndex=${pageRequest.pageIndex - 1}&pageSize=${pageRequest.pageSize}`,
                            )
                        }
                        onChange={(page: number) =>
                            router.push(
                                `/management/employees/departments/?pageIndex=${page}&pageSize=${pageRequest.pageSize}`,
                            )
                        }
                        onNext={() =>
                            router.push(
                                `/management/employees/departments/?pageIndex=${pageRequest.pageIndex + 1}&pageSize=${pageRequest.pageSize}`,
                            )
                        }
                        totalPages={departments.pages}
                        key={1}
                    />
                </>
            ) : (
                <></>
            )}

            <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
                <DepartmentAddForm isOpen={isOpen} onClose={closeModal} />
            </Modal>
        </>
    );
};

export default DepartmentsTable;
