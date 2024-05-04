import React, { useEffect, useMemo } from 'react';
import { notification } from 'antd';
import { NotificationType } from '@/types';
import { IAlertProps } from './types'
import { AlertSelector } from '@/redux/reducers/index';
import { useSelector } from 'react-redux';

const Context = React.createContext({ name: 'Default' });

const Alert: React.FC<IAlertProps> = ({ 
  placement,
  duration,
  threshold,
  stacked
 }) => {
  const THREE = 3;
  const { alerts } = useSelector(AlertSelector);

  const [api, contextHolder] = notification.useNotification({
    stack: stacked || true
      ? {
          threshold: threshold || THREE,
        }
      : false,
  });

  const openNotification = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message: message || type.toUpperCase(),
      description: description || null,
      duration: duration || 4.5,
      placement: placement || 'topRight'
    });
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
  
  useEffect(() => {
    console.log(alerts)
  }, [alerts]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <>      
      {alerts && alerts.map((alert: any) => (
        openNotification(alert.type, alert.message, alert.description)
      ))}
      </>
    </Context.Provider>
  );
};

export default Alert;