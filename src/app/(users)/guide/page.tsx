"use client"
import React, { useState } from 'react'
import styles from "@/style/Guide.module.css";
import { useGuidesQuery } from '@/redux/api/guide/guideApi';
import Loading from '@/app/loading';
import { useDebounced } from '@/redux/hooks';
import GuideCart from '@/components/ui/GuideCart';

const  Guide =()=>{
    const query: Record<string, any> = {};

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(2);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activePage, setActivePage] = useState(1);
  
    query["limit"] = size;
    query["page"] = page;
    query["sortBy"] = sortBy;
    query["sortOrder"] = sortOrder;
    // query["searchTerm"] = searchTerm;
  
    const debouncedTerm = useDebounced({
      searchQuery: searchTerm,
      delay: 600,
    });
  
    if (!!debouncedTerm) {
      query["searchTerm"] = debouncedTerm;
    }
    const {data,isLoading,isError} = useGuidesQuery({...query});
    const allguids:any = data?.guides;
   
    
  let content = null;
  if (isLoading) {
    content =<div><Loading/></div>
  }
  if (!isLoading && isError) {
    content = "There was an error";
  }

  if (!isLoading && !isError && allguids?.length === 0) {
    content = "No Product found!";
  }

  if (!isLoading && !isError && allguids?.length > 0) {
    content = allguids?.map((item: any) => (
      <GuideCart key={item.id} item={item} />
   
    ));
  }
   
  return (
    <div className='main_container'>
         <h1 className={styles.guide_title}>All Guide</h1>
         <div className={styles.allguide_container}>{content}</div>
         

    </div>
  )
}

export default Guide