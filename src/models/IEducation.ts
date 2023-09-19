import type { IResumeItem } from "./IResumeItem";

export interface IEducation extends IResumeItem {
    school: string;
    url: string;
    degree: string;
}