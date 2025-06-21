
  export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    
  };