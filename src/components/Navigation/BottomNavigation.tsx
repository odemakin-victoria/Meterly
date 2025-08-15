import React from 'react';
import { Home, Zap, HelpCircle, User, History } from 'lucide-react';

interface BottomNavigationProps {
  currentPage?: string; // Made optional for external pages
  setCurrentPage?: (page: string) => void; // Made optional for external pages
  router: any; // Required for navigation
  isExternalPage?: boolean; // Flag to indicate if this is an external page like /help or /account
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentPage = '', 
  setCurrentPage, 
  router,
  isExternalPage = false
}) => {
  const navigationItems = [
    {
      id: 'dashboard',
      icon: Home,
      label: 'Home',
      action: () => {
        if (isExternalPage) {
          router.push('/dashboard'); // Navigate to dashboard page
        } else if (setCurrentPage) {
          setCurrentPage('dashboard');
        }
      }
    },
    {
      id: 'recharge',
      icon: Zap,
      label: 'Recharge',
      action: () => {
        if (isExternalPage) {
          router.push('/dashboard?page=recharge'); // Navigate with query param
        } else if (setCurrentPage) {
          setCurrentPage('recharge');
        }
      }
    },
   
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help',
      action: () => {
        if (isExternalPage && router.pathname === '/help') {
          // Already on help page, do nothing or scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          router.push('/help');
        }
      }
    },
    {
      id: 'account',
      icon: User,
      label: 'Account',
      action: () => {
        if (isExternalPage && router.pathname === '/account') {
          // Already on account page, do nothing or scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          router.push('/account');
        }
      }
    }
  ];

  // Function to check if a nav item is active
  const isActive = (itemId: string) => {
    if (isExternalPage) {
      // For external pages, check router pathname
      switch (itemId) {
        case 'dashboard':
          return router.pathname === '/dashboard' || router.pathname === '/';
        case 'help':
          return router.pathname === '/help';
        case 'account':
          return router.pathname === '/account';
        case 'recharge':
          return router.query?.page === 'recharge';
      
        default:
          return false;
      }
    } else {
      // For internal pages, use currentPage state
      switch (itemId) {
        case 'dashboard':
          return currentPage === 'dashboard';
        case 'recharge':
          return ['recharge', 'payment-summary', 'payment-flow', 'bank-transfer', 'card-payment', 'receipt'].includes(currentPage);
     
        case 'help':
          return currentPage === 'help';
        case 'account':
          return currentPage === 'account';
        default:
          return currentPage === itemId;
      }
    }
  };

  return (
    <div className="fixed bottom-0  left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
      <div className="flex justify-between">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.id);
          
          return (
            <button
              key={item.id}
              className="flex flex-col items-center space-y-1"
              onClick={item.action}
            >
              <Icon 
                className={`w-6 h-6 ${
                  active ? 'text-blue-600' : 'text-gray-400'
                }`} 
              />
              <span 
                className={`text-xs ${
                  active ? 'text-blue-600 font-medium' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;