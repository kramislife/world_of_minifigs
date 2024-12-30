import { Link } from 'react-router-dom';

const NavigationItem = ({ item, isActive, isMinimized }) => {
  return (
    <Link
      to={item.path}
      title={item.label}
      className={`
        flex items-center transition-all duration-200 group
        ${isMinimized ? 'w-12 h-12 justify-center rounded-lg' : 'gap-5 px-4 py-3 rounded-lg w-full'}
        ${isActive ? 'bg-accent text-black' : 'text-md hover:bg-accent hover:text-foreground'}
      `}
    >
      <item.icon 
        className={`
          w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity
          ${isActive ? 'opacity-100' : ''}
        `}
      />
      {!isMinimized && <span className="font-medium">{item.label}</span>}
    </Link>
  );
};

export default NavigationItem;
