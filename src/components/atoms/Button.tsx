
import Spinner from "./Spinner"; // Assuming you have a Spinner component
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  testId?: string;
  style?: React.CSSProperties;
  dataTestId?: string;
  dataCy?: string;  
}   

const Button = ({
  label,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  className,
  type = "button",
  ariaLabel,
  testId,
  style,
  dataTestId,
  dataCy,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn ${variant} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <Spinner /> : icon && iconPosition === "left" ? icon : label}
      {icon && iconPosition === "right" && label}
    </button>
  );
};