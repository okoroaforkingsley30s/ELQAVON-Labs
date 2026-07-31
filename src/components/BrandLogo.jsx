import { BRAND } from '@/config/brand';

const LOGOS = {
  full: {
    src: BRAND.assets.logo,
    width: 1400,
    height: 259,
  },
  symbol: {
    src: BRAND.assets.symbol,
    width: 296,
    height: 304,
  },
};

export default function BrandLogo({
  compact = false,
  className = '',
  eager = false,
}) {
  const logo = compact ? LOGOS.symbol : LOGOS.full;

  return (
    <img
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={compact ? `${BRAND.name} symbol` : BRAND.name}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
