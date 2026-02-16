import { Icon, Link, type IconProps, type LinkProps } from '@chakra-ui/react';
import { memo, type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href: string;
  isBlank?: boolean;
  isReferrer?: boolean;
  LinkProps?: LinkProps & import('react').RefAttributes<HTMLAnchorElement>;
  iconProps?: IconProps & React.RefAttributes<SVGSVGElement>;
};

export const LinkIcon: FC<Props> = memo((props) => {
  const { children, href, iconProps = {}, isBlank = false, isReferrer = false, LinkProps } = props;

  const blank = isBlank ? '_blank' : '';
  const rel = isReferrer ? 'noreferrer' : '';

  return (
    <Link target={blank} rel={rel} href={href} {...LinkProps}>
      <Icon role="img" {...iconProps}>
        {children}
      </Icon>
    </Link>
  );
});
