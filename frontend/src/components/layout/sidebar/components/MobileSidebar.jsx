import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { adminNavigation } from '@/constant/adminNavigation';
import { Link, useLocation } from 'react-router-dom';

const MobileSidebar = () => {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden fixed top-4 left-4 z-50 text-muted-foreground hover:text-primary"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-72 p-0 lg:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-foreground">Admin Menu</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {adminNavigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}
                    hover:translate-x-1 hover:shadow-sm
                  `}
                >
                  <item.icon 
                    className={`
                      w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity
                      ${isActive ? 'opacity-100' : ''}
                    `}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
