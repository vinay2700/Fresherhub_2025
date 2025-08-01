import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { usageLimitService } from '../services/usageLimitService';

interface UsageLimitBannerProps {
  toolName: string;
}

const UsageLimitBanner: React.FC<UsageLimitBannerProps> = ({ toolName }) => {
  const [remainingUses, setRemainingUses] = useState(5);
  const [canUse, setCanUse] = useState(true);
  const [resetTime, setResetTime] = useState('');

  useEffect(() => {
    const unsubscribe = usageLimitService.subscribe(() => {
      setRemainingUses(usageLimitService.getRemainingUses());
      setCanUse(usageLimitService.canUseTools());
      setResetTime(usageLimitService.getResetTimeRemaining());
    });

    return unsubscribe;
  }, []);

  if (canUse && remainingUses === 5) {
    return null; // Don't show banner when user has full uses
  }

  const getBannerStyle = () => {
    if (!canUse) {
      return 'bg-red-50 border-red-200 text-red-800';
    }
    if (remainingUses <= 2) {
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
    return 'bg-blue-50 border-blue-200 text-blue-800';
  };

  const getIcon = () => {
    if (!canUse) {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
    if (remainingUses <= 2) {
      return <Clock className="h-5 w-5 text-yellow-600" />;
    }
    return <CheckCircle className="h-5 w-5 text-blue-600" />;
  };

  const getMessage = () => {
    if (!canUse) {
      return `You've reached your free limit. Please come back after ${resetTime} to use the tools again.`;
    }
    return `You have ${remainingUses} free ${remainingUses === 1 ? 'try' : 'tries'} left.`;
  };

  return (
    <div className={`rounded-xl p-4 border ${getBannerStyle()} mb-6`}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div className="flex-1">
          <div className="font-medium">{getMessage()}</div>
          {!canUse && (
            <div className="text-sm mt-1 opacity-80">
              Your usage will automatically reset in {resetTime}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-semibold">{remainingUses}/5</span>
        </div>
      </div>
    </div>
  );
};

export default UsageLimitBanner;