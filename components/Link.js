import Link from "next/link";

export default ({ children, title, ...rest }) => (
  <Link prefetch {...rest}>
    <a title={title}>{children}</a>
  </Link>
);
