export default function CartIcon({ className, ...rest }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5137 21.9999H8.16592C5.09955 21.9999 2.74715 20.8924 3.41534 16.4347L4.19338 10.3935C4.60528 8.16925 6.02404 7.31799 7.26889 7.31799H17.4474C18.7105 7.31799 20.0469 8.23332 20.5229 10.3935L21.3009 16.4347C21.8684 20.3889 19.5801 21.9999 16.5137 21.9999Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.651 7.09836C16.651 4.71229 14.7167 2.77799 12.3306 2.77799V2.77799C11.1816 2.77312 10.078 3.22615 9.26381 4.03691C8.44963 4.84766 7.99193 5.94935 7.99194 7.09836H7.99194"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2963 11.6018H15.2506"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.46566 11.6018H9.41989"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
