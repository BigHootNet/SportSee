import React from 'react';
import { useUserData } from '../hooks/useUserData';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const numericUserId = parseInt(userId, 10); // Convert userId to number
  const { data, isLoading, error } = useUserData(numericUserId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || !data.userInfos) return <div>No user data found</div>;

  const { firstName } = data.userInfos;

  return (
    <div>
      <h1>Bonjour {firstName}</h1>
    </div>
  );
};

export default UserProfile;
