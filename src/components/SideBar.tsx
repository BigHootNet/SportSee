import ButtonWithIcon from '../components/ButtonWithIcon';
import Icon1Svg from '../assets/icon1.svg';
import Icon2Svg from '../assets/icon2.svg';
import Icon3Svg from '../assets/icon3.svg';
import Icon4Svg from '../assets/icon4.svg';

/**
 * barre de navigation latérale
 * @returns {React.Element}
 */
const SideBar = () => {
  const Color = '#FFFFFF';
  return (
    <div className="lefSideBar">
      <div className="lefSideBar-buttons">
        <ButtonWithIcon svgIcon={<img src={Icon1Svg} alt="Icon1" />} color={Color} />
        <ButtonWithIcon svgIcon={<img src={Icon2Svg} alt="Icon2" />} color={Color} />
        <ButtonWithIcon svgIcon={<img src={Icon3Svg} alt="Icon3" />} color={Color}  />
        <ButtonWithIcon svgIcon={<img src={Icon4Svg} alt="Icon4" />}  color={Color} />
      </div>
      <p className="lefSideBar-text">Copyright, SportSee 2020</p>
    </div>
  );
};

export default SideBar;