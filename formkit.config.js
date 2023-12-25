import { generateClasses } from '@formkit/themes'

const config = {
  config: {
    classes: generateClasses({
      global: {
        label: 'block font-bold mb-1 text-lg',
        message: 'text-red-500',
        wrapper: 'space-y-2 mb-3',
        input: 'w-full p-2 rounded-md border border-gray-200 text-gray-700 placeholder:text-gray-400',
      },
      text: {

      },
      file: {
        noFiles: 'block my-2',
        fileItem: 'hidden'
      },
      submit: {
        input: '$reset bg-green-400 uppercase hover:bg-green-500 font-bold py-2 px-4 rounded-md w-full disabled:opacity-50',
      }

    })
  }
}

export default config