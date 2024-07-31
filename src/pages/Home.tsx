import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import UserActivityChart from '../components/UserActivityChart';
import UserAverageSessionsChart from '../components/UserAverageSessionsChart';
import UserPerformanceChart from '../components/UserPerformanceChart';
import UserScoreCircleChart from '../components/UserScoreCircleChart';
import UserKeyData from '../components/UserKeyData';
import { useUserData } from '../hooks/useUserData';
import '../styles/Home.scss';
import { UserParams } from '../types/user';

const Home: React.FC = () => {
    const { userId } = useParams<UserParams>();
    const { data, isLoading, error } = useUserData(userId || '');
    console.log(data);

    const score = data?.score ?? data?.todayScore;

    return (
        <div className="content-container">
            {userId ? (
                <>
                    <UserProfile userId={userId} />
                    <div className="main-content">
                        <div className="charts">
                            <div className="UserActivityChartContainer">
                                <UserActivityChart userId={userId} />
                            </div>
                            <div className="chartsContainer">
                                <UserAverageSessionsChart userId={userId} />
                                <UserPerformanceChart userId={userId} />
                                {isLoading ? (
                                    <div>Chargement...</div>
                                ) : (
                                    <>
                                        {error && error.trim() && !data && <div>Erreur: {error}</div>}
                                        {score != null ? (
                                            <UserScoreCircleChart score={score} />
                                        ) : (
                                            <div>Données non trouvées</div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        {data && data.keyData && <UserKeyData keyData={data.keyData} />}
                    </div>
                </>
            ) : (
                <div>Utilisateur non défini</div>
            )}
        </div>
    );
};

export default Home;
