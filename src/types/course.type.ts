export enum CATEGORY {
    PRONOUNCIATION = "Prononciation",
    ELOCUTION = "Élocution",
    INTERACTION = "Interaction",
    DIALOGUES = "Dialogues"
}

export enum LEVEL {
    DEBUTANT = "Debutant",
    INTERMEDIAIRE = "Intermédiaire",
    AVANCE = "Avancé"
}

export type Video = {
    title: string,
    duration: string,
    url: string,
}

export type Quiz_Answer = string
export type Quiz_Question = {
    question: string,
    answers: Quiz_Answer[],
    correctAnswer: Quiz_Answer,
}

export type Quiz = {
    name: string,
    objective: string,
    questions: Quiz_Question[],
}
export type Chapter = {
    name: string,
    videos: Video[],
    quiz?: Quiz
}

export type Resource = {
    id: number,
    fileName: string,
    url: string
}
export type Course = {
    id: number,
    name: string,
    description: string,
    category: CATEGORY,
    level: LEVEL,
    aboutCourse: string,
    whatYouLearn: string[],
    image: string,
    chapters: Chapter[],
    resources?: Resource[]
}
