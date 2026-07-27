import { Ref } from '@/utils/types';

export type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type HandleChange = (e: ChangeEvent) => void;
export type HandleProgrammaticChange = (name: string, value: string) => void;

export interface InputProps {
    className?:   string;
    ref?:         Ref<HTMLInputElement>;
    name:         string;
    type?:        string;
    required?:    boolean;
    id?:          string;
    placeholder?: string;
}