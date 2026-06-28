'use client';

import Link from 'next/link';
import { HeroContainer, HeroTitle, HeroSubtitle, HeroCta } from './hero.styles';

const Hero = () => (
  <HeroContainer>
    <HeroTitle>Crown Clothing</HeroTitle>
    <HeroSubtitle>
      Curated essentials for every season. Discover hats, jackets, sneakers, and more.
    </HeroSubtitle>
    <HeroCta as={Link} href="/shop">
      Shop Collection
    </HeroCta>
  </HeroContainer>
);

export default Hero;