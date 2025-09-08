import { ReactNode } from "react";
import { UnderlineNav } from "@primer/react";
import { HomeIcon, PulseIcon } from "@primer/octicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import PrimerHeader from "./PrimerHeader";

interface Props { 
  children: ReactNode 
}

export default function MainLayout({ children }: Props) {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isActivity = router.pathname === "/activity";

  return (
    <div>
      <PrimerHeader />

      {/* Secondary nav */}
      <div style={{ backgroundColor: 'var(--bgColor-inset)' }}>
        <div className="mx-auto">
          <UnderlineNav aria-label="Main">
            <UnderlineNav.Item as={Link} href="/" icon={HomeIcon} aria-current={isHome ? 'page' : undefined}>
              Home
            </UnderlineNav.Item>
            <UnderlineNav.Item as={Link} href="/activity" icon={PulseIcon} aria-current={isActivity ? 'page' : undefined}>
              Activity
            </UnderlineNav.Item>
          </UnderlineNav>
        </div>
      </div>

      {/* Content area - each page determines its own layout */}
      {children}
    </div>
  );
}
