import PropTypes from "prop-types";

export default function VideoIcon({ className, ...rest }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      {...rest}
    >
      <path
        d="M12.53 20.42H6.21C3.05 20.42 2 18.32 2 16.21V7.78999C2 4.62999 3.05 3.57999 6.21 3.57999H12.53C15.69 3.57999 16.74 4.62999 16.74 7.78999V16.21C16.74 19.37 15.68 20.42 12.53 20.42Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5202 17.1L16.7402 15.15V8.84001L19.5202 6.89001C20.8802 5.94001 22.0002 6.52001 22.0002 8.19001V15.81C22.0002 17.48 20.8802 18.06 19.5202 17.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

VideoIcon.propTypes = {
  className: PropTypes.string,
};
