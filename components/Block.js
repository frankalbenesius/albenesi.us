export default ({ children, header }) => (
  <div className="wrapper">
    <div className="header">{header}</div>
    <div className="body">{children}</div>
    <style jsx>{`
      .wrapper {
        margin-bottom: 1rem;
      }
      .header {
        font-weight: bolder;
      }
    `}</style>
  </div>
);
