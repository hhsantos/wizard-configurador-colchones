import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg active:shadow-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 border-primary bg-background text-primary shadow-sm hover:bg-primary hover:text-primary-foreground hover:shadow-md transition-all active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary/20 shadow-sm hover:shadow-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 md:h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-11 md:h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 md:h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-11 md:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
