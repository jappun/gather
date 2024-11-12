"use client"

import StartPlanning from "@/components/StartPlanning";
import JoinEventModal from "@/components/JoinEventModal";
import { useState } from "react";


export default function Home() {
  const [isJoinEventModalOpen, setIsJoinEventModalOpen] = useState(false);

  return (
    <div className="bg-background flex flex-col items-center justify-center min-h-screen p-12 gap-10 font-[family-name:var(--font-geist-sans)]">
      <StartPlanning></StartPlanning>
      <h1 className="text-secondary-two">
        Joining an existing event? Click <button className="underline hover:text-secondary" onClick={() => setIsJoinEventModalOpen(true) }>here</button> to enter your join code.
        {isJoinEventModalOpen &&  
        <JoinEventModal
        isJoinEventModalOpen={isJoinEventModalOpen}
            setIsJoinEventModalOpen={setIsJoinEventModalOpen}
          />}
      </h1>
    </div>
  );
}
