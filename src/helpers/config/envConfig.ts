export const getBaseUrl = ():string => {
    
    return process.env.NEXT_PUBLIC_API_BASE_URL || "https://sharetravelexperienceserver-production.up.railway.app/api/v1"
}