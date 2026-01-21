"use client";
import { useUserStore } from "@/modules/IAM/account/store/useUserStore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const UserSayHelloCard = () => {
  const { user } = useUserStore();
  const [showCard, setShowCard] = useState<boolean>(true);
  useEffect(() => {
    const loginTime = new Date(localStorage.getItem("loginTime")!); // Date objesi
    const timePassed = Date.now() - loginTime.getTime(); // ms cinsinden fark

    if (timePassed >= 4 * 60 * 1000) {
      setShowCard(false);
    } else {
      const timer = setTimeout(() => setShowCard(false), 3 * 60 * 1000 - timePassed);
      return () => clearTimeout(timer);
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      {
        showCard === true ? (
          <div className="mb-6 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
            <h1 className="text-2xl font-bold">
              Hoş geldiniz, {user?.fullName} 👋
            </h1>
            <p className="mt-2 text-sm opacity-90">Bugün yapacak harika işlerimiz var 🚀</p>
          </div>
        ) : (null)
      }

    </motion.div>
  );
};

export default UserSayHelloCard;
