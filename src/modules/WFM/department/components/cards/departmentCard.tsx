"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner/Spinner";
import { fadeVariants } from "@/core/constants/constants.animate";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { useDepartmentStore } from "../../store/useDepartmentStore";
import DepartmentMetaCard from "./departmentMetaCard";


const DepartmentCard = ({ id }: { id: string }) => {
    const { department, fetchDepartment } = useDepartmentStore();
    const { run } = useRequestAction();
    const [activeTab, setActiveTab] = useState("GeneralInfo");

    useEffect(() => {
        run(async () => {
            fetchDepartment(id);
        });
    }, []);

    return (
        <>
            <AnimatePresence>
                {department ? (
                    <motion.div
                        key="content"
                        variants={fadeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <DepartmentMetaCard department={department} setActive={(value: string) => setActiveTab(value)} />

                        {/* {activeTab === "GeneralInfo" && (
                            <>
                                <TeamInfoCard team={team} />
                                <TeamMemberTable data={team?.personels} />
                            </>
                        )}

                        {activeTab === "WorkRegist" && <div>Ekibin Yaptığı İşler Burada Listelenecek</div>} */}
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

export default DepartmentCard;
