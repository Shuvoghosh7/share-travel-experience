import React from "react"

const BlogDetails = ({ params }: { params: { id: string } }) => {
    const { id } = params;
  return (
    <div className="main_container">
        <h1>Single Glog:{id}</h1>
      
    </div>
  )
};

export default BlogDetails;
