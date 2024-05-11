export interface IAiAssistantProps {
    visible: boolean,
    onClose: () => void;
    onSelect: (selectedSuggestion: string) => void;
}