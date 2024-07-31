import React from 'react';
import icon1 from '../assets/calories.svg';
import icon2 from '../assets/proteines.svg';
import icon3 from '../assets/glucides.svg';
import icon4 from '../assets/lipides.svg';

interface KeyDataProps {
    keyData: {
        calorieCount: number;
        proteinCount: number;
        carbohydrateCount: number;
        lipidCount: number;
    };
}

const UserKeyData: React.FC<KeyDataProps> = ({ keyData }) => {
    return (
        <div className="globalKeyDataContainer">
            <div className="keyDataItem">
                <div className="iconContainer calorieIcon">
                    <img src={icon1} alt="Calories icon" />
                </div>
                <div className="textContainer">
                    <span className="value">{keyData.calorieCount} kcal</span>
                    <p className="label">Calories</p>
                </div>
            </div>
            <div className="keyDataItem">
                <div className="iconContainer proteinIcon">
                    <img src={icon2} alt="Proteins icon" />
                </div>
                <div className="textContainer">
                    <span className="value">{keyData.proteinCount} g</span>
                    <p className="label">Protéines</p>
                </div>
            </div>
            <div className="keyDataItem">
                <div className="iconContainer carbIcon">
                    <img src={icon3} alt="Carbohydrates icon" />
                </div>
                <div className="textContainer">
                    <span className="value">{keyData.carbohydrateCount} g</span>
                    <p className="label">Glucides</p>
                </div>
            </div>
            <div className="keyDataItem">
                <div className="iconContainer lipidIcon">
                    <img src={icon4} alt="Lipids icon" />
                </div>
                <div className="textContainer">
                    <span className="value">{keyData.lipidCount} g</span>
                    <p className="label">Lipides</p>
                </div>
            </div>
        </div>
    );
};

export default UserKeyData;
