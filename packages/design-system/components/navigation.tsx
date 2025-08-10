
import PropTypes from 'prop-types';

interface MenuItem {
  label: string;
  path: string;
}

interface NavigationProps {
  menuItems: MenuItem[] | [];
  onMenuItemClick: (menuItem: MenuItem) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ menuItems = [], onMenuItemClick = () => {} }) => {
  return (
    <nav>
      <ul style={styles.navList}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            style={styles.navItem}
            onClick={() => onMenuItemClick(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
};

const styles = {
  navList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    gap: '20px',
    justifyContent: 'center'
  } as React.CSSProperties,
  navItem: {
    cursor: 'pointer',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    color: 'blue',
  } as React.CSSProperties,
};
