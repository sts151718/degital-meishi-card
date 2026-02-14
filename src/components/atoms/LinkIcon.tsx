import { Icon, Link, type IconProps } from "@chakra-ui/react";
import { memo, type FC, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  iconProps?: IconProps & React.RefAttributes<SVGSVGElement>;
  isBlank?: boolean;
  isReferrer?: boolean;
};

export const LinkIcon: FC<Props> = memo((props) => {
  const {
    children,
    href,
    iconProps = {},
    isBlank = false,
    isReferrer = false,
  } = props;

  const blank = isBlank ? "_blank" : "";
  const rel = isReferrer ? "noreferrer" : "";

  return (
    <Link target={blank} rel={rel} href={href}>
      <Icon {...iconProps}>{children}</Icon>
    </Link>
  );
});
