export type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'| 'blockquote';
  size?: 'sm' | 'md' | 'lg';
  [key: string]: unknown; 
}