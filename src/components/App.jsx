import Gallery from './Gallery';
import css from './gallery.module.scss';

export const App = () => {
  return (
    <div
      className={css.app}
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101',
      // }}
    >
      <Gallery />
    </div>
  );
};
