import type { Metadata, Viewport } from "next";
import "./globals.css";
import { brand } from "@/config/brand";
export const metadata: Metadata = { title: brand.name, description: brand.promise, manifest:"/manifest.webmanifest", appleWebApp:{capable:true,title:brand.shortName} };
export const viewport: Viewport = { themeColor: brand.colors.ivory, width:"device-width", initialScale:1 };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="es"><body>{children}<script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){let reloading=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!reloading){reloading=true;window.location.reload()}});window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').then(registration=>registration.update()))}`}} /></body></html>; }
