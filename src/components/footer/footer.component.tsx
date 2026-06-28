'use client';

import Link from 'next/link';
import { FooterContainer, FooterText, FooterLinks, FooterLink } from './footer.styles';

const Footer = () => (
  <FooterContainer>
    <FooterText>Crown Clothing — curated essentials since 2020.</FooterText>
    <FooterLinks>
      <FooterLink as={Link} href="/shop">
        Shop
      </FooterLink>
      <FooterLink as={Link} href="/auth">
        Account
      </FooterLink>
      <FooterLink as={Link} href="/checkout">
        Checkout
      </FooterLink>
    </FooterLinks>
  </FooterContainer>
);

export default Footer;