interface ErrorMessageProps {
    message: string
  }
  
  export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
      <p className='text-center' style={{ color: 'red', margin: '2%' }} >
        {message}
      </p>
    )
  }