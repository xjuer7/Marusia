import React from "react"
import ContentLoader from "react-content-loader"

const LoaderRandomMovie = () => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={580}
    viewBox="0 0 1280 580"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    animate={true}
    backgroundOpacity={0.5}
  >
    <rect x="0" y="128" rx="6" ry="6" width="600" height="20" /> 
    <rect x="0" y="180" rx="8" ry="8" width="350" height="35" /> 
    <rect x="0" y="265" rx="6" ry="6" width="650" height="18" /> 
    <rect x="0" y="292" rx="6" ry="6" width="680" height="18" /> 
    <rect x="0" y="320" rx="6" ry="6" width="650" height="18" /> 

    <rect x="0" y="355" rx="30" ry="30" width="170" height="55" /> 
    <rect x="190" y="355" rx="30" ry="30" width="190" height="55" /> 
    <rect x="390" y="355" rx="30" ry="30" width="65" height="55" /> 
    <rect x="470" y="355" rx="30" ry="30" width="65" height="55" /> 

    <rect x="910" y="0" rx="20" ry="20" width="370" height="552" /> 
  </ContentLoader>
)

export default LoaderRandomMovie