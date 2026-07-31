import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "@/config/brand";
import BrandLogo from "@/components/BrandLogo";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] px-4 py-12">
      <div className="absolute inset-0 premium-grid opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md flex-col justify-center">
        <div className="text-center mb-10">
          <Link
            to="/"
            aria-label={`${BRAND.name} home`}
            className="mb-6 inline-flex rounded-xl bg-white px-4 py-3 shadow-xl shadow-black/20"
          >
            <BrandLogo eager className="h-auto w-44" />
          </Link>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
            <Icon className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
          {subtitle && <p className="mt-2 text-white/60">{subtitle}</p>}
        </div>
        <div className="rounded-3xl border border-white/15 bg-white p-8 shadow-2xl shadow-black/25">
          {children}
        </div>
        {footer && (
          <p className="mt-6 text-center text-sm text-white/60">{footer}</p>
        )}
      </div>
    </div>
  );
}
