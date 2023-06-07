"use client";
import { FC } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "./components/Header";
import { Logo } from "./components/Logo";
import { MobileMenu } from "./components/MobileMenu";
import { NavItems } from "./components/NavItems/";
export const NavBar: FC = () => {
  return (
    <Header>
      <Logo />
      <ConnectButton />
      <NavItems className="hidden sm:flex" />
      <MobileMenu />
    </Header>
  );
};
