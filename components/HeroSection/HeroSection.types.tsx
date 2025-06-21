export interface HeroProps {
  heroTitle: string;
  heroText: {
    json: {
      content: Array<{
        content: Array<{
          value: string;
        }>;
      }>;
    }
  };
  heroImage: {
    url: string;
  };
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  sys: {
    __typename: string;
  };
}