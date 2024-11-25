import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

// Avatar Component
const avatarVariants = cva(
    'inline-flex items-center justify-center font-normal text-foreground',
    {
        variants: {
            size: {
                sm: 'h-8 w-8 text-xs',
                md: 'h-10 w-10 text-sm',
                lg: 'h-12 w-12 text-base',
            },
            shape: {
                circle: 'rounded-full',
                square: 'rounded-md',
            },
        },
        defaultVariants: {
            size: 'md',
            shape: 'circle',
        },
    }
)

export interface AvatarProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof avatarVariants> {}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
    ({ className, size, shape, ...props }, ref) => (
        <span
            ref={ref}
            className={avatarVariants({ size, shape, className })}
            {...props}
        />
    )
)
Avatar.displayName = 'Avatar'

export const AvatarImage = React.forwardRef<
    HTMLImageElement,
    React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => {
    if (!props.src) {
        return null
    }

    return (
        <img
            ref={ref}
            alt={props.alt}
            className={`aspect-square h-full w-full object-cover ${className ?? ''}`}
            {...props}
        />
    )
})
AvatarImage.displayName = 'AvatarImage'

export const AvatarFallback = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        className={`w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold p-5 ${className}`}
        {...props}
    />
))
AvatarFallback.displayName = 'AvatarFallback'
