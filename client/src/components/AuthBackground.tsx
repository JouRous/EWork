import { ReactComponent as AuthLeftBG } from 'assets/backgrounds/auth-left-bg.svg';
import { ReactComponent as AuthRightBG } from 'assets/backgrounds/auth-righ-bg.svg';

const AuthBackground = () => {
  return (
    <div
      style={{ zIndex: -900, backgroundColor: '#F9FAFC' }}
      className="fixed top-0 left-0 overflow-hidden w-full h-full"
    >
      <div style={{ width: '400px' }} className="absolute bottom-0 left-0">
        <AuthLeftBG />
      </div>
      <div style={{ width: '400px' }} className="absolute bottom-0 right-0">
        <AuthRightBG />
      </div>
    </div>
  );
};

export default AuthBackground;
