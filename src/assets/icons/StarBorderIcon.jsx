import PropTypes from "prop-types";

export default function StarBorderIcon({ className, ...rest }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      {...rest}
    >
      <g clipPath="url(#clip0_1270_11301)">
        <path
          d="M14.0001 20.7083L6.79939 24.4942L8.17489 16.4757L2.34155 10.7975L10.3916 9.63083L13.9919 2.33566L17.5922 9.63083L25.6422 10.7975L19.8089 16.4757L21.1844 24.4942L14.0001 20.7083Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1270_11301">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

StarBorderIcon.propTypes = {
  className: PropTypes.string,
};
