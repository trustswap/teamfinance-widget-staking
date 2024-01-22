const baseClass =
  'inline-flex text-button items-center rounded-md transition duration-150 disabled:cursor-not-allowed'

export const variants = {
  primary: `${baseClass} bg-blue-600 border border-blue-600 text-white focus:ring-2 focus:ring-blue-300 focus:outline-none hover:bg-blue-700 disabled:bg-blue-500 disabled:hover:bg-blue-500 disabled:text-neutral-50`,
  secondary: `${baseClass} bg-white border border-gray-200 text-blue-lm focus:ring-2 focus:ring-gray-200 focus:outline-none hover:bg-blue-100 disabled:bg-gray-50 disabled:text-gray-600 disabled:hover:bg-gray-50`,
  outline: `${baseClass} border border-white text-blue-lm focus:text-blue-700 focus:ring-2 bg-white focus:ring-gray-200 focus:outline-none hover:bg-slate-200 hover:text-blue-700 disabled:hover:bg-transparent disabled:border-gray-200 disabled:text-gray-200`,
}

export const sizes = {
  xs: 'px-2 py-1',
  sm: 'px-3 py-1.5',
  md: 'h-11 px-3.5',
}
