import { 
    useState, 
    useEffect} from 'react';
import { 
    FaEye, 
    FaEyeSlash} from 'react-icons/fa';
import {Button} from 'react-bootstrap';
import '../../css/formsStyle.css';



interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
}

export function ShowButtonPassword({ inputRef }: Props): JSX.Element {
  const [visible, setVisible] = useState(false);

  const EyeIcon = FaEye as unknown as React.FC;
  const EyeSlashIcon = FaEyeSlash as unknown as React.FC;

  const showPassword = () => {
    if (inputRef.current) {
      const { selectionStart, selectionEnd } = inputRef.current;

      inputRef.current.type = visible ? 'password' : 'text';

      if (inputRef.current && selectionStart !== null && selectionEnd !== null) {
        inputRef.current.setSelectionRange(selectionStart, selectionEnd);
        inputRef.current.focus();
      }

      setVisible(!visible);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.type = 'password';
        setVisible(false);
      }, 20000);
    }
    return () => clearTimeout(timer);
  }, [visible, inputRef]);

  return (
    <Button
      type='button'
      className='eyeButton'
      onClick={showPassword}
      aria-label={visible ? 'Hide password' : 'Show password'}
    >
      {visible ? <EyeSlashIcon /> : <EyeIcon />}
    </Button>
  );
}
