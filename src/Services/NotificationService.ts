// NotificationService.ts
import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationProps {
  message: string;
  type?: TypeOptions;
  duration?: number;
  position?: ToastOptions['position'];
}

class NotificationService {
  private static defaultConfig: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  static show({
    message,
    type = 'info',
    duration,
    position,
  }: NotificationProps): void {
    const config: ToastOptions = {
      ...this.defaultConfig,
      ...(duration && { autoClose: duration }),
      ...(position && { position }),
    };

    switch (type) {
      case 'success':
        toast.success(message, config);
        break;
      case 'error':
        toast.error(message, config);
        break;
      case 'warning':
        toast.warning(message, config);
        break;
      case 'info':
      default:
        toast.info(message, config);
        break;
    }
  }

  static success(message: string, duration?: number): void {
    this.show({ message, type: 'success', duration });
  }

  static error(message: string, duration?: number): void {
    this.show({ message, type: 'error', duration });
  }

  static warning(message: string, duration?: number): void {
    this.show({ message, type: 'warning', duration });
  }

  static info(message: string, duration?: number): void {
    this.show({ message, type: 'info', duration });
  }
}

export default NotificationService;

// // App.tsx or your root component
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//   return (
//     <>
//       {/* Your app content */}
//       <ToastContainer />
//     </>
//   );
// };

// // Usage example in any component:
// import NotificationService from './NotificationService';

// // Show a success notification
// NotificationService.success('Operation completed successfully!');

// // Show an error notification with custom duration (5 seconds)
// NotificationService.error('Something went wrong!', 5000);

// // Show a warning notification with custom position
// NotificationService.show({
//   message: 'Please review your input',
//   type: 'warning',
//   position: 'bottom-center'
// });

// // Show an info notification
// NotificationService.info('New updates available');