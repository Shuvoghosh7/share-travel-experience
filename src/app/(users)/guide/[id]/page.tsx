"use client";
import React from "react";

import { useGuideQuery } from "@/redux/api/guide/guideApi";
import Loading from "@/app/loading";
import GuideBookeForm from "@/components/ui/GuideBookeForm";
export default function SingleGuide({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: guideData, isLoading, isError } = useGuideQuery(id);
  if(isLoading){
    <div><Loading/></div>
  }
  console.log(id);
  return (
    <div className="main_container">
      
      <GuideBookeForm guideData={guideData}/>
    </div>
  );
}
