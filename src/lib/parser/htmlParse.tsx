import parse, {
  attributesToProps,
  domToReact,
  type DOMNode,
  type Element,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { Link } from "@chakra-ui/react";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element;

    if (typedDomNode.attribs && typedDomNode.name === "a") {
      return (
        <Link
          {...attributesToProps(typedDomNode.attribs)}
          variant="underline"
          color="blue.500"
          target="_blank"
          rel="noreferrer"
          _hover={{ cursor: "pointer", opacity: 0.8, textDecoration: "none" }}
        >
          {typedDomNode.children &&
            domToReact(typedDomNode.children as DOMNode[], options)}
        </Link>
      );
    }

    return false;
  },
};

export const htmlParse = (domString: string) => parse(domString, options);
