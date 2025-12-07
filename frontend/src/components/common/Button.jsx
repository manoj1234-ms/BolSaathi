import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  const baseClasses = "font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:scale-105",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20",
    outline: "border-2 border-purple-500 text-white hover:bg-purple-500/20",
    ghost: "text-white hover:bg-white/10",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  
  const IconComponent = loading ? Loader2 : icon;
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {IconComponent && iconPosition === "left" && (
        <IconComponent className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      )}
      {children}
      {IconComponent && iconPosition === "right" && (
        <IconComponent className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
      )}
    </button>
  );
}

