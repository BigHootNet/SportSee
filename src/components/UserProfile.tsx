import React from 'react';
import { useUserData } from '../hooks/useUserData';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { data, isLoading, error } = useUserData(userId);



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No user data found</div>;

  const { firstName} = data.userInfos;

  return (
    <div>
      <h1>Bonjour {firstName}</h1>
    </div>
  );
};

export default UserProfile;