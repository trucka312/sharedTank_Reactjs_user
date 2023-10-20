import PropTypes from "prop-types";

export default function ArrowRightIcon({ className, ...rest }) {
  return (
    <svg
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      {...rest}
    >
      <path
        d="M12.5984 3.3335L11.1181 4.5085L16.9764 9.16683H4.19946V10.8335H16.9764L11.1181 15.4918L12.5984 16.6668L20.9974 10.0002L12.5984 3.3335Z"
        fill="currentColor"
      />
    </svg>
  );
}

ArrowRightIcon.propTypes = {
  className: PropTypes.string,
};
