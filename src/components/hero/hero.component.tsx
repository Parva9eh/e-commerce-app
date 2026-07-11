'use client';

import Image from 'next/image';
import { LCP_IMAGE_SRC } from '@/lib/marketing-images';
import BrowseOriginLink from '@/components/browse-origin-link/browse-origin-link.component';
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

const isLcpImage = (src: string) => src === LCP_IMAGE_SRC;


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
          <HeroCta href="/shop">Shop Collection</HeroCta>
          <HeroCta as={BrowseOriginLink} href="/shop/sneakers" $variant="secondary">
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
          {(
            [
              {
                variant: 'primary',
                image: HERO_IMAGES.primary,
                priority: isLcpImage(HERO_IMAGES.primary.src),
              },
              {
                variant: 'secondary',
                image: HERO_IMAGES.secondary,
                priority: isLcpImage(HERO_IMAGES.secondary.src),
              },
              {
                variant: 'accent',
                image: HERO_IMAGES.accent,
                priority: isLcpImage(HERO_IMAGES.accent.src),
              },
            ] as const
          ).map(({ variant, image, priority }) => (
            <HeroImageCard key={variant} $variant={variant}>
              <HeroImage>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={priority}
                  sizes={
                    variant === 'primary'
                      ? '(max-width: 800px) 76vw, 36vw'
                      : '(max-width: 800px) 40vw, 20vw'
                  }
                />
              </HeroImage>
            </HeroImageCard>
          ))}
        </HeroImageStack>
      </HeroVisual>
    </HeroGrid>

    <HeroCategoryNav aria-label="Shop by category">
      {HERO_CATEGORIES.map(({ label, href }) => (
        <HeroCategoryLink as={BrowseOriginLink} key={href} href={href}>
          {label}
        </HeroCategoryLink>
      ))}
    </HeroCategoryNav>
  </HeroContainer>
);

export default Hero;
