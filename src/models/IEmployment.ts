import type { IResumeItem } from "./IResumeItem";

export interface IEmployment extends IResumeItem {
    company: string;
    url: string;
    position: string;
    location: string;
}