'use client';

import Link from 'next/link';
import { ComponentProps, MouseEvent, ReactNode } from 'react';
import { rememberHomeBrowseOrigin } from '@/utils/shop/browse-origin';

type BrowseOriginLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<ComponentProps<typeof Link>, 'href' | 'onClick' | 'children' | 'className'>;

/**
 * Client island for home browse-origin tracking. Parent marketing sections can stay RSC.
 */
const BrowseOriginLink = ({
  href,
  children,
  className,
  onClick,
  ...rest
}: BrowseOriginLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    rememberHomeBrowseOrigin();
    onClick?.(event);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default BrowseOriginLink;
