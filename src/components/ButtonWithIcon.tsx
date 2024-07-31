/**
 * Composant bouton avec icône SVG
 * @param {React.ReactNode} props.svgIcon
 * @param {string} props.color
 * @returns {React.Element}}
 */
const ButtonWithIcon = ({ svgIcon, color }: { svgIcon: React.ReactNode; color: string }) => {
    return (
      <button className="button-with-icon" style={{ backgroundColor: color }}>
        {svgIcon}
      </button>
    );
};
  
export default ButtonWithIcon;