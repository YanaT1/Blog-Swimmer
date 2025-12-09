import { FC } from 'react';

const Greetings: FC = () => {
  const hours: number = new Date().getHours();

  if (hours > 4 && hours <= 16) {
    return (
      <h2
        className="text-center"
        style={{
          margin: '5% 0 3%',
          color: 'rgba(3, 51, 109, 0.60)'
        }}
      >
        Dzień dobry, Ivan!
      </h2>
    );
  } else {
    return (
      <h2
        className="text-center"
        style={{
          margin: '2% 0',
          color: 'rgba(3, 51, 109, 0.60)'
        }}
      >
        Dobry wieczór, Ivan!
      </h2>
    );
  }
};

export default Greetings;
