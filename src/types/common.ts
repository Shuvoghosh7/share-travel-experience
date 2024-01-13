export interface IMeta {
    limit: number;
    page: number;
    total: number;
  }
  
  export type ResponseSuccessType = {
    data: any;
    meta?: IMeta;
  };
  
  export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
  };
  
  export type IGenericErrorMessage = {
    path: string | number;
    message: string;
  };
  
  export interface IDepartment {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface Name {
    firstName: string;
    lastName: string;
    middleName: string;
  }
  
  export interface IAdmin {
    id: string;
    name: Name;
    gender: string;
    managementDepartment: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    dateOfBirth: string;
    bloodGroup: string;
    designation: string;
    presentAddress: string;
    permanentAddress: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  type Product = {
    GuideImage: string;
    Price: number;
    ProductDescription: string;
    ProductName: string;
    createdAt: string;
    id: string;
    quantity: number;
  };
  
 export interface ProductsType {
    item: Product; 
  }
  type Guide = {
    Name: string;
    CoverageArea: string;
    PricePerDay: number;
    GuideImage: string;
    Status: string;
    ProductName: string;
    createdAt: string;
    id: string;
    
  };
  
 export interface GuideType {
    item: Guide; 
  }
  type Blog = {
    AuthorName: string;
    TravelLocation:string;
    PostCategory: string;
    PostDate: string;
    PostDescription: string;
    PostImage: string;
    PostTitle: string;
    Status: string;
    createdAt: string;
    id: string;
    
  };
  
 export interface BlogType {
    item: Blog; 
  }

 