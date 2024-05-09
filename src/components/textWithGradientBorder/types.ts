interface ITextWithGradientBorderProps {
    text?: string;
    className?: string;
    style?: string;
    gradientText?: boolean;
    editable?: boolean;
    maxLength?: number;
    onTextChange?: (text: string) => void;
    emoji?: boolean;
    placeholder?: string;
    onClick?: () => void;
    selected?: boolean;
    button?: string;
    onButtonClick?: () => void;
    loading?: boolean;
}