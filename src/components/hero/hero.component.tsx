'use client';

import Link from 'next/link';
import { HERO_CATEGORIES, HERO_FEATURES, HERO_IMAGES } from './hero.constants';
import {
  HeroActions,
  HeroCategoryLink,
  HeroCategoryNav,
  HeroContainer,
  HeroContent,
  HeroCta,
  HeroEyebrow,
  HeroFeature,
  HeroFeatures,
  HeroGrid,
  HeroImage,
  HeroImageCard,
  HeroImageStack,
  HeroSubtitle,
  HeroTitle,
  HeroVisual,
} from './hero.styles';

const Hero = () => (
  <HeroContainer aria-labelledby="hero-title">
    <HeroGrid>
      <HeroContent>
        <HeroEyebrow>Spring / Summer 2026</HeroEyebrow>
        <HeroTitle id="hero-title">Crown Clothing</HeroTitle>
        <HeroSubtitle>
          Elevated wardrobe staples built for everyday wear. Discover hats, jackets,
          sneakers, and apparel crafted with clean lines and lasting quality.
        </HeroSubtitle>
        <HeroActions>
          <HeroCta as={Link} href="/shop">
            Shop Collection
          </HeroCta>
          <HeroCta as={Link} href="/shop/sneakers" $variant="secondary">
            Explore Sneakers
          </HeroCta>
        </HeroActions>
        <HeroFeatures>
          {HERO_FEATURES.map((feature) => (
            <HeroFeature key={feature}>{feature}</HeroFeature>
          ))}
        </HeroFeatures>
      </HeroContent>

      <HeroVisual aria-hidden="true">
        <HeroImageStack>
          <HeroImageCard $variant="primary">
            <HeroImage $imageUrl={HERO_IMAGES.primary.src} role="img" aria-label={HERO_IMAGES.primary.alt} />
          </HeroImageCard>
          <HeroImageCard $variant="secondary">
            <HeroImage $imageUrl={HERO_IMAGES.secondary.src} role="img" aria-label={HERO_IMAGES.secondary.alt} />
          </HeroImageCard>
          <HeroImageCard $variant="accent">
            <HeroImage $imageUrl={HERO_IMAGES.accent.src} role="img" aria-label={HERO_IMAGES.accent.alt} />
          </HeroImageCard>
        </HeroImageStack>
      </HeroVisual>
    </HeroGrid>

    <HeroCategoryNav aria-label="Shop by category">
      {HERO_CATEGORIES.map(({ label, href }) => (
        <HeroCategoryLink key={href} as={Link} href={href}>
          {label}
        </HeroCategoryLink>
      ))}
    </HeroCategoryNav>
  </HeroContainer>
);

export default Hero;