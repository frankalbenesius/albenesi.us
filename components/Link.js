import Link from "next/link";
import palette from "../util/palette";

export default ({ children, title, ...rest }) => (
  <Link prefetch {...rest} className="wrapper">
    <a title={title} className="link">
      {children}
    </a>
  </Link>
);
