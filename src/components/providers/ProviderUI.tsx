"use client";
import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
interface Props {
  children: ReactNode;
}

const ProviderUI = ({ children }: Props) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default ProviderUI;
