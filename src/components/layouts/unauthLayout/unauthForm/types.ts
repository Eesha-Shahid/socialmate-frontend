interface FieldType {
    username?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
    agree?:boolean;
}

interface IUnauthFormProps {
    label: string; 
    action: string; 
    fields: FieldType;
    extra: string;
    onFinish: (values: any) => void;
    onFinishFailed: (errorInfo: any) => void;
}