import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';
import { useThemeStore } from '@/shared/stores/theme';

const Toaster = (props: Partial<ToasterProps>) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <SonnerToaster
      theme={theme}
      position="top-right"
      closeButton
      {...props}
    />
  );
};

export default Toaster;
